// pages/api/auth/[...nextauth].js

import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../lib/prisma';
import bcrypt from 'bcrypt';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (credentials.registering) {
          // Registration flow
          const { name, email, password } = credentials;
          const hashedPassword = await bcrypt.hash(password, 10);
          const user = await prisma.user.create({
            data: {
              name,
              email,
              password: hashedPassword
            }
          });
          if (user) {
            return Promise.resolve(user);
          } else {
            return Promise.resolve(null);
          }
        } else {
          // Login flow
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          });
          if (user && bcrypt.compareSync(credentials.password, user.password)) {
            return Promise.resolve(user);
          } else {
            return Promise.resolve(null);
          }
        }
      }
    })
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true
  },
  callbacks: {
    async session(session, user) {
      session.user.id = user.id;
      return session;
    }
  }
});
