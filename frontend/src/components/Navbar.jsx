import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset);
    navigate('/');
  };
  return (
    <header className="flex w-full py-7">
      <nav className="max-w-7xl w-full flex items-center md:px-6 md:px-8 mx-auto">
        <div className="flex-grow text-left">
          <Link
            to="/"
            className="text-s font-semibold text-gray-500 tracking-wide uppercase mb-3 dark:text-neutral-200"
          >
            Customer Support Desk
          </Link>
        </div>
        <div className="flex items-center gap-x-2 justify-end">
          <ul className="flex space-x-3">
            {user ? (
              <li>
                <button
                  className="py-3 px-4 inline-flex justify-center items-center text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none disabled:opacity-50"
                  onClick={onLogout}
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="py-3 px-4 inline-flex justify-center items-center text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-100 focus:outline-none disabled:opacity-50"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="py-3 px-4 inline-flex justify-center items-center text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none disabled:opacity-50"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
