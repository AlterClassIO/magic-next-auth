import { signOut, useSession } from 'next-auth/client';
import Link from 'next/link';
import { LightningBoltIcon } from '@heroicons/react/outline';
import { HeartIcon } from '@heroicons/react/solid';

export default function Home() {
  const [session] = useSession();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-6 py-12 flex flex-col items-center justify-center">
        <h1 className="inline-flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <LightningBoltIcon className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 text-blue-500" />
          <span className="sm:h-16 text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-blue-700 text-center">
            Magic NextAuth
          </span>
        </h1>
        <p className="mt-4 text-gray-500 text-xl sm:text-2xl text-center">
          Magic Link Authentication in Next.js with NextAuth and Fauna
        </p>
        <div className="mt-8">
          {session?.user ? (
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

      <footer className="text-center container mx-auto px-4 sm:px-6 py-6">
        <a
          href="https://alterclass.io/teaching"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-current"
        >
          Made with{' '}
          <HeartIcon className="inline-block w-4 h-4 -mt-1 text-red-600 animate-pulse" />{' '}
          by AlterClass.io
        </a>
      </footer>
    </div>
  );
}
