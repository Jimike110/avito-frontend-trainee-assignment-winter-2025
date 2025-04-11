import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Home from './pages/Home';
import Test from './pages/Test';
import MultiStepForm from './pages/Form';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route index element={<Home />} />
      <Route path="/form" element={<MultiStepForm />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  );
};

export default App;
