import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const user = useSelector((state) => state.appSlice)
    return (
        <div className="navbar bg-base-300 px-10">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Tinder</a>
            </div>
            <div className="flex-none gap-2">

                <div className="dropdown dropdown-end">
                    {user.profileImg && <div className='flex items-center gap-5'>
                        <h1 className='font-bold capitalize '>Welcome {user.firstName}</h1>
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
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><Link to="/singIn">SignIn</Link></li>
                        <li><Link>Logout</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar
