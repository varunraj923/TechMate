import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'
import { BASEURL } from '../utils/constants'
import { addUser } from '../utils/userSlice'
import { Navigate } from 'react-router-dom'





const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const userData = useSelector(store=> store.data);
  const FetchProfile = async()=>{
    if(userData){
      return;
    }
   

    try{
      
        const res = await axios.get(BASEURL+"profile", {
          withCredentials : true,
        });
      
    

      dispatch(addUser(res.data));


    }
    catch(err){
      console.error(err);
      navigate("/login");
    }
  }

  useEffect(()=>{
FetchProfile();
  }, []);
  return (
    
   <>
  <Navbar></Navbar>
   <Outlet></Outlet>
   <Footer></Footer>
 
   </>
  )
}

export default Body
