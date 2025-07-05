import React, { useState, useEffect } from 'react';
import Card from './Card';
import axios from 'axios';
import { BASE_URL } from '../utils/config';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../utils/UserSlice';
import Error from './Error';

const fallbackImg = 'https://i.pinimg.com/736x/85/72/da/8572da892e5c25d10ea7751dbc50c23b.jpg';

const EditProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [profileImg, setProfileImg] = useState('');
    const [bio, setBio] = useState('');
    const [skills, setSkills] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [toast, setToast] = useState(false);
    const [err, setErr] = useState([]);

    useEffect(() => {
        if (user) {
            setFirstName(user.firstName || '');
            setLastName(user.lastName || '');
            setProfileImg(user.profileImg || fallbackImg);
            setBio(user.bio || '');
            setSkills(user.skills?.join(', ') || '');
            setAge(user.age || '');
            setGender(user.gender || '');
        }
    }, [user]);

    async function saveProfileHandler() {
        try {
            const cleanedProfileImg = profileImg?.trim();

            const payload = {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                age: Number(age),
                gender: gender.toLowerCase(),
                bio: bio.trim(),
                skills: skills
                    .split(',')
                    .map((skill) => skill.trim())
                    .filter((s) => s !== ''),
            };

            // ✅ Only add image if it's valid (not blank)
            if (cleanedProfileImg && cleanedProfileImg !== '') {
                payload.profileImg = cleanedProfileImg;
            }

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
            console.log(error);

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
                        <span className="label-text">Profile Image</span>
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        className="bg-white border border-gray-300 p-1 mx-4"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                if (file.size > 10 * 1024 * 1024) {
                                    alert("Image is too large. Please upload under 10MB.");
                                    return;
                                }

                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    setProfileImg(reader.result);
                                };
                                reader.readAsDataURL(file);
                            }
                        }}
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
                    profileImg: profileImg || fallbackImg,
                    skills: skills.split(','),
                    bio,
                }}
            />
        </div>
    );
};

export default EditProfile;
