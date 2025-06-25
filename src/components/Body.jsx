import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

import { Outlet, useNavigate } from 'react-router-dom'

import Navbar from './Navbar'
import { BASEURL } from '../utils/constants'
import { addUser } from '../utils/userSlice'
import Header from "./Header";







const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const userData = useSelector(store=> store.data);
  const FetchProfile = async()=>{
    if(userData){
      return;
    }
   

    try{
      
        const res = await axios.get(BASEURL+"/profile", {
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
 <Header/>
   <Outlet></Outlet>
   
 
   </>
  )
}

export default Body

