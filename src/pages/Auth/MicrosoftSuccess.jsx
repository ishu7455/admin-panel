import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const MicrosoftSuccess = () => {
  const [params] = useSearchParams();
  const token = params.get("token");

  useEffect(() => {
    if (token) {
      localStorage.setItem("passport_token", token);
      // You can redirect or fetch user details here
    }
  }, [token]);

  return (
    <div>
      <h3>Login successful</h3>
      <p>Token: {token}</p>
    </div>
  );
};

export default MicrosoftSuccess;