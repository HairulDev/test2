import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

import { signin, signup } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';
import useStyles from './styles';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history));
    }
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });

      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => console.log('Google Sign In was unsuccessful. Try again later');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className='container'>
      <div className="row justify-content-center">
        <div className='card col-md-6'>
          <div className='card-shadow'>
            <div className='card-title h5 text-center'>{isSignup ? 'Sign up' : 'Sign in'}</div>
            <div className='card-body'>
              <form onSubmit={handleSubmit}>
                {isSignup && (
                  <>
                    <input name="firstName" label="First Name" placeholder='First Name' handleChange={handleChange} autoFocus className='form-control mb-2'/>
                    <input name="lastName" label="Last Name" placeholder='Last Name' handleChange={handleChange} className='form-control mb-2'/>
                  </>
                )}
                <input name="email" label="Email Address" placeholder='Email Address' handleChange={handleChange} type="email" className='form-control mb-2'/>
                <input name="password" label="Password" placeholder='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} className='form-control mb-2'/>
                {isSignup && <input name="confirmPassword" label="Repeat Password" placeholder='Repeat Password' handleChange={handleChange} type="password" className='form-control mb-2'/>}
                <button type="submit" className='btn btn-block btn-primary'>
                  {isSignup ? 'Sign Up' : 'Sign In'}
                </button>
                <GoogleLogin
                  clientId="564033717568-bu2nr1l9h31bhk9bff4pqbenvvoju3oq.apps.googleusercontent.com"
                  render={(renderProps) => (
                    <button className='btn btn-outline-warning btn-block' onClick={renderProps.onClick} disabled={renderProps.disabled}>
                      Google Sign In
                    </button>
                  )}
                  onSuccess={googleSuccess}
                  onFailure={googleError}
                  cookiePolicy="single_host_origin"
                />

                <button className='btn btn-block btn-info' onClick={switchMode}>
                  {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
