import React from 'react';

const MicrosoftLogin = () => {
  const handleMicrosoftLogin = () => {
    window.location.href = "http://localhost:8000/api/auth/microsoft/redirect";
  };

  return (
    <button onClick={handleMicrosoftLogin} className="btn btn-primary">
      Login with Microsoft
    </button>
  );
};

export default MicrosoftLogin;