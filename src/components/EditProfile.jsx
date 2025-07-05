import React, { useState } from 'react';
import Card from './Card';
import axios from 'axios';
import { BASE_URL } from '../utils/config';
import { useDispatch } from 'react-redux';
import { setUser } from '../utils/UserSlice';
import Error from './Error';

const EditProfile = ({ user }) => {
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState(user.firstName || '');
    const [lastName, setLastName] = useState(user.lastName || '');
    const [profileImg, setProfileImg] = useState(
        user.profileImg ||
        'https://images.unsplash.com/photo-1707061229453-853fc706b6fc?w=600&auto=format&fit=crop&q=60'
    );
    const [bio, setBio] = useState(user.bio || '');
    const [skills, setSkills] = useState(user.skills?.join(', ') || '');
    const [age, setAge] = useState(user.age || '');
    const [gender, setGender] = useState(user.gender || '');
    const [toast, setToast] = useState(false);
    const [err, setErr] = useState([]);

    async function saveProfileHandler() {
        try {
            const payload = {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                age: Number(age),
                gender: gender.toLowerCase(),
                profileImg: profileImg.trim() || 'https://your-default-url.com',
                bio: bio.trim(),
                skills: skills
                    .split(',')
                    .map((skill) => skill.trim())
                    .filter((s) => s !== ''),
            };

            const res = await axios.patch(`${BASE_URL}profile/edit`, payload, {
                withCredentials: true,
            });

            dispatch(setUser(res.data.data));
            setToast(true);
            setErr([]);

            setTimeout(() => {
                setToast(false);
            }, 2000);
        } catch (error) {
            if (error.response?.data?.errors) {
                setErr(error.response.data.errors);
            } else {
                setErr(['Something went wrong. Please try again.']);
            }
        }
    }

    return (
        <div className="md:flex px-3 justify-center gap-4 md:my-2 ">
            {toast && (
                <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <span>Profile updated successfully.</span>
                    </div>
                </div>
            )}

            <div className="flex flex-col bg-base-300 px-10 py-4 gap-5">
                {/* Input Fields */}
                <div className="flex gap-8">
                    <label className="form-control w-full max-w-xs">
                        <div className="label mb-2">
                            <span className="label-text">First Name</span>
                        </div>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="input input-bordered w-full max-w-xs"
                        />
                    </label>

                    <label className="form-control w-full max-w-xs">
                        <div className="label mb-2">
                            <span className="label-text">Last Name</span>
                        </div>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="input input-bordered w-full max-w-xs"
                        />
                    </label>
                </div>

                <div className="flex gap-8">
                    <label className="form-control w-full max-w-xs">
                        <div className="label mb-2">
                            <span className="label-text">Age</span>
                        </div>
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="input input-bordered w-full max-w-xs"
                        />
                    </label>

                    <label className="form-control w-full max-w-xs">
                        <div className="label mb-2">
                            <span className="label-text">Gender</span>
                        </div>
                        <input
                            type="text"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="input input-bordered w-full max-w-xs"
                        />
                    </label>
                </div>

                <label className="form-control w-full">
                    <div className="label mb-2">
                        <span className="label-text">Profile Image URL</span>
                    </div>
                    <input
                        type="text"
                        value={profileImg}
                        onChange={(e) => setProfileImg(e.target.value)}
                        className="input input-bordered w-full"
                    />
                </label>

                <label className="form-control w-full">
                    <div className="label mb-2">
                        <span className="label-text">Bio</span>
                    </div>
                    <input
                        type="text"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="input input-bordered w-full"
                    />
                </label>

                <label className="form-control w-full">
                    <div className="label mb-2">
                        <span className="label-text">Skills (comma separated)</span>
                    </div>
                    <input
                        type="text"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        className="input input-bordered w-full"
                    />
                </label>

                <Error err={err} />

                <button className="btn btn-primary" onClick={saveProfileHandler}>
                    Save Profile
                </button>
            </div>
            <Card
                user={{
                    firstName,
                    lastName,
                    age,
                    gender,
                    profileImg,
                    skills: skills.split(','),
                    bio,
                }}
            />
        </div>
    );
};

export default EditProfile;
