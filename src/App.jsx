import React from 'react'
import { Provider } from 'react-redux'

import { BrowserRouter,Route, Routes} from 'react-router-dom'
import Body from './components/Body'
import Login from './components/Login'
import appStore from './utils/appStore'


const App = () => {
  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter basename='/'>
    <Routes>
      <Route path='/' element={<Body/>}>
      <Route path='/login' element={<Login/>}></Route>
      </Route>
      
    </Routes>
    </BrowserRouter>

    </Provider>
    
    </>
  )
}

export default App
