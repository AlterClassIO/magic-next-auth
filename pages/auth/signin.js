import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/router';
import { signIn, getSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { LightningBoltIcon, MailOpenIcon } from '@heroicons/react/outline';
import Layout from '../../components/Layout';

const MagicLinkModal = ({ show = false, email = '' }) => {
  if (!show) return null;

  return createPortal(
    <div className="fixed inset-0 z-10 bg-white bg-opacity-90 backdrop-filter backdrop-blur-md backdrop-grayscale">
      <div className="min-h-screen px-6 flex flex-col items-center justify-center animate-zoomIn">
        <div className="flex flex-col items-center justify-center text-center max-w-sm">
          <MailOpenIcon className="flex-shrink-0 w-12 h-12 text-blue-500" />
          <h3 className="mt-2 text-2xl font-semibold">Confirm your email</h3>
          <p className="mt-4 text-lg">
            We emailed a magic link to <strong>{email}</strong>. Check your
            inbox and click the link in the email to login.
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
};

const SignIn = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let intervalId, redirecting;

    if (showModal) {
      setInterval(async () => {
        const session = await getSession();
        if (session && !redirecting) {
          // User connected using the magic link -> redirect him/her
          redirecting = true;
          router.push(router.query?.callbackUrl || '/');
        }
      }, 1000);
    }

    return () => {
      intervalId && clearInterval(intervalId);
    };
  }, [showModal, router]);

  const handleSignIn = async e => {
    e.preventDefault();
    let toastId;
    try {
      toastId = toast.loading('Loading...');
      setDisabled(true);
      // Perform sign in
      const { error } = await signIn('email', {
        email,
        redirect: false,
        callbackUrl: `${window.location.origin}/auth/confirm-request`,
      });
      // Something went wrong
      if (error) {
        throw new Error(error);
      }
      setShowModal(true);
      toast.success('Magic link successfully sent', { id: toastId });
    } catch (error) {
      console.log(error);
      toast.error('Unable to send magic link', { id: toastId });
    } finally {
      setDisabled(false);
    }
  };

  return (
    <Layout>
      <LightningBoltIcon className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 text-blue-500" />
      <h1 className="mt-2 text-2xl sm:text-4xl text-center font-bold">
        Sign in to your account
      </h1>
      <form
        onSubmit={handleSignIn}
        className="mt-8 rounded-lg shadow-md bg-white px-4 py-6 sm:px-8 sm:py-8 space-y-6 w-full max-w-md"
      >
        <div className="flex flex-col space-y-1">
          <label htmlFor="email" className="text-gray-500 text-sm">
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="elon@spacex.com"
            disabled={disabled}
            className="py-2 px-4 w-full border rounded-md border-gray-300 focus:outline-none focus:ring-4 focus:ring-opacity-20 focus:border-blue-400 focus:ring-blue-400 transition disabled:opacity-50 disabled:cursor-not-allowed "
          />
        </div>
        <button
          type="submit"
          disabled={disabled}
          className="px-6 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500 transition"
        >
          {disabled ? 'Loading...' : 'Sign in'}
        </button>
      </form>

      <MagicLinkModal show={showModal} email={email} />
    </Layout>
  );
};

export default SignIn;
