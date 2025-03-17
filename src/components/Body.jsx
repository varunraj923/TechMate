import React from 'react'

import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'



const Body = () => {
  return (
   <>
  <Navbar></Navbar>
   <Outlet></Outlet>
   <Footer></Footer>
 
   </>
  )
}

export default Body
