import './App.css';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Home from './pages/Home';
import MultiStepForm from './pages/Form';
import AdvertListing from './pages/AdvertList';
import AdvertPage from './pages/AdvertPage';
import EditAdvert from './pages/EditAdvert';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route index element={<Home />} />
      <Route
        path="/form"
        element={<MultiStepForm data={''} editing={false} />}
      />
      <Route path="/list" element={<AdvertListing />} />
      <Route path="/item" element={<Navigate to="/list" />} />
      <Route path="/item/:id" element={<AdvertPage />} />
      <Route path="/edit/:id" element={<EditAdvert />} />
    </Routes>
  );
};

export default App;
