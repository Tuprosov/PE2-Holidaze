import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#d6e4e7] py-10 text-center">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
        {/* Support */}
        <div>
          <h3 className="mb-4">Support</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Cancellation Options
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Neighborhood Support
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Trust & Safety
              </a>
            </li>
          </ul>
        </div>

        {/* Hosting */}
        <div>
          <h3 className="font-bold text-lg mb-4">Hosting</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Become a Host
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Host Resources
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Community Forum
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Hosting Responsibility
              </a>
            </li>
          </ul>
        </div>

        {/* Holidaze */}
        <div>
          <h3 className="font-bold text-lg mb-4">Holidaze</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Newsroom
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Investors
              </a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-bold text-lg mb-4">Follow Us</h3>
          <div className="flex justify-center space-x-4 text-2xl">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebook className="hover:text-blue-600" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram className="hover:text-pink-500" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter className="hover:text-blue-400" />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <FaGithub className="hover:text-gray-800" />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Holidaze. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
