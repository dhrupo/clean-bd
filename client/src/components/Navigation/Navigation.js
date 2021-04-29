import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Navigation = () => {
  const [user, setUser] = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminUser = user.email || user.displayName;
    fetch(`https://whispering-coast-91544.herokuapp.com/isAdmin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user: adminUser })
    })
      .then(res => res.json())
      .then(data => setIsAdmin(data))
  })

  const handleLogout = () => {
    setUser({});
    sessionStorage.removeItem('token');
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="fw-bold fs-5 first-color" to="/home">CleanBD</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/services">Services</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/faqs">FAQS</Link>
            </li>
            {
              user.isSignedIn || sessionStorage.getItem('token') ?
                <React.Fragment>
                  {isAdmin && <li className="nav-item">
                    <Link className="nav-link" to="/admin">Admin</Link>
                  </li>}
                  <li className="nav-item">
                    <Link className="nav-link" onClick={handleLogout} to="/">{user.email || user.displayName}</Link>
                  </li>
                </React.Fragment>
                : <React.Fragment>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/registration">Registration</Link>
                  </li>
                </React.Fragment>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;