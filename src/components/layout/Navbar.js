import React, { Fragment, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const [title, setTitle] = useState("NDEXR");
  const [icon, setIcon] = useState("fas fa-microchip");
  const { isAuthenticated, logout, loadUser } = authContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <Fragment>
      <li>
        <Link to="/">Build Server</Link>
      </li>
      <li>
        <Link to="/security">Security</Link>
      </li>
      <li>
        <a onClick={onLogout} href="#">
          <i className="fas fa-sign-out-alt" /> <span>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </Fragment>
  );

  return (
    <header>
      <h1>
        <Link to="/">
          <i className={icon} /> {title}
        </Link>
      </h1>
      {isAuthenticated ? authLinks : guestLinks}
    </header>
  );
};

export default Navbar;
