import { HeartIcon } from '@heroicons/react/solid';

const Layout = ({ children = null }) => (
  <div className="min-h-screen flex flex-col">
    <main className="flex-1 container mx-auto px-6 py-12 flex flex-col items-center justify-center">
      {children}
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

export default Layout;
