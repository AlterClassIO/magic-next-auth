import { signOut, useSession } from 'next-auth/client';
import Head from 'next/head';
import Link from 'next/link';
import { LightningBoltIcon } from '@heroicons/react/outline';

export default function Home() {
  const [session, loading] = useSession();

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

      <main className="min-h-screen container mx-auto px-6 py-12 flex flex-col items-center justify-center">
        <h1 className="inline-flex items-center space-x-2">
          <LightningBoltIcon className="flex-shrink-0 w-16 h-16 text-blue-500" />
          <span className="h-16 text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-blue-700">
            Magic NextAuth
          </span>
        </h1>
        <p className="mt-4 text-gray-500 text-2xl">
          Magic Link Authentication in Next.js with NextAuth and Fauna
        </p>
        <div className="mt-8">
          {loading ? null : session?.user ? (
            <div className="text-lg flex flex-col space-y-1 bg-gray-200 rounded-lg px-6 py-3 animate-appear">
              <p>
                Signed in as <strong>{session.user.email}</strong>
              </p>
              <button
                onClick={signOut}
                className="font-semibold underline opacity-70 hover:opacity-100"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link href="/auth/signin">
              <a className="px-6 py-3 rounded-md text-lg text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition">
                Get started
              </a>
            </Link>
          )}
        </div>
      </main>
    </>
  );
}
