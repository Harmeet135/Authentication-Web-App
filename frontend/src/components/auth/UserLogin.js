import { TextField, Button, Box, Alert } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { storetoken } from '../../storage/localStorage';

const UserLogin = () => {
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
      email: data.get('email'),
      password: data.get('password'),
    };

    try {
      if (actualData.email && actualData.password) {
        const response = await axios.post('https://authenticatino.onrender.com/api/user/login', actualData);
        // const response = await axios.post('http://localhost:8000/api/user/login', actualData);
        // console.log(response.data);

        if (response.data.status === "success") {
          console.log("hello");
          storetoken(response.data.token);
          navigate('/dashboard');
        } else if (response.data.status === "failed") {
          setError({ status: true, msg: response.data.message, type: 'error' });
        }
      } else {
        setError({ status: true, msg: 'All fields are required', type: 'error' });
      }
    } catch (error) {
      console.error(error.response.data);
      setError({ status: true, msg: error.response.data.message, type: 'error' });
    }
  };

  return (
    <>
      <Box component='form' noValidate sx={{ mt: 1 }} id='login-form' onSubmit={handleSubmit}>
        <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address' />
        <TextField margin='normal' required fullWidth id='password' name='password' label='Password' type='password' />
        <Box textAlign='center'>
          <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>
            Login
          </Button>
        </Box>
        {error.status ? <Alert severity={error.type} sx={{ mt: 3 }}>{error.msg}</Alert> : ''}
      </Box>
    </>
  );
};

export default UserLogin;
