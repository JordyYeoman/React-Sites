export default function Header() {
  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white font-bold text-2xl flex-col justify-center items-center">
        <div>RIMA</div>
        <p className="text-sm -mt-2 uppercase">Tip Top</p>
      </div>
      <nav>
        <ul className="flex justify-between items-center space-x-4">
          <li>
            <a href="#" className="text-white hover:text-gray-400">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-400">
              About
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-400">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
