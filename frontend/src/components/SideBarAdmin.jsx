
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../api/register'

const SideBarAdmin = () => {

    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)

    const handleLogout = async () => {
        const result = await logoutUser()
        console.log("logout result", result)

        if (result.success) {
            navigate('/login')
        }
    }

    const handleNavigate = (path) => {
        navigate(path)
        setMenuOpen(false)
    }

    const menuItems = [
        { name: 'Dashboard', path: '/admin' },
        { name: 'All Requests', path: '/all-requests' },
        { name: 'All Users', path: '/all-users' },
        { name: 'All Technicians', path: '/technicians' },
        { name: 'Create Admin', path: '/create-admin' },
        { name: 'Profile', path: '/admin-profile' },
    ]

    return (
        <div className="bg-blue-950 text-white w-full md:w-64 md:min-h-screen p-4 md:p-5">

            {/* Header */}
            <div className="flex items-center justify-between">

                <h1 className="text-2xl font-bold">
                    ServiceApp
                </h1>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-2xl px-2 py-1 rounded-md
                               hover:bg-blue-900 transition duration-200"
                    aria-label="Toggle menu"
                >
                    <span
                        className={`inline-block transition-transform duration-300 ${
                            menuOpen ? 'rotate-90' : ''
                        }`}
                    >
                        {menuOpen ? '✕' : '☰'}
                    </span>
                </button>

            </div>

            {/* Navigation */}
            <div
                className={`
                    overflow-hidden
                    transition-all
                    duration-300
                    ease-in-out
                    md:max-h-none
                    md:opacity-100
                    md:mt-5
                    ${menuOpen
                        ? 'max-h-[500px] opacity-100 mt-4'
                        : 'max-h-0 opacity-0 mt-0'
                    }
                `}
            >

                <ul className="flex flex-col space-y-2">

                    {menuItems.map((item) => (
                        <li
                            key={item.path}
                            onClick={() => handleNavigate(item.path)}
                            className="
                                px-5 py-2
                                rounded-md
                                cursor-pointer
                                hover:bg-gray-300
                                hover:text-gray-900
                                transition-colors
                                duration-200
                            "
                        >
                            {item.name}
                        </li>
                    ))}

                    {/* Logout */}
                    <li
                        onClick={handleLogout}
                        className="
                            px-5 py-2
                            rounded-md
                            cursor-pointer
                            hover:bg-gray-300
                            hover:text-gray-900
                            transition-colors
                            duration-200
                        "
                    >
                        Logout
                    </li>

                </ul>

            </div>

        </div>
    )
}

export default SideBarAdmin
