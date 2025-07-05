import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Fotter from './Fotter'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../utils/config'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../utils/UserSlice'

const Body = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const fetchData = async () => {

        try {
            const res = await axios.get(BASE_URL + "profile/view", { withCredentials: true })
            dispatch(setUser(res.data))

        } catch (error) {
            if (error.status === 401) {
                navigate("/singUp")
            }


        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            <Navbar />
            <Outlet />
            <Fotter />
        </div>
    )
}

export default Body
