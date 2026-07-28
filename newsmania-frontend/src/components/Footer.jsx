import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div>
            <h2 className="text-2xl font-bold mb-3">
              📰 NewsMania
            </h2>

            <p className="text-gray-400">
              Stay updated with the latest news from Technology,
              Business, Sports and Health.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">
              Quick Links
            </h3>

            <div className="flex flex-col gap-2">
              <Link to="/" className="hover:text-blue-400">
                Home
              </Link>

              <Link to="/bookmarks" className="hover:text-blue-400">
                Bookmarks
              </Link>

              <Link to="/profile" className="hover:text-blue-400">
                Profile
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">
              Contact
            </h3>

            <p className="text-gray-400">
              Email: support@newsmania.com
            </p>

            <p className="text-gray-400">
              Bangalore, India
            </p>
          </div>

        </div>

        <hr className="my-6 border-gray-700" />

        <p className="text-center text-gray-400">
          © 2026 NewsMania. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;