import React from 'react'
import { Provider } from 'react-redux'
import Feed from './components/Feed'


import { BrowserRouter,Route, Routes} from 'react-router-dom'
import Body from './components/Body'
import Login from './components/Login'
import appStore from './utils/appStore'
import Profile from './components/Profile'
import Connections from './components/Connections'
import Requests from './components/Requests'





const App = () => {

 
  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter basename='/' >
    <Routes>
      <Route path='/' element={<Body/>}>
      <Route path='/' element={<Feed/>}></Route>
      <Route path='/Profile' element={<Profile/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/connections' element={<Connections/>}></Route>
      <Route path='/requests' element={<Requests/>}></Route>

      </Route>
      
    </Routes>
    </BrowserRouter>

    </Provider>
    
    </>
  )
}

export default App
