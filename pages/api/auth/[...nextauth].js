import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { Client as FaunaClient } from 'faunadb';
import { FaunaAdapter } from '@next-auth/fauna-adapter';

const faunaClient = new FaunaClient({
  secret: process.env.FAUNA_SECRET_KEY,
  scheme: 'http',
  domain: process.env.FAUNA_DOMAIN,
  port: 8443,
});

export default NextAuth({
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      maxAge: 10 * 60, // Magic links are valid for 10 min only
    }),
  ],
  adapter: FaunaAdapter(faunaClient),
});
