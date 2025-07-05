import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../utils/config'
import { useDispatch } from 'react-redux'
import { removeFeed } from '../utils/FeedSlice'

const Card = ({ user }) => {

    const { _id, firstName, lastName, age, profileImg, skills, gender } = user
    const dispatch = useDispatch()
    async function requestHendler(status, id) {
        const res = await axios.post(BASE_URL + "request/send/" + status + "/" + id, {}, { withCredentials: true })
        dispatch(removeFeed(_id))
    }
    return (user && <div className=''>
        <div className="card bg-base-300 w-96 md:h-[75vh] shadow-xl">
            <figure>
                <img
                    src={profileImg}
                    alt="profile Img"
                    className='w-full h-full object-cover object-center'
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                <p>{age && gender && "age: " + age + " " + " Gender: " + gender}</p>
                <p>{skills && skills}</p>
                <div className="card-actions justify-center mt-2">
                    <button onClick={() => { requestHendler("ignored", _id) }} className="btn btn-primary bg-error border-none shadow-none">Ignored</button>
                    <button onClick={() => { requestHendler("intrested", _id) }} className="btn btn-primary">Intrested</button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Card
