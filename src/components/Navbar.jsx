import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASEURL } from '../utils/constants';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { removeUser } from '../utils/userSlice';

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const HandleLogout = async () => {
    try {
      await axios.post(BASEURL + 'logout', {}, { withCredentials: true });
      dispatch(removeUser());
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="navbar fixed top-0 left-0 w-full px-6 py-3 z-50">
      <div className="flex-1">
       { user ? (<Link to="/" className="text-2xl font-bold text-black hover:text-gray-300 transition-all stroke-black">TechMate</Link>)
        :(
       <button className='text-3xl font-bold text-white hover:text-gray-300 transition-all stroke-black'>TechMate</button>)}
      </div>
      <div className="flex items-center gap-4">
        <input 
          type="text" 
          placeholder="Search..." 
          className="input input-bordered input-sm bg-gray-800 text-white placeholder-gray-400 focus:ring focus:ring-blue-500 w-36 md:w-64 rounded-md"
        />
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            {user?.photoUrl ? (
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img src={user.photoUrl} alt="User" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full text-white text-xl">
                😎
              </div>
            )}
          </div>
          <ul 
            tabIndex={0} 
            className="menu dropdown-content bg-gray-900 text-white rounded-lg mt-3 w-48 p-2 shadow-lg z-10"
          >
            <li><Link to="/profile" className="hover:bg-gray-800 p-2 rounded-md">Profile</Link></li>
            <li><Link to="/connections" className="hover:bg-gray-800 p-2 rounded-md">Connections</Link></li>
            <li>
              <button onClick={HandleLogout} className="hover:bg-red-600 p-2 rounded-md text-red-400 hover:text-white w-full text-left">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

