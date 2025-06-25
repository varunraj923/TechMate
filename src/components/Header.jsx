import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BASEURL } from '../utils/constants';
import axios from 'axios';
import { removeUser } from '../utils/userSlice';
import { FaCode } from 'react-icons/fa'; // for </> icon

const Header = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASEURL + '/logout', {}, { withCredentials: true });
      dispatch(removeUser());
      navigate('/login');
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="navbar fixed top-0 left-0 w-full z-50 px-6 py-3 backdrop-blur-md bg-black/60 text-white shadow-md border-b-2 border-blue-500">
      <div className="flex-1">
        {user ? (
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold hover:text-gray-300 transition"
          >
            <FaCode className="text-blue-400" />
            TechMate
          </Link>
        ) : (
          <span className="flex items-center gap-2 text-2xl font-bold">
            <FaCode className="text-blue-400" />
            TechMate
          </span>
        )}
      </div>

      {user && (
        <div className="flex items-center gap-4">
          <span className="hidden md:block font-semibold text-white">
            Welcome, {user.firstName}
          </span>

          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              {user?.photoUrl ? (
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img src={user.photoUrl} alt="User" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full">
                  <img
                    src="https://cdn-icons-png.freepik.com/512/7718/7718888.png"
                    alt="default"
                    className="w-8 h-8"
                  />
                </div>
              )}
            </div>

            <ul
              tabIndex={0}
              className="menu dropdown-content bg-gray-900 text-white rounded-lg mt-3 w-48 p-2 shadow-lg z-10"
            >
              <li>
                <Link to="/profile" className="hover:bg-gray-800 p-2 rounded-md">Profile</Link>
              </li>
              <li>
                <Link to="/connections" className="hover:bg-gray-800 p-2 rounded-md">Connections</Link>
              </li>
              <li>
                <Link to="/requests" className="hover:bg-gray-800 p-2 rounded-md">Received Requests</Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="hover:bg-red-600 p-2 rounded-md text-red-400 hover:text-white w-full text-left"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;



