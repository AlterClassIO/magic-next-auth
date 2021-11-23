import '../styles/globals.css';
import { Provider } from 'next-auth/client';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Magic NextAuth | AlterClass</title>
        <meta
          name="description"
          content="Magic Link Authentication in Next.js with NextAuth and Fauna by AlterClass"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
      <Toaster />
    </>
  );
}

export default MyApp;
