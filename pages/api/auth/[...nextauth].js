import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { Client as FaunaClient } from 'faunadb';
import { FaunaAdapter } from '@next-auth/fauna-adapter';
import { readFileSync } from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import Handlebars from 'handlebars';

const client = new FaunaClient({
  secret: process.env.FAUNA_SECRET_KEY,
  domain: process.env.FAUNA_DOMAIN,
});

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: process.env.EMAIL_SERVER_PORT,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
  secure: true,
});

const emailsDir = path.resolve(process.cwd(), 'emails');

const sendVerificationRequest = ({ identifier, url }) => {
  const emailFile = readFileSync(path.join(emailsDir, 'confirm-email.html'), {
    encoding: 'utf8',
  });
  const emailTemplate = Handlebars.compile(emailFile);
  transporter.sendMail({
    from: `"⚡ Magic NextAuth" ${process.env.EMAIL_FROM}`,
    to: identifier,
    subject: 'Your sign-in link for Magic NextAuth',
    html: emailTemplate({
      base_url: process.env.NEXTAUTH_URL,
      signin_url: url,
      email: identifier,
    }),
  });
};

const sendWelcomeEmail = async ({ user }) => {
  const { email } = user;

  try {
    const emailFile = readFileSync(path.join(emailsDir, 'welcome.html'), {
      encoding: 'utf8',
    });
    const emailTemplate = Handlebars.compile(emailFile);
    await transporter.sendMail({
      from: `"⚡ Magic NextAuth" ${process.env.EMAIL_FROM}`,
      to: email,
      subject: 'Welcome to Magic NextAuth! 🎉',
      html: emailTemplate({
        base_url: process.env.NEXTAUTH_URL,
        support_email: 'support@alterclass.io',
      }),
    });
  } catch (error) {
    console.log(`❌ Unable to send welcome email to user (${email})`);
  }
};

export default NextAuth({
  pages: {
    signIn: '/auth/signin',
    signOut: '/',
  },
  providers: [
    EmailProvider({
      maxAge: 10 * 60, // Magic links are valid for 10 min only
      sendVerificationRequest,
    }),
  ],
  adapter: FaunaAdapter(client),
  events: { createUser: sendWelcomeEmail },
  secret: process.env.NEXTAUTH_SECRET,
});
