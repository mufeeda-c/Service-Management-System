

import { useState, useEffect } from 'react'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {cancel_request,assign_technician, logoutUser, get_service_admin, get_category_based_technician } from '../api/register'

const ViewRequest= () => {
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
    const handleLogout = async () => {
        const result = await logoutUser();
        console.log("logout result", result)
        if (result.success) {
            navigate('/login')
        }
    }

    const handleAssign = async () =>{
        if(technician?.length==0){
            alert("Technicians are not available")
            return
        }
        console.log("selected",selectedTechnician)
        console.log("service",service)
        const assigned=await assign_technician(id, selectedTechnician)
        if(assigned.success==true){
            navigate('/admin')
        }
        else{
            alert(assigned.data)
        }
        console.log("assigned",assigned)
    }

    const cancelRequest= async (id)=>{
        const cancel=await cancel_request(id)
        if (cancel.success==true){
            navigate(`/view_service_admin/${service.id}`)
        }
    }

    return (
        <div>
            <div className='flex md:flex-row flex-col     '>
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
                <div className='bg-gray-200 border border-gray-300 w-full pt-4 h-screen ps-8 pe-8 pb-8'>
                    <div className='flex justify-between items-center mb-8'>
                        <div>
                            <h2 className='text-2xl font-bold mb-4'>Request {service.id}</h2>
                            <p className='text-gray-900 '>{service.category} . {new Date(service.created_at).toLocaleString()}</p>
                        </div>
                        <button onClick={(e) => {
                            e.preventDefault()
                            navigate('/customer')
                        }} className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded' >
                            ← My requests
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
                                    {service.status === 'in Progress' && (
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
                                <div className='flex justify-between' >
                                    <div>
                                        <p className='text-gray-500 '>CUSTOMER</p>
                                        <p className='text-gray-900 '>{service.customer?.username}
                                            <br />{service.customer?.phone}<br />
                                            {service.customer?.email}
                                        </p>
                                    </div>
                                    <div>
                                        <p className='text-gray-500 mt-3 '>SERVICE TYPE</p>
                                        <span className='text-purple-900 text-center pl-3 mt-4   pr-3 rounded-xl bg-purple-200'>{service.category}</span>
                                    </div>
                                </div>
                                <p className='text-gray-500 mt-3'>DESCRIPTION</p>
                                <p className='text-gray-900 '>{service.description}</p>
                                <div className='flex justify-between' >
                                    <div>
                                        <p className='text-gray-500 mt-3'>ADDRESS</p>
                                        <p className='text-gray-900 '>{service.address}</p>
                                        <p className='text-gray-900'>Pin : {service.pincode}</p>
                                    </div>
                                    <div>
                                        <p className='text-gray-500 mt-3'>PREFERRED TIME</p>
                                        <p className='text-gray-900 '>{new Date(service.date).toLocaleString()}</p></div>
                                </div>
                            </div>
                            {(!service.technician) && (
                                <div className='bg-white p-4 rounded-md w-full gap-4 shadow-md mb-0 '>

                                    <h3 className='text-xl font-bold mb-6'>Status timeline </h3>
                                    <p className='text-lg font-semibold'><span className='text-yellow-500 text-center p-2 rounded-xl bg-yellow-200'>1</span>  Pending </p>
                                    <p className='text-gray-500 ps-8'>Service request created by customer.</p>
                                    <p className='text-gray-500 ps-8'>Date: created date and time</p>

                                    {/* <p className='text-lg font-semibold mt-5'><span className='text-blue-900 text-center p-2 rounded-xl bg-blue-200'>2</span>  Assigned </p>
                                    <p className='text-gray-500 ps-8'>Technician assigned by admin.</p>
                                    <p className='text-gray-500 ps-8'>Date: admin assigned date and time</p>

                                    <p className='text-lg font-semibold mt-5'><span className='text-purple-900 text-center p-2 rounded-xl bg-purple-200'>3</span>  In Progress </p>
                                    <p className='text-gray-500 ps-8'>Technician accepted the job.</p>
                                    <p className='text-gray-500 ps-8'>Date: technician accepted date and time</p>

                                    <p className='text-lg font-semibold mt-5'><span className='text-green-900 text-center p-2 rounded-xl bg-green-200'>4</span>  Job complete & payment processed </p>
                                    <p className='text-gray-500 ps-8'>Technician completed the job.</p>
                                    <p className='text-gray-500 ps-8'>Date: job completion date and time</p> */}
                                </div>
                            )}
                        </div>
                        <div className=''>
                            <div className='bg-white p-4 rounded-md w-full shadow-md mb-4'>
                                <h3 className='text-xl font-bold mb-4'>Admin actions </h3>
                                <button className='bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded w-full' onClick={handleAssign}   >Assign Technician</button>
                                <button className='bg-red-700 hover:bg-red-900 text-white font-bold mt-2 py-2 px-4 rounded w-full' onClick={() => cancelRequest(service.id)}   >Cancel Request</button>
                            </div>
                            <div className='bg-white p-4 rounded-md w-full shadow-md mb-0'>
                                <h3 className='text-xl font-bold mb-3'>Available Technicians </h3>
                                {technician?.map((item) => (<>
                                    <div key={item.id} className="flex items-center mt-3 gap-3">
                                        <input
                                            type="radio"
                                            name="technician"
                                            value={item.id}
                                            checked={selectedTechnician === item.id}
                                            onChange={(e) => {

                                                setSelectedTechnician(Number(e.target.value));
                                                
                                            }}
                                        />

                                        <p className="text-lg font-semibold">
                                            {item.username}
                                        </p>
                                    </div>
                                    <div className='flex justify-between mb-2 items-center'>
                                        <p className='text-gray-500 '>{item.skill}</p>
                                        <p className='text-gray-500 ps-8'>{item.phone}</p>
                                    </div>
                                    <hr className='text-gray-300' /></>))}
                                            {technician?.length==0 && (
                                                <h1>Technicians are not available</h1>
                                            )}
                            </div>


                        </div>

                    </div>
                </div>
            </div>

        </div >
    )
}

export default ViewRequest