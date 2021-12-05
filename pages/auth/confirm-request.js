import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { CheckCircleIcon } from '@heroicons/react/outline';
import Layout from '../../components/Layout';

const ConfirmRequest = () => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  const router = useRouter();

  if (!loading && !session) {
    router.push('/auth/signin');
  }

  return (
    <Layout>
      {loading ? (
        <p>Loading...</p>
      ) : !session ? (
        <p>Redirecting...</p>
      ) : (
        <>
          <CheckCircleIcon className="w-14 h-14 sm:w-16 sm:h-16 text-blue-600 flex-shrink-0" />
          <h1 className="text-2xl sm:text-4xl font-bold mt-4">
            You&apos;re logged in!
          </h1>
          <p className="text-lg sm:text-2xl mt-4">
            Go back to your original tab.
          </p>
          <p className="text-normal sm:text-lg text-gray-500 mt-6">
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
    </Layout>
  );
};

export default ConfirmRequest;
