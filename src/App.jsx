import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Body from './components/Body'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import { Provider } from 'react-redux'
import AppStore from './utils/AppStore'
import Feed from './components/Feed'
import Profile from './components/Profile'
import Connections from './components/Connections'
import Requests from './components/Requests'
import Chat from './components/Chat'


const App = () => {
  return (
    <Provider store={AppStore}>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />} />
            <Route path="/singIn" element={<SignIn />} />
            <Route path="/singUp" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/request" element={<Requests />} />
            <Route path="/chat/:id" element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>

  )
}

export default App
