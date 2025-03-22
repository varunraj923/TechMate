import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASEURL } from '../utils/constants'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { removeUser } from '../utils/userSlice'

const Navbar = () => {

  const user = useSelector((store=> store.user))
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(user)

  const HandleLogout = async()=>{
    const user = await axios.post(BASEURL+"logout", {},  {withCredentials : true});
    dispatch(removeUser());
    navigate("/login");

  }
  return (

    <div className="navbar bg-base-200 shadow-sm">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl ml-7">TechMate</Link>
  </div>
  <div className="flex gap-2 mr-10">
    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto mr-10" />
    {/* <h1>Welcome, {user.firstName}</h1> */}
    
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
       { user&& (<div className="w-10 rounded-full">
        
          <img
            alt="Tailwind CSS Navbar component"
            src={user.photoUrl} />
        </div>
       )
}
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><a>Settings</a></li>
        <li><a onClick={HandleLogout}>Logout</a></li>  
      </ul>
    </div>
  </div>
</div>
  )
}

export default Navbar
