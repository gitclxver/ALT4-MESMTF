import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function Header() {
  const { currentUser, userData, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <header className="bg-blue-500 text-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="hover:text-gray-500 font-bold transition-colors px-3 py-2 rounded-md text-sm lg:text-base"
          aria-current="page"
        >
          MESMTF
        </Link>
        <nav>
          <ul className="flex space-x-4 lg:space-x-8 items-center">
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
            
            {/* Show different navigation based on authentication status */}
            {!currentUser ? (
              <>
                <li>
                  <Link
                    to="/login"
                    className="hover:text-gray-600 font-semibold transition-colors px-3 py-2 rounded-md text-sm lg:text-base"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="bg-cyan-600 text-white hover:bg-cyan-700 font-semibold transition-colors px-4 py-2 rounded-md text-sm lg:text-base"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to={userData?.role === 'patient' ? '/patient-dashboard' : '/official-dashboard'}
                    className="hover:text-gray-600 font-semibold transition-colors px-3 py-2 rounded-md text-sm lg:text-base"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <span className="text-sm text-gray-700">
                    Welcome, {userData?.firstName}
                  </span>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white hover:bg-red-700 font-semibold transition-colors px-4 py-2 rounded-md text-sm lg:text-base"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;