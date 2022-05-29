import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import * as actionType from '../../constants/actionTypes';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    history.push('/auth');
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
      <nav className="navbar navbar-expand-lg navbar-light bg-white my-2 p-0">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto ml-3">
            <li className="nav-item active">
              <Link to="/" className="navbar-brand">
                <h1>Blog</h1>
              </Link>
            </li>
          </ul>
          <span className="navbar">
            {user?.result ? (
              <div className="navbar-nav mr-auto">
                <img className="img rounded mx-auto d-block" style={{height:40}} src={user?.result.file || user?.result.imageUrl} />
                <span className="navbar-nav  mr-5">{user?.result.name}</span>
                <span className='btn btn-danger' onClick={logout}>Logout</span>
              </div>
            ) : (
              <Link className='btn btn-primary' to="/auth" >Sign In </Link>
            )}
          </span>
        </div>
      </nav>

  );
};

export default Navbar;
