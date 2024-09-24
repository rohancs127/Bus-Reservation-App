import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/navbar.css'

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);

    navigate("/login");
  };

  return (
    <nav>
      <div className="navbar">
        <div className="navbar-item">
          <Link to="/schedules">Schedules</Link>
        </div>
        <div className="navbar-item">
          <Link to="/buses">Buses</Link>
        </div>
        <div className="navbar-item">
          <Link to="/routes">Routes</Link>
        </div>

        {isLoggedIn && (
          <div className="navbar-item">
            <Link to="/bookings">Bookings</Link>
          </div>
        )}

        {isLoggedIn ? (
          <div className="navbar-item">
            <Link to="/login" onClick={handleLogout}>Logout</Link>
          </div>
        ) : (
          <div className="navbar-item">
            <Link to="/login">Login</Link>
          </div>
        )}
        
      </div>
    </nav>
  );
};

export default Navbar;
