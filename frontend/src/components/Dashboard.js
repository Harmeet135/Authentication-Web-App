import { Button, CssBaseline, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ChangeProfile from './auth/ChangeProfile';
import { getToken, removeToken } from '../storage/localStorage';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showChangeProfile, setShowChangeProfile] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = getToken('token');
        const headers = { Authorization: `Bearer ${token}` };

        const response = await axios.get('http://localhost:8000/api/user/profile', { headers });
        console.log(response.data);
        setUser(response.data.user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    removeToken('token');
    navigate('/login');
  };

  const handleProfileUpdate = (updatedUserData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedUserData,
    }));
  };

  const handleToggleChangeProfile = () => {
    setShowChangeProfile((prevShowChangeProfile) => !prevShowChangeProfile);
  };

  useEffect(() => {
    if (user && showChangeProfile) {
      setShowChangeProfile(false);
    }
  }, [user]);

  return (
    <>
      <CssBaseline />
      <Grid container>
      <Grid item sm={4} sx={{ backgroundColor: 'gray', p: 5, color: 'white' }}>
  <h1>Dashboard</h1>
  {user && (
    <>
      <Typography variant='h5'>Email: {user.email}</Typography>
      <Typography variant='h6'>
        Name: {user.firstName} {user.lastName}
      </Typography>
    </>
  )}
  <Button variant='contained' color='warning' size='large' onClick={handleLogout} sx={{ mt: 8, mr: 2 }}>
    Logout
  </Button>
  <Button variant='contained' color='primary' size='large' onClick={handleToggleChangeProfile} sx={{ mt: 8 }}>
    {showChangeProfile ? 'Hide Profile' : 'Edit Profile'}
  </Button>
</Grid>
<Grid item sm={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {showChangeProfile && user && (
            <ChangeProfile user={user} onProfileUpdate={handleProfileUpdate} />
          )}
        </Grid>
  </Grid>
    </>
  );
};

export default Dashboard;
