// components/auth/RegisterForm.js

import { useState } from 'react';
import { getCsrfToken } from 'next-auth/react'; // Import getCsrfToken function

const RegisterForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const csrfToken = await getCsrfToken({ req: { headers: new Headers() } }); // Retrieve CSRF token
      await onSubmit({ name, email, password, registering: true, csrfToken }); // Pass CSRF token to onSubmit function
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Register</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default RegisterForm;
