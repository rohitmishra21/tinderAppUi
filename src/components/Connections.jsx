import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/config'
import { useDispatch, useSelector } from 'react-redux'
import { setConnection } from '../utils/ConnectionSlice'

const Connections = () => {
    const dispatch = useDispatch()
    const userConnection = useSelector((state) => state.connection)

    const getConnection = async () => {
        const res = await axios.get(BASE_URL + "user/request/connection", { withCredentials: true })
        dispatch(setConnection(res.data))
    }
    useEffect(() => {
        getConnection()
    }, [])

    if (!userConnection) {
        return
    }

    if (userConnection.length === 0) {
        return <h1>No your connection</h1>
    }
    return (

        <div className=''>
            <h1 className='text-center font-serif text-3xl my-2'>Connetions</h1>
            {userConnection.map((connection) => {
                const { firstName, lastName, gender, profileImg, age, _id } = connection

                return (
                    <div key={_id} className='text-3xl mx-auto px-6 justify-center items-center my-5 py-5 w-fit bg-base-300 flex gap-10'>
                        <img className='w-12 h-12 object-center object-cover rounded-full ' src={profileImg} alt="" />
                        <h1>{firstName + " " + lastName}</h1>

                    </div>
                )
            })}
        </div>
    )
}

export default Connections
