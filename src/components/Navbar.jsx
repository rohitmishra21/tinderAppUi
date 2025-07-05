import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/config'
import { removeUser } from '../utils/UserSlice'

const Navbar = () => {
    const user = useSelector((state) => state.user.user)


    const dispatch = useDispatch()


    const navigate = useNavigate()
    async function logOutHendler() {
        const res = await axios.post(BASE_URL + "signOut", {}, { withCredentials: true })
        navigate("/singIn")
        dispatch(removeUser())
    }
    return (
        <div className="navbar bg-base-300 px-10">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">Tinder</Link>
            </div>

            <div className="flex-none gap-2">

                <div className="dropdown dropdown-end">
                    {user && <div className='flex items-center gap-5'>
                        <h1 className='font-bold capitalize '>Welcome {user?.firstName}</h1>
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">

                            <div className="w-10 rounded-full">
                                <img
                                    alt="profileImg"
                                    src={user?.profileImg}
                                    className='object-cover object-center '
                                />
                            </div>
                        </div>

                    </div>}
                    {!user &&
                        <div>
                            <button className="btn btn-active btn-primary mr-3">
                                < Link to="/singUp">SignUp</Link>
                            </button>
                            <button className="btn btn-active btn-primary">
                                < Link to="/singIn">SignIn</Link>
                            </button>
                        </div>
                    }
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                            <Link to="/profile" className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/connections" className="justify-between">
                                Connections
                                <span className="badge">New</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/request" className="justify-between">
                                Requests
                                <span className="badge">New</span>
                            </Link>
                        </li>

                        <li><Link onClick={logOutHendler}>Logout</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar
