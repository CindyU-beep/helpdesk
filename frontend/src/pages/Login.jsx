import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import eyeOpenIcon from '../assets/svg/eyeOpenIcon.svg';
import eyeClosedIcon from '../assets/svg/eyeClosedIcon.svg';
function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  //initialise actions
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //get state
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    //redirect when logged in
    if (isSuccess || user) {
      navigate('/');
    }
    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="w-3/4 flex flex-col w-full md:w-1/2 xl:w-3/5 2xl:w-3/5 3xl:w-2/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-[#4B5563] text-[#4B5563] my-auto">
          Login to Helpdesk
        </h1>
        <div className="text-sm font-light text-[#6B7280] pb-8 ">
          Login to your account
        </div>
        <form onSubmit={onSubmit} className="flex flex-col">
          <div className="pb-2">
            <label
              for="email"
              className="content-left block mb-2 text-sm font-medium text-[#111827] text-left"
            >
              Email
            </label>
            <div className="relative text-gray-400">
              <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-mail"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
              </span>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={onChange}
                className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
                placeholder="name@company.com"
                autocomplete="on"
                required
              />
            </div>
          </div>
          <div className="pb-6">
            <label
              for="password"
              className="content-left block mb-2 text-sm font-medium text-[#111827] text-left"
            >
              Password
            </label>
            <div className="relative text-gray-400">
              <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-square-asterisk"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                  <path d="M12 8v8"></path>
                  <path d="m8.5 14 7-4"></path>
                  <path d="m8.5 10 7 4"></path>
                </svg>
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                value={password}
                onChange={onChange}
                placeholder="••••••••••"
                className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
                autocomplete="new-password"
                required
              />
              <span className="absolute inset-y-0 right-0 flex items-center p-1 pr-3">
                <img
                  src={showPassword ? eyeClosedIcon : eyeOpenIcon}
                  alt={showPassword ? 'Hide password' : 'Show password'}
                  className="content-end h-5 w-5 text-gray-600 hover:text-gray-600 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="w-full text-[#FFFFFF] bg-[#4F46E5] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
          >
            Login
          </button>
          <div className="text-sm font-light text-[#6B7280] ">
            Don't have an accout yet?{' '}
            <Link
              to="/register"
              className="font-medium text-[#4F46E5] hover:underline"
            >
              {' '}
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
export default Login;
