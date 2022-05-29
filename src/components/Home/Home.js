import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  return (
      <div className="col-md-12 mb-2">
        <div className="card">
          <div className="card-body text-center">
            <h1>Welcome</h1>
            <img className="card-img-top mb-2" src={user?.result.file} style={{width:100}} />
            <h5 className="card-title mb-3">{user?.result.name}</h5>
            <h6 className="card-muted">{user?.result.email}</h6>
            {(user?.result?.googleId === user?.creator || user?.result?._id === user?.creator) && (
              <button className="btn btn-outline-info btn-sm"  onClick={() => history.push(`/users/${user?.result?._id}`)}>Edit</button>
            )}
          </div>
        </div>
      </div>
  );
};

export default Home;
