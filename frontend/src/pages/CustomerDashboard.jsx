import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { hello, delete_service , get_services ,logoutUser,get_pending_services,get_completed_services,get_inprogress_services,get_assigned_services} from '../api/register';
// import RequestTable from '../components/RequestTable';
const CustomerDashboard = () => {
        const [services, setServices] = useState([])
        const [allservices, setAllServices] = useState([])
        const [pendingService, setPendingService] = useState([])
        const [inProgressService, setInProgressService] = useState([])
        const [completedService, setCompletedService] = useState([])
        const [assignedService, setAssignedService] = useState([])
    
        const navigate = useNavigate()
    
        useEffect(() => {
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
    
            } getData()
        }, [])
    

    const handleLogout = async () => {
        const result = await logoutUser();
        console.log("logout result", result) 
        if(result.success){
            navigate('/login')
        }
    }

    const handleDelete = async (id)=>{
        const result = await delete_service(id);
        console.log("delete result", result)
        if(result.success){
            alert('Service deleted successfully')
            const updatedServices = services.filter(service => service.id !== id);
            setServices(updatedServices);
        }else{
            alert('Failed to delete service')
        }
    }

    return (
        <>
            <div className='flex md:flex-row flex-col   h-screen '>
                <div className='bg-blue-950 p-5 pt-7 text-white'>
                    <ul className='space-y-2 flex md:flex-col flex-row md:space-y-0 md:justify-items-end md:space-x-0 space-x-2'>
                        <h1 className='md:pl-5 md:pr-5 text-2xl font-bold mb-4'>ServiceApp</h1>
                        <li onClick={
                            (e)=>{
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
                <div className='bg-gray-200 border border-gray-300 w-full  p-8'>
                    <div className='flex justify-between items-center mb-8'>
                        <h2 className='text-2xl font-bold mb-4'>Customer Dashboard</h2>
                        <button onClick={(e) => {
                            e.preventDefault()
                            navigate('/book-service')
                        }} className='bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' >
                            + Book a Service
                        </button>
                    </div>
                    <div className='flex sm:flex-row flex-col space-y-4  justify-between gap-4 items-center'>
                        <div className='bg-white p-4 rounded-md w-full shadow-md mb-0'>
                            <h3 className='text-sm text-gray-500 font-semibold mb-2'>TOTAL REQUESTS</h3>
                            <p className='text-2xl text-blue-900 font-bold'>{services.length}</p>
                        </div>
                        <div className='bg-white p-4 rounded-md w-full shadow-md mb-0'>
                            <h3 className='text-sm text-gray-500 font-semibold mb-2'>PENDING </h3>
                            <p className='text-2xl text-yellow-500 font-bold'>{pendingService.length}</p>
                        </div>
                        <div className='bg-white p-4 rounded-md w-full shadow-md mb-0'>
                            <h3 className='text-sm text-gray-500 font-semibold mb-2'>IN PROGRESS </h3>
                            <p className='text-2xl text-blue-500 font-bold'>{inProgressService.length}</p>
                        </div>
                        <div className='bg-white p-4 rounded-md w-full shadow-md mb-0'>
                            <h3 className='text-sm text-gray-500 font-semibold mb-2'>COMPLETED </h3>
                            <p className='text-2xl text-green-700 font-bold'>{completedService.length}</p>
                        </div>
                    </div>
                    <div className='bg-white p-4 rounded-md w-full shadow-md mt-8'>
                        <h3 className='text-lg font-semibold mb-4'>Recent Requests</h3>
                        {/* <RequestTable /> */}
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
                                        <td className='border border-gray-300 p-2'>{service.id}</td>
                                        <td className='border border-gray-300 p-2'>{service.category}</td>
                                        <td className='hidden lg:table-cell border border-gray-300 p-2'>{service.description}</td>
                                        <td className='border border-gray-300 p-2'>
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
                                            {service.status === 'Cancelled' && (
                                                <span className='text-red-900 text-center pl-3 pr-3 rounded-xl bg-red-200'>{service.status}</span>
                                            )}
                                        </td>
                                        <td className='border hidden lg:table-cell border-gray-300 p-2'>{service.technician === null ? 'Not Assigned' : service.technician}</td>
                                        <td className='border border-gray-300 p-2'>{new Date(service.date).toLocaleDateString()}</td>
                                        <td className='border border-gray-300 p-2'>
                                            <button onClick={(e)=>{
                                                e.preventDefault()
                                                navigate(`/view-service/${service.id}`)
                                            }} className='bg-blue-300 m-1 hover:bg-blue-900 hover:text-white text-blue-900 font-bold py-1 px-2 rounded'>
                                                View
                                            </button>
                                            <button onClick={(e)=>{
                                                e.preventDefault()
                                                navigate(`/edit-service/${service.id}`)
                                            }} className='bg-yellow-300 m-1 hover:bg-yellow-900 hover:text-white text-yellow-900 font-bold py-1 px-2 rounded'>
                                                Edit
                                            </button>
                                            <button onClick={(e)=>{
                                                e.preventDefault()
                                                handleDelete(service.id)
                                            }} className='bg-red-300 m-1 hover:bg-red-900 hover:text-white text-red-900 font-bold py-1 px-2 rounded'>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>

                    </div>
                </div>

            </div>
        </>
    )
}

export default CustomerDashboard