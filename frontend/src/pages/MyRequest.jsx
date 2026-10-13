import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { get_pending_services, get_services, delete_service, get_completed_services, get_assigned_services, get_inprogress_services } from '../api/register'
import SideBar from '../components/SideBar'
import { FaEye } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";



const MyRequest = () => {
    const [services, setServices] = useState([])
    const [allservices, setAllServices] = useState([])
    const [pendingService, setPendingService] = useState([])
    const [inProgressService, setInProgressService] = useState([])
    const [completedService, setCompletedService] = useState([])
    const [assignedService, setAssignedService] = useState([])

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const navigate = useNavigate()
    async function getData() {
            const services = await get_services();
            setServices(services.data)
            setAllServices(services.data)
            const pending = await get_pending_services()
            setPendingService(pending.data)
            const completed = await get_completed_services()
            setCompletedService(completed.data)
            const inprogress = await get_inprogress_services()
            setInProgressService(inprogress.data)
            const assigned = await get_assigned_services()
            setAssignedService(assigned.data)

        }
    useEffect(() => {
         getData()
    }, [])


    const handleAllServices = async () => {
        setServices(allservices)
    }
    const handleGetPendingServices = async () => {
        setServices(pendingService)
    }
    const handleAssignedServices = async () => {
        setServices(assignedService)
    }
    const handleGetInProgressServices = async () => {
        setServices(inProgressService)
    }
    const handleGetCompletedServices = async () => {
        setServices(completedService)
    }

    const handleDelete = (id) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    };
    const handleDeleteClick = async () => {
        const result = await delete_service(deleteId);
        console.log("delete result", result)
        if (result.success) {
            getData()
        }
        setShowDeleteModal(false);
        setDeleteId(null);
    }



    return (
        <>
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                        <h2 className="text-xl font-semibold mb-3">
                            Confirm Delete
                        </h2>

                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete this service?
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setDeleteId(null);
                                }}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleDeleteClick}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className='flex md:flex-row flex-col   h-screen overflow-hidden '>
                <SideBar />
                <div className='bg-gray-200 border border-gray-300 w-full  p-8 overflow-y-auto'>
                    <div className='flex justify-between items-center '>
                        <h2 className='text-2xl font-bold mb-4'>My Requests</h2>

                    </div>
                    <div>
                        <button onClick={(e) => {
                            e.preventDefault()
                            handleAllServices()
                        }} className='bg-white mt-2 me-2 rounded-xl pl-4 pr-4 p-0.5 hover:bg-blue-900 hover:text-white'>
                            All ({allservices.length})
                        </button>
                        <button onClick={
                            (e) => {
                                e.preventDefault()
                                handleGetPendingServices()
                            }
                        } className='bg-white m-2 rounded-xl pl-4 pr-4 p-0.5 hover:bg-blue-900 hover:text-white'>
                            Pending ({pendingService.length})
                        </button>
                        <button onClick={
                            (e) => {
                                e.preventDefault()
                                handleAssignedServices()
                            }
                        } className='bg-white m-2 rounded-xl pl-4 pr-4 p-0.5 hover:bg-blue-900 hover:text-white'>
                            assigned ({assignedService.length})
                        </button>
                        <button onClick={
                            (e) => {
                                e.preventDefault()
                                handleGetInProgressServices()
                            }
                        } className='bg-white m-2 rounded-xl pl-4 pr-4 p-0.5 hover:bg-blue-900 hover:text-white'>
                            In progress ({inProgressService.length})
                        </button>
                        <button onClick={
                            (e) => {
                                e.preventDefault()
                                handleGetCompletedServices()
                            }
                        } className='bg-white m-2 rounded-xl pl-4 pr-4 p-0.5 hover:bg-blue-900 hover:text-white'>
                            completed ({completedService.length})
                        </button>
                    </div>
                    <div className='bg-white p-4 rounded-md w-full shadow-md mt-8'>
                        <h3 className='text-lg font-semibold mb-4'>Past Requests</h3>
                        {services?.length == 0 && <h2>No data found</h2>}
                        {services?.length > 0 &&
                            <table className='w-full border border-gray-300 rounded-md text-left'>
                                <thead>
                                    <tr className='bg-gray-100'>
                                        <th className='border border-gray-300 p-2'>ID</th>
                                        <th className='border border-gray-300 p-2'>CATEGORY</th>
                                        <th className='hidden lg:table-cell border border-gray-300 p-2'>DESCRIPTION</th>
                                        <th className='border border-gray-300 p-2'>STATUS</th>
                                        <th className='border hidden lg:table-cell border-gray-300 p-2'>TECHNICIAN</th>
                                        <th className='border border-gray-300 p-2'>DATE</th>
                                        <th className='border border-gray-300 p-2'>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {services?.map((service, index) => (

                                        <tr key={index}>
                                            <td className='border border-gray-300 p-2'>{index+1}</td>
                                            <td className='border border-gray-300 p-2'>{service.category}</td>
                                            <td className='hidden lg:table-cell border border-gray-300 p-2'>{service.description}</td>
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
                                            <td className='border hidden lg:table-cell border-gray-300 p-2'>{service.technician === null ? 'Not Assigned' : service.technician.username}</td>
                                            <td className='border border-gray-300 p-2'>{new Date(service.date).toLocaleDateString()}</td>
                                            <td className='border border-gray-300 p-2'>
                                                <button onClick={(e) => {
                                                    e.preventDefault()
                                                    navigate(`/view-service/${service.id}`)
                                                }} className='m-1 hover:bg-blue-900 hover:text-white text-blue-900 font-bold py-1 px-2 rounded'>
                                                    <FaEye />
                                                </button>
                                                {service.status == "pending" && (
                                                    <>
                                                        <button onClick={(e) => {
                                                            e.preventDefault()
                                                            navigate(`/edit-service/${service.id}`)
                                                        }} className='m-1 hover:bg-yellow-900 hover:text-white text-yellow-900 font-bold py-1 px-2 rounded'>
                                                            <MdEdit />
                                                        </button>
                                                        <button onClick={(e) => {
                                                            e.preventDefault()
                                                            handleDelete(service.id)
                                                        }} className=' m-1 hover:bg-red-900 hover:text-white text-red-900 font-bold py-1 px-2 rounded'>
                                                            <MdDeleteForever />
                                                        </button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        }
                    </div>
                </div>

            </div>

        </>
    )
}

export default MyRequest