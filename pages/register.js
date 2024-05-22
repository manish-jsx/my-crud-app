// pages/register.js

import { useState } from 'react';
import Layout from '../components/Layout';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage = () => {
  const [error, setError] = useState(null);

  const handleRegister = async (formData) => {
    try {
      // Make API request to register a new user
      const response = await fetch('/api/auth/signup', {
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

      // Registration successful, redirect or display success message
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Layout>
      <h1>Register Page</h1>
      {error && <p>{error}</p>}
      <RegisterForm onSubmit={handleRegister} />
    </Layout>
  );
};

export default RegisterPage;
