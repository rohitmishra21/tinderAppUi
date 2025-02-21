import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Body from './components/Body'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Body />}>
          <Route path='/singIn' element={<SignIn />} />
          <Route path='/singUp' element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
