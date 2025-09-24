import { Link } from "react-router-dom"; 

function Header() {
    return (
      <header className="bg-blue-500 text-gray-800  p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="hover:text-gray-500 font-bold transition-colors px-3 py-2 rounded-md text-sm lg:text-base"
            aria-current="page"
          >
            MESMTF
          </Link>
          <nav>
            <ul className="flex space-x-4 lg:space-x-8">
              <li>
                <Link
                  to="/pharmacy"
                  className="hover:text-gray-600 font-semibold transition-colors px-3 py-2 rounded-md text-sm lg:text-base"
                  aria-current="page"
                >
                  Pharmacy
                </Link>
              </li>
              <li>
                <Link
                  to="/report"
                  className="hover:text-gray-600 font-semibold transition-colors px-3 py-2 rounded-md text-sm lg:text-base"
                  aria-current="page"
                >
                  Report
                </Link>
              </li>
              <li>
                <Link
                  to="/patient-dashboard"
                  className="hover:text-gray-600 font-semibold transition-colors px-3 py-2 rounded-md text-sm lg:text-base"
                  aria-current="page"
                >
                  Login Patient
                </Link>
              </li>
              <li>
                <Link
                  to="/official-dashboard"
                  className="hover:text-gray-600 font-semibold transition-colors px-3 py-2 rounded-md text-sm lg:text-base"
                  aria-current="page"
                >
                  Login Official
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
}

export default Header;