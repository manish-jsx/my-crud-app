// pages/login.js

import { useState } from 'react';
import Layout from '../components/Layout';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  const [error, setError] = useState(null);

  const handleLogin = async (formData) => {
    try {
      // Make API request to login the user
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Handle error response
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      // Login successful, redirect or perform necessary actions
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Layout>
      <h1>Login Page</h1>
      {error && <p>{error}</p>}
      <LoginForm onSubmit={handleLogin} />
    </Layout>
  );
};

export default LoginPage;
