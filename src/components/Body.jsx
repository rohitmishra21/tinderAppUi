import React from 'react'
import Navbar from './Navbar'
import Fotter from './Fotter'
import { Outlet } from 'react-router-dom'

const Body = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Fotter />
        </div>
    )
}

export default Body
