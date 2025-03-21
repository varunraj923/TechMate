import React from 'react'
import { useSelector } from 'react-redux'

const Navbar = () => {

  const user = useSelector((store=> store.user))
  console.log(user)
  return (

    <div className="navbar bg-base-200 shadow-sm">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl ml-7">TechMate</a>
  </div>
  <div className="flex gap-2 mr-10">
    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto mr-10" />
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
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
  )
}

export default Navbar
