import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:7777/login", {
        emailId, 
        password,
       
      }, {withCredentials : true});
      console.log(response.data)
      dispatch(addUser(response.data));
      navigate("/");
     
      
    } catch (err) {
      console.error('Login Failed:', err.response?.data || err.message);
      
    }
  };

  return (
    <div className='ml-120 p-8 w-96 bg-white mt-15 shadow-2xl rounded-2xl h-1/2'>
      <h1 className='text-3xl font-bold text-center'>Login</h1>

      <div className='text-center mt-5'>
        <div className='email-section mt-4'>
          <label htmlFor="email" className='text-lg text-left'>Email</label>
          <br />
          <input
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            className='border-2 text-center border-gray-500 rounded-md px-7 py-1.5 mt-2'
            type="text"
            name="email"
            placeholder='Enter your email Id'
          />
        </div>

        <div className='password-section mt-4'>
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            placeholder='Enter your password'
            className='border-2 border-gray-500 rounded-md px-7 py-1.5 mt-2'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <button
        className='px-5 py-1.5 border-2 border-gray-500 bg-purple-800 text-white mt-5 text-center ml-30 rounded-md hover:bg-blue-500'
        onClick={handleLoginSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default Login;
