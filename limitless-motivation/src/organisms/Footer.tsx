import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto flex items-center justify-between flex-wrap">
        <div className="w-full md:w-4/12 px-4">
          <p className="text-sm text-gray-500 font-medium">
            &copy; Your Company 2020
          </p>
        </div>
        <div className="w-full md:w-8/12 px-4">
          <ul className="flex justify-end">
            <li className="text-sm mr-3">
              <a href="#footer" className="text-gray-500 hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li className="text-sm">
              <a href="#footer" className="text-gray-500 hover:text-white">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
