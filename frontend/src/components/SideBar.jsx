import React from 'react'
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../api/register';

const SideBar = () => {

    const navigate=useNavigate()

    const handleLogout = async () => {
            const result = await logoutUser();
            console.log("logout result", result)
            if (result.success) {
                navigate('/login')
            }
        }
    return (

        <div className='bg-blue-950 p-5 pt-7 text-white'>
            <ul className='space-y-2 flex md:flex-col flex-row md:space-y-0 md:justify-items-end md:space-x-0 space-x-2'>
                <h1 className='md:pl-5 md:pr-5 text-2xl font-bold mb-4'>ServiceApp</h1>
                <li onClick={
                    (e) => {
                        e.preventDefault()
                        navigate('/customer')
                    }
                } className='md:pl-5 md:pr-5 hover:bg-gray-300 hover:text-gray-900 rounded-md p-2 cursor-pointer'>Dashboard</li>
                <li onClick={(e) => {
                    e.preventDefault()
                    navigate('/book-service')
                }} className='md:pl-5 md:pr-5 hover:bg-gray-300 hover:text-gray-900 rounded-md p-2 cursor-pointer'>+ Book a service</li>
                <li onClick={(e) => {
                    e.preventDefault()
                    navigate('/my-requests')
                }} className='md:pl-5 md:pr-5 hover:bg-gray-300 hover:text-gray-900 rounded-md p-2 cursor-pointer'>My requests</li>
                <li onClick={(e) => {
                    e.preventDefault()
                    handleLogout()
                }}
                    className='md:pl-5 md:pr-5 hover:bg-gray-300 hover:text-gray-900 rounded-md p-2 cursor-pointer'>Logout</li>
            </ul>
        </div>

    )
}

export default SideBar