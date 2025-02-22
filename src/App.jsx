import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Body from './components/Body'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import { Provider } from 'react-redux'
import AppStore from './utils/AppStore'
import Feed from './components/Feed'
import Profile from './components/Profile'


const App = () => {
  return (
    <Provider store={AppStore}>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/singIn" element={<SignIn />} />
            <Route path="/singUp" element={<SignUp />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>

  )
}

export default App
