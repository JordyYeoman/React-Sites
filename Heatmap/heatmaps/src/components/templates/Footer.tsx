import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 px-4 md:px-8 text-center">
      <div className="container mx-auto">
        <p className="text-sm md:text-base">
          Copyright &copy; {new Date().getFullYear()} Rema Tip Top. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
