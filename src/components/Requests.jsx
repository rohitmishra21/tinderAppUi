import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/config'
import { useDispatch, useSelector } from 'react-redux'
import { setRequest } from '../utils/RequestSlice'

const Requests = () => {
    const userRequests = useSelector((state) => state.requests)
    const dispatch = useDispatch()
    const getRequest = async () => {
        const res = await axios.get(BASE_URL + "user/request/recived", { withCredentials: true })
        dispatch(setRequest(res.data))
    }

    async function requestHendler(status, id) {
        const res = await axios.post(BASE_URL + "request/review/" + status + "/" + id, {}, { withCredentials: true })
        console.log(res);

    }
    useEffect(() => {
        getRequest()
    }, [requestHendler])

    if (!userRequests) {
        return
    }
    if (userRequests.length === 0) {
        return <h1 className='text-xl text-center mt-3'>You don't have any connection request</h1>
    }
    return (

        <div className=''>
            <h1 className='text-center font-serif text-3xl my-2'>Requests</h1>
            {userRequests.map((connection) => {
                const { firstName, lastName, gender, profileImg, age, _id } = connection.fromUserId
                return (
                    <div key={_id} className='text-3xl mx-auto px-6 justify-center items-center my-5 py-5 w-fit bg-base-300 flex gap-10'>
                        <img className='w-12 h-12 object-center object-cover rounded-full ' src={profileImg} alt="" />
                        <h1>{firstName + " " + lastName}</h1>
                        <div>
                            <button onClick={() => requestHendler("accepted", connection._id)} className="btn capitalize btn-primary">accepted</button>
                            <button onClick={() => requestHendler("rejected", connection._id)} className="btn capitalize btn-secondary mx-2">rejected</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default Requests
