import React from 'react';
import Link from 'next/link';

import Layout from '../components/Layout';

const HomePage = () => {
  return (
    <Layout>
      <h1>Welcome to My CRUD App</h1>
      <p>This is the default landing page of the application.</p>
    </Layout>
  );
};

export default HomePage;

