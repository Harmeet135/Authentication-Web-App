import { Box, TextField, Button, Alert } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { getToken } from '../../storage/localStorage';

const ChangeProfile = ({ user, onProfileUpdate }) => {
  const [error, setError] = useState({
    status: false,
    msg: '',
    type: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (firstName && lastName && email) {
        const token = getToken('token');
        const headers = { Authorization: `Bearer ${token}` };

        const actualData = {
          firstName,
          lastName,
          email,
        };

        const response = await axios.post('http://localhost:8000/api/user/update', actualData, { headers });
        console.log(response.data);
        setError({ status: true, msg: response.data.message, type: 'success' });
        setSubmitted(true);

        if (typeof onProfileUpdate === 'function') {
          onProfileUpdate(actualData);
        }
      } else {
        setError({ status: true, msg: 'All Fields are Required', type: 'error' });
      }
    } catch (error) {
      console.error(error.response.data);
      setError({ status: true, msg: error.response.data.message, type: 'error' });
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', maxWidth: 600, mx: 4 }}>
      <h1>Change Profile</h1>
      {!submitted && (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="firstName"
            label="First Name"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="lastName"
            label="Last Name"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email Address"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Box textAlign='center'>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, px: 5 }}> Update </Button>
          </Box>
          {error.status && <Alert severity={error.type}>{error.msg}</Alert>}
        </Box>
      )}
      {submitted && <Alert severity="success">{error.msg}</Alert>}
    </Box>
  );
};

export default ChangeProfile;
