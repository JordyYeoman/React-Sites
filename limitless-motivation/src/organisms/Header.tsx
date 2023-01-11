import React, { useState } from "react";

const Header = () => {
  return (
    <header className="bg-gray-900">
      <div className="block lg:hidden">
        <MobileHeader />
      </div>
      <div className="hidden lg:block">
        <DesktopHeader />
      </div>
    </header>
  );
};

export default Header;

const MobileHeader = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  return (
    <nav className="flex items-center justify-between flex-wrap p-6">
      <LogoSection />
      <button
        className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
        onClick={() => {
          setDropdownMenu(!dropdownMenu);
        }}
      >
        <svg
          className="fill-current h-3 w-3"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
      {dropdownMenu && <SubMenu />}
    </nav>
  );
};

const DesktopHeader = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap p-6">
      <LogoSection />
      <div>
        <SubMenu />
      </div>
    </nav>
  );
};

const LogoSection = () => {
  return (
    <div className="flex items-center flex-shrink-0 text-white mr-6">
      <svg
        className="fill-current h-8 w-8 mr-2"
        width="54"
        height="54"
        viewBox="0 0 54 54"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
      </svg>
      <span className="font-semibold text-xl tracking-tight">
        Limitless Motivation
      </span>
    </div>
  );
};

const SubMenu = () => {
  return (
    <div className="w-full block flex-col items-center lg:flex-row flex-grow md:flex lg:items-center lg:w-auto">
      <div className="text-sm lg:flex-grow lg:flex lg:items-center">
        <a
          href="#responsive-header"
          className="block mt-4 text-center lg:text-left lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-0 lg:mr-4"
        >
          Home
        </a>
        <a
          href="#responsive-header"
          className="block mt-4 text-center lg:text-left lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-0 lg:mr-4"
        >
          Subscription
        </a>
        <a
          href="#responsive-header"
          className="block my-4 lg:mb-0 text-center lg:text-left lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-0 lg:mr-4"
        >
          Contact
        </a>
      </div>
      <div>
        <a
          href="#responsive-header"
          className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white"
        >
          Sign In
        </a>
      </div>
    </div>
  );
};
