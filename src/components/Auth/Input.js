import React from 'react';
// import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';

// import Visibility from '@material-ui/icons/Visibility';
// import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Input = ({ name, handleChange, label, autoFocus, type, placeholder }) => (
    <input
      name={name}
      onChange={handleChange}
      label={label}
      autoFocus={autoFocus}
      type={type}
      className="form-control mb-2"
      placeholder= {placeholder}
    />
);

export default Input;
