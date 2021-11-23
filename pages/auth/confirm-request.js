import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { CheckCircleIcon } from '@heroicons/react/outline';

const ConfirmRequest = () => {
  const [session, loading] = useSession();
  const router = useRouter();

  if (!loading && !session) {
    router.push('/auth/signin');
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-12 max-w-md mx-auto">
      {loading ? (
        <p>Loading...</p>
      ) : !session ? (
        <p>Redirecting...</p>
      ) : (
        <>
          <CheckCircleIcon className="w-16 h-16 text-blue-600 flex-shrink-0" />
          <h1 className="text-4xl font-bold mt-6">You&apos;re logged in!</h1>
          <p className="text-2xl mt-4">Go back to your original tab.</p>
          <p className="text-gray-500 text-lg mt-6">
            You can close this window or click{' '}
            <Link href="/">
              <a className="text-blue-500 hover:underline hover:text-blue-600">
                this link
              </a>
            </Link>{' '}
            to go back to the homepage.
          </p>
        </>
      )}
    </div>
  );
};

export default ConfirmRequest;
