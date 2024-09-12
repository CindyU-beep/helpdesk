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
    <header className="header">
      <div className="logo">
        <Link
          to="/"
          className="text-s font-semibold text-gray-500 tracking-wide uppercase mb-3 dark:text-neutral-200"
        >
          Customer Support Desk
        </Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button
              className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
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
                className="py-3 px-4 inline-flex justify-center items-center text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="py-3 px-4 inline-flex justify-center items-center text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Navbar;
