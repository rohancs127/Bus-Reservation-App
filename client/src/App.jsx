import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Schedules from './components/Schedules';
import Buses from './components/Buses';
import RoutesPage from './components/RoutesPage';
import Login from './components/Login';
import Bookings from './components/Bookings';
import Register from './components/Register';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<Schedules />} />
        <Route path="/schedules" element={<Schedules />} />
        <Route path="/buses" element={<Buses />} />
        <Route path="/routes" element={<RoutesPage />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route 
          path="/bookings" 
          element={isLoggedIn ? <Bookings /> : <Navigate to="/login" />} 
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
