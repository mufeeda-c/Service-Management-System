import { useEffect, useState } from 'react'
import React from 'react'
import SideBarAdmin from '../components/SideBarAdmin'
import { getAllUsers, get_all_admins, get_all_technician, get_all_customer, activate_user, deactivate_user } from '../api/register'
import { useNavigate } from 'react-router-dom'

const AllUsers = () => {
    const [allUser, setAllUser] = useState([])
    const [users, setUsers] = useState([])
    const [admins, setAdmins] = useState([])
    const [technician, setTechnician] = useState([])
    const [customer, setCustomer] = useState([])

    const navigate=useNavigate()

    async function getData() {
        const result = await getAllUsers()
        console.log("result", result.data)
        if (result?.success) {
            setUsers(result.data)
            setAllUser(result.data)
        }
        const admins = await get_all_admins()
        console.log("admin", admins.data)
        if (admins?.success) {
            setAdmins(admins.data)
        }
        const technician = await get_all_technician()
        console.log("tech", technician.data)
        if (admins?.success) {
            setTechnician(technician.data)
        }
        const customer = await get_all_customer()
        console.log("cust", customer.data)
        if (customer?.success) {
            setCustomer(customer.data)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    async function handleActivate(id) {
        const result = await activate_user(id)
        getData()        
    }
    async function handleDeactivate(id) {
        const result = await deactivate_user(id)
        getData()
    }

    return (
        <div>
            <div className='flex md:flex-row flex-col   h-screen overflow-hidden'>
                <SideBarAdmin />
                <div className='bg-gray-200 border border-gray-300 w-full  p-8 overflow-y-auto'>
                    <div className='flex justify-between items-center '>
                        <h2 className='text-2xl font-bold mb-4'>All Users</h2>
                        <button onClick={(e) => {
                            e.preventDefault()
                            navigate('/create-admin')
                        }} className='bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' >
                            + Create admin
                        </button>
                    </div>
                    <div>
                        <button onClick={(e) => {
                            e.preventDefault()
                            setUsers(allUser)
                        }} className='bg-white mt-2 me-2 rounded-xl pl-4 pr-4 p-0.5 hover:bg-blue-900 hover:text-white'>
                            All ({users.length})
                        </button>
                        <button onClick={
                            (e) => {
                                e.preventDefault()
                                setUsers(admins)
                            }
                        } className='bg-white m-2 rounded-xl pl-4 pr-4 p-0.5 hover:bg-blue-900 hover:text-white'>
                            Admins ({admins.length})
                        </button>
                        <button onClick={
                            (e) => {
                                e.preventDefault()
                                setUsers(technician)
                            }
                        } className='bg-white m-2 rounded-xl pl-4 pr-4 p-0.5 hover:bg-blue-900 hover:text-white'>
                            Technicians ({technician.length})
                        </button>
                        <button onClick={
                            (e) => {
                                e.preventDefault()
                                setUsers(customer)
                            }
                        } className='bg-white m-2 rounded-xl pl-4 pr-4 p-0.5 hover:bg-blue-900 hover:text-white'>
                            Customers ({customer.length})
                        </button>

                    </div>
                    <div className='bg-white p-4 rounded-md w-full shadow-md mt-8'>
                        <h3 className='text-lg font-semibold mb-4'>Users</h3>
                        {users.length > 0 && (
                            <table className='w-full border border-gray-300 rounded-md text-left'>
                                <thead>
                                    <tr className='bg-gray-100'>
                                        <th className='border border-gray-300 p-2'>USER</th>
                                        <th className='border border-gray-300 p-2'>ROLE</th>
                                        <th className='hidden lg:table-cell border border-gray-300 p-2'>PHONE</th>
                                        <th className='border hidden lg:table-cell border-gray-300 p-2'>JOINED</th>
                                        <th className='border border-gray-300 p-2'>STATUS</th>
                                        <th className='border border-gray-300 p-2'>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((item, key) => (
                                        <tr>
                                            <td className='border border-gray-300 p-2'>{item.username}</td>
                                            <td className='border border-gray-300 p-2'>{item.role}</td>
                                            <td className='hidden lg:table-cell border border-gray-300 p-2'>{item.phone}</td>
                                            <td className='hidden lg:table-cell border border-gray-300 p-2'>{new Date(item.date_joined).toDateString()}</td>
                                            <td className="border border-gray-300 p-2">
                                                <span
                                                    className={`px-2 py-1 rounded text-sm ${item.is_active
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                        }`}
                                                >
                                                    {item.is_active ? "Active" : "Inactive"}
                                                </span>
                                            </td>

                                            <td className="border border-gray-300 p-2">
                                                {(item.role === "customer" || item.role === "technician") ? (
                                                    <button
                                                        onClick={() =>
                                                            item.is_active
                                                                ? handleDeactivate(item.id)
                                                                : handleActivate(item.id)
                                                        }
                                                        className={`text-white px-3 py-1 rounded ${item.is_active
                                                            ? "bg-red-500 hover:bg-red-600"
                                                            : "bg-green-500 hover:bg-green-600"
                                                            }`}
                                                    >
                                                        {item.is_active ? "Deactivate" : "Activate"}
                                                    </button>
                                                ) : ("System Admin")}
                                            </td>
                                        </tr>
                                    )

                                    )}

                                </tbody>
                            </table>)}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AllUsers