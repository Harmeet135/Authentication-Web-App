import { TextField, FormControlLabel, Checkbox, Button, Box, Alert } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { storetoken } from '../../storage/localStorage';

const Registration = () => {
  const [error, setError] = useState({
    status: false,
    msg: '',
    type: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
      confirmPassword: data.get('confirmPassword'),
      tc: data.get('tc'),
    };

  
    try {
      if (actualData.firstName && actualData.lastName && actualData.email && actualData.password && actualData.confirmPassword && actualData.tc) {
        if (actualData.password !== actualData.confirmPassword) {
          setError({ status: true, msg: "Password and Confirm Password don't match", type: 'error' });
          return;
        }

        const response = await axios.post('http://localhost:8000/api/user/register', actualData);
        console.log(response.data);

        if (response.data.status === "success") {
          storetoken(response.data.token);
          navigate('/dashboard');
        } else if (response.data.status === "failed") {
          setError({ status: true, msg: response.data.message, type: 'error' });
        }
      } else {
        setError({ status: true, msg: "All Fields are Required", type: 'error' });
      }
    } catch (error) {
      console.error(error.response.data);
      setError({ status: true, msg: error.response.data.message, type: 'error' });
    }
  };

  return (
    <>
      <Box component='form' noValidate sx={{ mt: 1 }} id='registration-form' onSubmit={handleSubmit}>
        <TextField margin='normal' required fullWidth id='firstName' name='firstName' label='First Name' />
        <TextField margin='normal' required fullWidth id='lastName' name='lastName' label='Last Name' />
        <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address' />
        <TextField margin='normal' required fullWidth id='password' name='password' label='Password' type='password' />
        <TextField
          margin='normal'
          required
          fullWidth
          id='confirmPassword'
          name='confirmPassword'
          label='Confirm Password'
          type='password'
        />
        <FormControlLabel control={<Checkbox value={true} color='primary' name='tc' id='tc' />} label='I agree to term and condition.' />
        <Box textAlign='center'>
          <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>
            Join
          </Button>
        </Box>
        {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
      </Box>
    </>
  );
};

export default Registration;
