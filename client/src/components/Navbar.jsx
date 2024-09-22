import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn }) => {
  return (
    <nav>
      <ul>
        <li><Link to="/schedules">Schedules</Link></li>
        <li><Link to="/buses">Buses</Link></li>
        <li><Link to="/routes">Routes</Link></li>
        <li><Link to="/login">{isLoggedIn ? 'Logout' : 'Login'}</Link></li>
        {isLoggedIn && <li><Link to="/bookings">Bookings</Link></li>}
      </ul>
    </nav>
  );
};

export default Navbar;
