import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Home from './pages/Home';
import Test from './pages/Test';
import MultiStepForm from './pages/Form';
import AdvertListing from './pages/AdvertList';
import AdvertPage from './pages/AdvertPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route index element={<Home />} />
      <Route path="/form" element={<MultiStepForm />} />
      <Route path="/test" element={<Test />} />
      <Route path="/list" element={<AdvertListing />} />
      <Route path="/item/:id" element={<AdvertPage />} />
    </Routes>
  );
};

export default App;
