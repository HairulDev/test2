import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import User from './components/User/User';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

import './assets/bootstrap/css/bootstrap.min.css';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <div className='container'>
          <Navbar />
          <Switch>
            <Route path="/" exact component={() => <Redirect to="/users" />} />
            <Route path="/users" exact component={Home} />
            <Route path="/users/:id" exact component={User} />
            <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/users" />)} />
          </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
