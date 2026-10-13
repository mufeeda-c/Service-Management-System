
import { useState, useEffect } from 'react'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {cancel_request,assign_technician, logoutUser, get_service_admin, get_category_based_technician } from '../api/register'
import SideBarAdmin from '../components/SideBarAdmin'

const ViewServiceAdmin = () => {
    const navigate = useNavigate()
    const [service, setService] = useState({})
    const [technician, setTechnician] = useState([])
    const [selectedTechnician, setSelectedTechnician] = useState(null)
    const { id } = useParams()
    console.log("id", id)
    useEffect(() => {
        async function getData() {
            const result = await get_service_admin(id);
            console.log(result.data)
            setService(result.data)
            const technician = await get_category_based_technician(result.data.category)
            console.log(technician.data)
            setTechnician(technician.data)
            if (technician.data?.length > 0) {
                setSelectedTechnician(technician.data[0].id);
            }
        } getData()
    }, [])
    

    

    return (
        <div>
            <div className='flex md:flex-row flex-col  h-screen overflow-hidden   '>
                <SideBarAdmin/>
                <div className='bg-gray-200 border border-gray-300 w-full pt-4 overflow-y-auto  ps-8 pe-8 pb-8'>
                    <div className='flex justify-between items-center mb-8'>
                        <div>
                            <h2 className='text-2xl font-bold mb-4'>Request {service.id}</h2>

                        </div>
                        <button onClick={(e) => {
                            e.preventDefault()
                            navigate('/all-requests')
                        }} className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded' >
                            ← All Requests
                        </button>
                    </div>
                    <div className='flex xl:flex-row flex-col    gap-4 '>

                        <div className=' w-full flex flex-col gap-4'>
                            <div className='bg-white p-4 rounded-md w-full gap-4 shadow-md mb-0 '>
                                <div className='flex justify-between items-center '>
                                    <h3 className='text-xl font-bold mb-6'>Request Details </h3>
                                    
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
                                </div>
                                <p className='text-gray-500 '>SERVICE TYPE</p>
                                <span className='text-purple-900 text-center pl-3 mt-4   pr-3 rounded-xl bg-purple-200'>{service.category}</span>
                                <p className='text-gray-500 mt-3'>DESCRIPTION</p>
                                <p className='text-gray-900 '>{service.description}</p>
                                <p className='text-gray-500 mt-3'>ADDRESS</p>
                                <p className='text-gray-900 '>{service.address}</p>
                                <p className='text-gray-800 '>{service.pincode}</p>
                                <p className='text-gray-500 mt-3'>DATE</p>
                                <p className='text-gray-900 '>{service.date}</p>

                            </div>
                            {(service.customer) && (
                                <div className='bg-white p-4 rounded-md w-full gap-4 shadow-md mb-0 '>
                                    <h3 className='text-xl font-bold mb-6'>Customer </h3>
                                    <p className='text-lg font-semibold mt-5'><span className='text-purple-900 text-center p-2 rounded-xl bg-purple-200'>C</span>  {service.customer.username}</p>
                                    <div className='flex justify-between items-center'>
                                        <p className='text-gray-500 ps-8'>{service.category}</p>
                                        <p className='text-gray-500 ps-8'>{service.customer.phone}</p>
                                    </div>
                                </div>
                            )}
                            {(service.technician) && (
                                <div className='bg-white p-4 rounded-md w-full gap-4 shadow-md mb-0 '>
                                    <h3 className='text-xl font-bold mb-6'>Technician </h3>
                                    <p className='text-lg font-semibold mt-5'><span className='text-purple-900 text-center p-2 rounded-xl bg-purple-200'>T</span>  {service.technician.username}</p>
                                    <div className='flex justify-between items-center'>
                                        <p className='text-gray-500 ps-8'>{service.category}</p>
                                        <p className='text-gray-500 ps-8'>{service.technician.phone}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='bg-white p-4 rounded-md w-full shadow-md mb-0'>
                            <h3 className='text-xl font-bold mb-6'>Job timeline </h3>
                            <p className='text-lg font-semibold'><span className='text-yellow-500 text-center p-2 rounded-xl bg-yellow-200'>1</span>  Pending </p>
                            <p className='text-gray-500 ps-8'>Service request created by customer.</p>
                            <p className='text-gray-500 ps-8'>{service.created_at && new Date(service.created_at).toLocaleString('en-GB')}</p>

                            <p className='text-lg font-semibold mt-5'><span className='text-blue-900 text-center p-2 rounded-xl bg-blue-200'>2</span>  Assigned </p>
                            <p className='text-gray-500 ps-8'>Technician assigned by admin.</p>
                            <p className='text-gray-500 ps-8'> {service.assigned_date ? new Date(service.assigned_date).toLocaleString('en-GB') : 'Not assigned'}</p>

                            <p className='text-lg font-semibold mt-5'><span className='text-purple-900 text-center p-2 rounded-xl bg-purple-200'>3</span>  In Progress </p>
                            <p className='text-gray-500 ps-8'>Technician accepted the job.</p>
                            <p className='text-gray-500 ps-8'> {service.inprogress_date ? new Date(service.inprogress_date).toLocaleString('en-GB') : 'Not in progress'}</p>

                            <p className='text-lg font-semibold mt-5'><span className='text-green-900 text-center p-2 rounded-xl bg-green-200'>4</span>  Job complete & payment processed </p>
                            <p className='text-gray-500 ps-8'>Technician completed the job.</p>
                            <p className='text-gray-500 ps-8'> {service.completed_date ? new Date(service.completed_date).toLocaleString('en-GB') : 'Not completed'}</p>




                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default ViewServiceAdmin