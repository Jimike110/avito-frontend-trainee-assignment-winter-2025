import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs-extra';
import { ItemTypes } from './ItemTypes.js';
import { v4 as uuidv4 } from 'uuid';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'x-requested-with'],
  })
);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use(cookieParser());

const USERS_FILE = './data/users.json';
const JWT_ACCESS_SECRET = process.env.ACCESS_SECRET || 'access_secret';
const JWT_REFRESH_SECRET = process.env.REFRESH_SECRET || 'refresh_secret';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_ACCESS_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Load user store
async function loadUsers() {
  if (!(await fs.pathExists(USERS_FILE))) {
    await fs.writeJson(USERS_FILE, []);
  }
  return fs.readJson(USERS_FILE);
}
async function saveUsers(users) {
  await fs.writeJson(USERS_FILE, users, { spaces: 2 });
}

// Register endpoint
app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;
  const users = await loadUsers();
  if (users.find((u) => u.username === username)) {
    return res
      .status(409)
      .json({ error: 'Username has been taken. Try another' });
  }
  const hash = await bcrypt.hash(password, 10);
  users.push({ id: Date.now(), username, hash });
  await saveUsers(users);
  res.status(201).end();
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const users = await loadUsers();
  const user = users.find((u) => u.username === username);
  if (!user || !(await bcrypt.compare(password, user.hash))) {
    return res.status(403).json({ error: 'Invalid credentials.' });
  }
  // Create tokens
  const accessToken = jwt.sign(
    { userId: user.id, username: user.username },
    JWT_ACCESS_SECRET,
    {
      expiresIn: '15m',
    }
  );
  const refreshToken = jwt.sign(
    { userId: user.id, username: user.username },
    JWT_REFRESH_SECRET,
    {
      expiresIn: '7d',
    }
  );
  // Send refresh token as HttpOnly cookie
  res.cookie('jid', refreshToken, {
    httpOnly: true,
    path: '/api/refresh_token',
  });
  res.json({ accessToken });
});

// Refresh endpoint
app.post('/api/refresh_token', (req, res) => {
  const token = req.cookies.jid;
  if (!token) return res.status(401).end();
  let payload;
  try {
    payload = jwt.verify(token, JWT_REFRESH_SECRET);
  } catch {
    return res.status(401).end();
  }
  // Issue new access token
  const accessToken = jwt.sign(
    { userId: payload.userId, username: payload.username },
    JWT_ACCESS_SECRET,
    {
      expiresIn: '15m',
    }
  );
  res.json({ accessToken });
});

// Protected example
// app.get('/api/protected', (req, res) => {
//   const auth = req.headers.authorization;
//   if (!auth) return res.status(401).end();
//   const token = auth.split(' ')[1];
//   try {
//     const payload = jwt.verify(token, JWT_ACCESS_SECRET);
//     res.json({ data: `Hello user ${payload.sub}` });
//   } catch {
//     res.status(401).end();
//   }
// });

// Ensure the upload folder exists
const UPLOAD_FOLDER = './uploads';
if (!fs.existsSync(UPLOAD_FOLDER)) {
  fs.mkdirSync(UPLOAD_FOLDER);
}

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_FOLDER);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 },
});

// In-memory хранилище для объявлений
// let items = [];

const DATA_FILE = './data/adverts.json';

if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, '[]', 'utf-8');
}

function readData() {
  try {
    const rawData = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(rawData);
  } catch (error) {
    if (error.code === 'ENOENT' || error instanceof SyntaxError) {
      return [];
    }
  }
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

let items = readData();

// const makeCounter = () => {
//   let count = 0;
//   return () => count++;
// };

// const itemsIdCounter = makeCounter();

// Upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.status(200).json({
    name: req.file.filename,
    url: fileUrl,
  });
});

// Создание нового объявления
app.post('/items', authenticateToken, (req, res) => {
  const { name, description, location, type, ...rest } = req.body;

  // Validate common required fields
  if (!name || !description || !location || !type) {
    return res.status(400).json({ error: 'Missing required common fields' });
  }

  switch (type) {
    case ItemTypes.REAL_ESTATE:
      if (!rest.propertyType || !rest.area || !rest.rooms || !rest.price) {
        return res
          .status(400)
          .json({ error: 'Missing required fields for Real estate' });
      }
      break;
    case ItemTypes.AUTO:
      if (!rest.brand || !rest.model || !rest.year || !rest.mileage) {
        return res
          .status(400)
          .json({ error: 'Missing required fields for Auto' });
      }
      break;
    case ItemTypes.SERVICES:
      if (!rest.serviceType || !rest.experience || !rest.cost) {
        return res
          .status(400)
          .json({ error: 'Missing required fields for Services' });
      }
      break;
    default:
      return res.status(400).json({ error: 'Invalid type' });
  }

  const item = {
    id: uuidv4(),
    userId: req.user.userId,
    username: req.user.username,
    name,
    description,
    location,
    type,
    ...rest,
  };

  items.push(item);
  writeData(items);
  res.status(201).json(item);
});

// Получение всех объявлений
app.get('/items', authenticateToken, (req, res) => {
  res.json(items);
});

function verifyUser(item, req, res, status, errorMessage) {
  if (item.userId !== req.user.userId) {
    res.status(status).json({ error: errorMessage });
    return false;
  }
  return true;
}

// Получение объявления по его id
app.get('/items/:id', authenticateToken, (req, res) => {
  const item = items.find((i) => i.id === req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).send('Item not found');
  }
});

// Обновление объявления по его id
app.put('/items/:id', authenticateToken, (req, res) => {
  const item = items.find((i) => i.id === req.params.id);
  if (!item) return res.status(404).send('Item not found');

  if (
    !verifyUser(
      item,
      req,
      res,
      403,
      'Forbidden: You can only update your own items.'
    )
  )
    return;

  Object.assign(item, req.body);
  writeData(items);
  res.json(item);
});

// Удаление объявления по его id
app.delete('/items/:id', authenticateToken, (req, res) => {
  const itemIndex = items.findIndex((i) => i.id === req.params.id);
  if (itemIndex === -1) return res.status(404).send('Item not found');

  const item = items[itemIndex];
  if (
    !verifyUser(
      item,
      req,
      res,
      403,
      'Forbidden: You can only delete your own items.'
    )
  )
    return;

  items.splice(itemIndex, 1);
  writeData(items);
  res.status(204).send();
});

app.get('/api/verify/:id', authenticateToken, (req, res) => {
  const item = items.find((i) => i.id === req.params.id);
  if (!item) return res.status(404).send('Item not found');

  if (
    !verifyUser(
      item,
      req,
      res,
      403,
      'Forbidden: You do not have access to edit this advert.'
    )
  )
    return;

  res.status(200).json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
