import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';

import { signin, signup } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';
import Input from './Input';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '',  file: '' };

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history));
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className='container'>
      <div className="row justify-content-center">
        <div className='card col-md-6'>
          <div className='card-body'>
            <div className='card-title h5 text-center'>{isSignup ? 'Sign up' : 'Sign in'}</div>
              <form onSubmit={handleSubmit}>
                {isSignup && (
                  <>
                    <Input name="firstName" label="First Name" placeholder="First Name" handleChange={handleChange} autoFocus />
                    <Input name="lastName" label="Last Name" placeholder="Last Name" handleChange={handleChange}  />
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setForm({ ...form, file: base64 })} />
                  </>
                )}
                <Input name="email" label="Email Address" placeholder="Email Address" handleChange={handleChange} type="email" />
                <Input name="password" label="Password" placeholder="Password" handleChange={handleChange} type="password" />
                {isSignup && <Input name="confirmPassword" placeholder="Repeat Password" label="Repeat Password" handleChange={handleChange} type="password"/>}
                <button type="submit" className='btn btn-block btn-primary'>
                  {isSignup ? 'Sign Up' : 'Sign In'}
                </button>

                <p className='text-info mt-2' onClick={switchMode}>
                  {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
};

export default SignUp;
