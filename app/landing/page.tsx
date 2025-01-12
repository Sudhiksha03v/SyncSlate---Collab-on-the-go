import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header'; // Import your Header component

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white font-sans">
      {/* Header */}
      <Header>
        <Link href="/sign-in">
          <span className="px-4 py-2 text-sm font-medium bg-blue-500 rounded-lg hover:bg-blue-600 transition">
            Sign In
          </span>
        </Link>
      </Header>

      {/* Hero Section */}
      <header className="flex items-center justify-center text-center min-h-[65vh] px-6">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
            Collaborate Seamlessly with <span className="text-blue-500">SyncSlate</span>
          </h1>
          <p className="mt-3 text-sm text-gray-400 sm:text-lg">
            Your go-to platform for real-time collaboration and seamless editing. 
            Designed for teams, creators, and innovators to work together effectively.
          </p>
          <Link href="/sign-in">
            <span className="mt-4 inline-block px-6 py-3 text-sm font-medium bg-blue-500 rounded-lg hover:bg-blue-600 transition">
              Get Started
            </span>
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          <div className="flex flex-col items-center text-center">
            <div className="p-4 bg-blue-500 rounded-full">
            <Image src="/assets/icons/collaboration.png" alt="Collaboration Icon" width={40} height={40} />
            </div>
            <h3 className="mt-3 text-lg font-semibold">Real-time Collaboration</h3>
            <p className="mt-2 text-sm text-gray-400">
              Work together with your team instantly and effortlessly.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="p-4 bg-blue-500 rounded-full">
            <Image src="/assets/icons/security.png" alt="Secure Icon" width={40} height={40} />

            </div>
            <h3 className="mt-3 text-lg font-semibold">Secure & Reliable</h3>
            <p className="mt-2 text-sm text-gray-400">
              Protect your data with end-to-end encryption and reliability.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="p-4 bg-blue-500 rounded-full">
              <img src="/assets/icons/customize.png" alt="Customizable Icon" className="w-10 h-10" />
            </div>
            <h3 className="mt-3 text-lg font-semibold">Customizable Workflow</h3>
            <p className="mt-2 text-sm text-gray-400">
              Adapt the platform to fit your unique team requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Spacing After Features Section */}
      <div className="py-12"></div>

      {/* Newsletter Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Stay Updated
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Subscribe to our newsletter to get the latest updates and insights straight to your inbox.
          </p>
          <form className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="px-4 py-2 w-full sm:w-auto text-black rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="px-5 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Spacing After Newsletter Section */}
      <div className="py-12"></div>

      {/* Footer */}
      <footer className="py-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black border-t border-gray-700">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-gray-400">
            SyncSlate © | All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
