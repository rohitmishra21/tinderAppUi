import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/config";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/UserSlice";

const SignUp = () => {
    const [firstName, setfirstName] = useState("devolper");
    const [lastName, setLastName] = useState("frontend");
    const [profileImg, setProfileImg] = useState("https://i.pinimg.com/736x/c0/f1/18/c0f118f50f63ff81b75074ca9640d3b7.jpg");
    const [email, setEmail] = useState("rohit12@gmail.com");
    const [password, setPassword] = useState("rohit@123");
    const [skills, setSkills] = useState("html, nodeJs");
    const [age, setAge] = useState("20");
    const [gender, setGender] = useState("male");
    const [bio, setBio] = useState("i am a devloper")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    async function signUpHendler() {

        try {
            const res = await axios.post(
                BASE_URL + "signUp",
                { firstName, lastName, profileImg, email, password, skills, age, gender, bio },
                { withCredentials: true }
            );
            console.log(res);


            navigate("/profile")
            dispatch(setUser(res.data))

        } catch (error) {
            console.log(error.response.data);


        }

    }
    return (
        <div className="flex justify-center gap-4 my-2">
            <div className=" bg-base-300 px-10 py-10 rounded-xl ">


                <label className="form-control  w-full  max-w-xs">
                    <div className="label mb-2">
                        <span className="label-text">First Name</span>
                    </div>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setfirstName(e.target.value)}
                        className="input input-bordered w-full max-w-xs"
                    />
                </label>
                <label className="form-control my-3 w-full flex flex-col gap-2 max-w-xs">
                    <div className="label ">
                        <span className="label-text">Last Name</span>
                    </div>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="input input-bordered w-full max-w-xs"
                    />
                </label>

                <div className="">
                    <label className="form-control w-full flex flex-col gap-2 max-w-xs">
                        <div className="label">
                            <span className="label-text">Email</span>
                        </div>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input input-bordered w-full max-w-xs"
                        />
                    </label>
                    <label className="form-control mt-2 w-full flex flex-col gap-2 max-w-xs">
                        <div className="label">
                            <span className="label-text">Password</span>
                        </div>
                        <input
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input input-bordered w-full max-w-xs"
                        />
                    </label>
                </div>


                <button className="btn btn-primary mt-6 w-full" onClick={signUpHendler}>
                    Sign Up
                </button>
                <div className="mt-4">
                    <Link to="/singIn" className="text-center">Existing User?<span className="text-blue-600">Login here</span></Link>
                </div>
            </div>

        </div>
    );
};

export default SignUp;
