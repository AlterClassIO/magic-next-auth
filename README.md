# Magic NextAuth

Magic Link Authentication in Next.js with NextAuth and Fauna by [AlterClass.io](https://alterclass.io/teaching)

**Preview the example live [here](https://magic-next-auth.vercel.app/).**

**Deploy the example using Vercel:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/AlterClassIO/magic-next-auth&project-name=Magic+Auth+by+AlterClass&repository-name=Magic+Auth+by+AlterClass)

## Getting Started

### 1. Clone the repository and install dependencies

```
git clone https://github.com/AlterClassIO/magic-next-auth
cd magic-next-auth
npm install
```

### 2. Configure your local environment

Rename the .env.local.example file in this directory to .env.local (which will
be ignored by Git):

```
cp .env.local.example .env.local
```

Add details for the SMTP server.

### 3. Start the application

To run your site locally, use:

```
npm run dev
```

To run it in production mode, use:

```
npm run build
npm run start
```

### 4. Preparing for Production

You must set the `NEXTAUTH_URL` environment variable with the URL of your site,
before deploying to production.

e.g. in your `.env.local` file - `NEXTAUTH_URL=https://example.com`

To do this with Vercel, you can use the
[Vercel project dashboard](https://vercel.com/dashboard) or their cli via the
`vc env` command:

```
vc env add NEXTAUTH_URL production
```

## License

[MIT](https://github.com/AlterClassIO/magic-next-auth/blob/master/LICENSE)
