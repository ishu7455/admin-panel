import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const MicrosoftLogin = () => {
  const navigate = useNavigate(); 
  const handleMicrosoftLogin = async () => {
      try {
     const res = await axios.get('http://localhost:8000/api/auth/microsoft/redirect');
    const { token, user } = res.data;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    console.log('Logged in as:', user.first_name);
      navigate('/dashboard');
    // Redirect or update UI
  } catch (err) {
    console.error('Login failed:', err.response?.data || err.message);
  }
  };

  return (
    <button onClick={handleMicrosoftLogin} className="btn btn-primary">
      Login with Microsoft
    </button>
  );
};

export default MicrosoftLogin;