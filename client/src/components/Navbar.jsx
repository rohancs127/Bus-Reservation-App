import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);

    navigate("/login");
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/schedules">Schedules</Link>
        </li>
        <li>
          <Link to="/buses">Buses</Link>
        </li>
        <li>
          <Link to="/routes">Routes</Link>
        </li>

        {isLoggedIn && (
          <li>
            <Link to="/bookings">Bookings</Link>
          </li>
        )}

        {isLoggedIn ? (
          <li>
            <Link to="/login" onClick={handleLogout}>Logout</Link>
          </li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
        
      </ul>
    </nav>
  );
};

export default Navbar;
