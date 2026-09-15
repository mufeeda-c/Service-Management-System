
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
//  import RequestTable from '../components/RequestTable';
import { getAllServices,cancel_request } from '../api/register'
const AllRequests = () => {
    const [services, setServices] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        async function getData() {
            const result = await getAllServices()
            console.log(result)
            setServices(result.data)
        }
        getData()
    }, [])


    const handleLogout = async () => {
        const result = await logoutUser();
        console.log("logout result", result)
        if (result.success) {
            navigate('/login')
        }
    }


    return (
        <>
            <div className='flex md:flex-row flex-col   h-screen '>
                <div className='bg-blue-950 p-5 pt-7 text-white'>
                    <ul className='space-y-2 flex md:flex-col flex-row md:space-y-0 md:justify-items-end md:space-x-0 space-x-2'>
                        <h1 className='md:pl-5 md:pr-5 text-2xl font-bold mb-4'>ServiceApp</h1>
                        <li onClick={
                            (e) => {
                                e.preventDefault()
                                navigate('/admin')
                            }
                        } className='md:pl-5 md:pr-5 hover:bg-gray-300 hover:text-gray-900 rounded-md p-2 cursor-pointer'>Dashboard</li>
                        <li onClick={(e) => {
                            e.preventDefault()
                            navigate('')
                        }} className='md:pl-5 md:pr-5 hover:bg-gray-300 hover:text-gray-900 rounded-md p-2 cursor-pointer'>All requests</li>
                        <li onClick={(e) => {
                            e.preventDefault()
                            navigate('')
                        }} className='md:pl-5 md:pr-5 hover:bg-gray-300 hover:text-gray-900 rounded-md p-2 cursor-pointer'>All users</li>
                        <li onClick={(e) => {
                            e.preventDefault()
                            navigate('')
                        }} className='md:pl-5 md:pr-5 hover:bg-gray-300 hover:text-gray-900 rounded-md p-2 cursor-pointer'>All Technicians</li>
                        <li onClick={(e) => {
                            e.preventDefault()
                            navigate('')
                        }} className='md:pl-5 md:pr-5 hover:bg-gray-300 hover:text-gray-900 rounded-md p-2 cursor-pointer'>Create admin</li>

                        <li onClick={(e) => {
                            e.preventDefault()
                            handleLogout()
                        }}
                            className='md:pl-5 md:pr-5 hover:bg-gray-300 hover:text-gray-900 rounded-md p-2 cursor-pointer'>Logout</li>
                    </ul>
                </div>
                <div className='bg-gray-200 border border-gray-300 w-full  p-8'>
                    <div className='flex justify-between items-center mb-8'>
                        <h2 className='text-2xl font-bold '>All Requests</h2>
                    </div>

                    <div className=' '>
                        {services?.length == 0 && (
                            <h2>No data found</h2>
                        )}
                        {services?.length > 0 && (
                            <table className='w-full border border-gray-300 rounded-md text-left'>
                                <thead>
                                    <tr className='bg-gray-100'>
                                        <th className='border border-gray-300 p-2'>ID</th>
                                        <th className='border border-gray-300 p-2'>CUSTOMER</th>
                                        <th className='border border-gray-300 p-2'>CATEGORY</th>
                                        <th className='hidden lg:table-cell border border-gray-300 p-2'>DESCRIPTION</th>
                                        <th className='hidden lg:table-cell border border-gray-300 p-2'>ADDRESS</th>
                                        <th className='border border-gray-300 p-2'>STATUS</th>
                                        <th className='border hidden lg:table-cell border-gray-300 p-2'>TECHNICIAN</th>
                                        <th className='border border-gray-300 p-2'>PREFERRED TIME</th>
                                        <th className='border border-gray-300 p-2'>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {services?.map((service, index) => (

                                        <tr key={index}>
                                            <td className='border border-gray-300 p-2'>{service.id}</td>
                                            <td className='border border-gray-300 p-2'>
                                                <div className=''>
                                                    <p>{service.customer.username}</p>
                                                    <p>{service.customer.phone}</p>
                                                </div>
                                            </td>
                                            <td className='border border-gray-300 p-2'>{service.category}</td>
                                            <td className='hidden lg:table-cell border border-gray-300 p-2'>{service.description}</td>
                                            <td className='hidden lg:table-cell border border-gray-300 p-2'>
                                                <div className=''>
                                                    <p>{service.address}</p>
                                                    <p>{service.pincode}</p>
                                                </div>
                                            </td>
                                            <td className='border border-gray-300 p-2'>
                                                {service.status === 'pending' && (
                                                    <span className='text-blue-900 text-center pl-3 pr-3 rounded-xl bg-blue-200'>{service.status}</span>
                                                )}
                                                {service.status === 'in progress' && (
                                                    <span className='text-yellow-900 text-center pl-3 pr-3 rounded-xl bg-yellow-200'>{service.status}</span>
                                                )}
                                                {service.status === 'completed' && (
                                                    <span className='text-green-900 text-center pl-3 pr-3 rounded-xl bg-green-200'>{service.status}</span>
                                                )}
                                                {service.status === "assigned" && (
                                                    <span className='text-purple-900 text-center pl-3 pr-3 rounded-xl bg-purple-200'>{service.status}</span>
                                                )}
                                                {service.status === 'cancelled' && (
                                                    <span className='text-red-900 text-center pl-3 pr-3 rounded-xl bg-red-200'>{service.status}</span>
                                                )}
                                            </td>
                                            <td className='border hidden lg:table-cell border-gray-300 p-2'>{service.technician === null ? 'Not Assigned' : service.technician}</td>
                                            <td className='border border-gray-300 p-2'>
                                                <div className=''>
                                                    <p>{new Date(service.date).toLocaleDateString()}</p>
                                                    <p>{new Date(service.date).toLocaleTimeString()}</p>
                                                </div>
                                            </td>
                                            <td className='border border-gray-300 p-2'>
                                                <button onClick={(e) => {
                                                    e.preventDefault()
                                                }} className='bg-yellow-400 m-1 hover:bg-yellow-800 hover:text-white text-yellow-900 font-bold py-1 px-2 rounded'>
                                                    View
                                                </button>
                                                {service.status == "pending" && (
                                                    <div>
                                                        <button onClick={(e) => {
                                                            e.preventDefault()
                                                            navigate(`/view-service-admin/${service.id}`)
                                                        }} className='bg-blue-300 m-1 hover:bg-blue-900 hover:text-white text-blue-900 font-bold py-1 px-2 rounded'>
                                                            Assign
                                                        </button>
                                                        <button onClick={(e) => {
                                                            e.preventDefault()
                                                            cancel_request(service.id)
                                                        }} className='bg-red-300 m-1 hover:bg-red-900 hover:text-white text-red-900 font-bold py-1 px-2 rounded'>
                                                            Cancel
                                                        </button></div>)}
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

            </div>
        </>
    )
}

export default AllRequests