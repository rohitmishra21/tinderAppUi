import React, { useState } from 'react'
import Card from './Card'
import axios from 'axios'
import { BASE_URL } from '../utils/config'
import { useDispatch } from 'react-redux'
import { setUser } from '../utils/UserSlice'

const EditProfile = ({ user }) => {

    const dispatch = useDispatch()
    const [firstName, setfirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [profileImg, setProfileImg] = useState(user.profileImg)
    const [bio, setBio] = useState(user.bio)
    const [skills, setSkills] = useState(user.skills)
    const [age, setAge] = useState(user.age)
    const [gender, setGender] = useState(user.gender)
    const [toast, setToast] = useState(false)

    async function saveProfileHendler() {
        const res = await axios.patch(BASE_URL + "profile/edit", { firstName: firstName, lastName: lastName, age: age, profileImg: profileImg, gender: gender }, { withCredentials: true })
        dispatch(setUser(res.data.data))
        setToast(true)
        setTimeout(() => {
            setToast(false)
        }, 2000);

    }
    return (
        <div className='flex justify-center gap-4 my-2'>
            {toast && <div className="toast toast-top toast-center">

                <div className="alert alert-success">
                    <span>Profile edit successfully...</span>
                </div>
            </div>}
            <div className='flex flex-col bg-base-300 px-10 py-4 gap-5'>
                <div className='flex gap-8'> <label className="form-control  w-full  max-w-xs">
                    <div className="label mb-2">
                        <span className="label-text">First Name</span>

                    </div>
                    <input type="text" value={firstName} onChange={(e) => setfirstName(e.target.value)} className="input input-bordered w-full max-w-xs" />

                </label>
                    <label className="form-control w-full flex flex-col gap-2 max-w-xs">
                        <div className="label ">
                            <span className="label-text">Last Name</span>

                        </div>
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input input-bordered w-full max-w-xs" />

                    </label>
                </div>
                <div className='flex gap-8'>
                    <label className="form-control w-full flex flex-col gap-2 max-w-xs">
                        <div className="label">
                            <span className="label-text">Age</span>

                        </div>
                        <input type="text" value={age} onChange={(e) => setAge(e.target.value)} className="input input-bordered w-full max-w-xs" />

                    </label>
                    <label className="form-control w-full flex flex-col gap-2 max-w-xs">
                        <div className="label">
                            <span className="label-text">Gender</span>

                        </div>
                        <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} className="input input-bordered w-full max-w-xs" />

                    </label>
                </div>
                <label className="form-control w-full flex flex-col gap-2 ">
                    <div className="label">
                        <span className="label-text">Profile Img</span>

                    </div>
                    <input type="text" value={profileImg} onChange={(e) => setProfileImg(e.target.value)} className="input input-bordered w-full " />

                </label>
                <label className="form-control w-full flex flex-col gap-2 ">
                    <div className="label">
                        <span className="label-text">Bio</span>

                    </div>
                    <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} className="input input-bordered w-full " />

                </label>
                <label className="form-control w-full flex flex-col gap-2 ">
                    <div className="label">
                        <span className="label-text">Skills</span>

                    </div>
                    <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} className="input input-bordered w-full " />

                </label>

                <button className="btn btn-primary" onClick={saveProfileHendler}>Save Profile</button>

            </div>
            <Card user={{ firstName, lastName, age, gender, profileImg, skills, bio }} />
        </div>
    )
}

export default EditProfile
