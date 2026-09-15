import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
//  import RequestTable from '../components/RequestTable';
import {getAvailableCustomer, getAllPendingServices, logoutUser ,getAllInProgressServices,getAllCompletedServices, getAvailableTech} from '../api/register'
const AdminDashboard = () => {
  const [pendingServices, setPendingServices] = useState([])
  const [inProcessServices,setInProcessServices]=useState([])
  const [completed,setCompleted]=useState([])
  const [availableTech,setavailableTech]=useState([])
  const [availableCustomer,setAvailableCustomer]=useState([])

  const navigate = useNavigate()

  useEffect(() => {
    async function getData() {
      const result = await getAllPendingServices()
      console.log(result)
      setPendingServices(result.data)
      const inprocess=await getAllInProgressServices()
      setInProcessServices(inprocess.data)
      const completed=await getAllCompletedServices()
      setCompleted(completed.data)
      const availableTech=await getAvailableTech()
      setavailableTech(availableTech.data)
      const availableCustomer=await getAvailableCustomer()
      setAvailableCustomer(availableCustomer.data)
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
              navigate('/all-requests')
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
            <h2 className='text-2xl font-bold mb-4'>Admin Dashboard</h2>
          </div>
          <div className='flex lg:flex-row flex-col space-y-4  justify-between gap-4 items-center'>

            <div className='bg-white p-4 rounded-md w-full shadow-md mb-0'>
              <h3 className='text-sm text-gray-500 font-semibold mb-2'>PENDING </h3>
              <p className='text-2xl text-yellow-500 font-bold'>{ pendingServices.length }</p>
            </div>
            <div className='bg-white p-4 rounded-md w-full shadow-md mb-0'>
              <h3 className='text-sm text-gray-500 font-semibold mb-2'>IN PROGRESS </h3>
              <p className='text-2xl text-blue-500 font-bold'>{inProcessServices.length}</p>
            </div>
            <div className='bg-white p-4 rounded-md w-full shadow-md mb-0'>
              <h3 className='text-sm text-gray-500 font-semibold mb-2'>COMPLETED </h3>
              <p className='text-2xl text-green-700 font-bold'>{completed.length}</p>
            </div>
            <div className='bg-white p-4 rounded-md w-full shadow-md mb-0'>
              <h3 className='text-sm text-gray-500 font-semibold mb-2'>AVAILABLE TECHS</h3>
              <p className='text-2xl text-blue-900 font-bold'>{availableTech.length}</p>
            </div>
            <div className='bg-white p-4 rounded-md w-full shadow-md mb-0'>
              <h3 className='text-sm text-gray-500 font-semibold mb-2'>CUSTOMERS</h3>
              <p className='text-2xl text-blue-900 font-bold'>{availableCustomer.length}</p>
            </div>
            <div className='bg-white p-4 rounded-md w-full shadow-md mb-0'>
              <h3 className='text-sm text-gray-500 font-semibold mb-2'>TECHNICIANS</h3>
              <p className='text-2xl text-blue-900 font-bold'>{availableTech.length}</p>
            </div>
          </div>

          <div className='bg-white p-4 rounded-md w-full shadow-md mt-8'>
            <h3 className='text-lg font-semibold mb-4'>Pending requests - need assignment</h3>
            {pendingServices?.length == 0 && (
              <p>No data Found</p>
            )}

            {pendingServices?.length > 0 && (
              <table className='w-full border border-gray-300 rounded-md text-left'>
                <thead>
                  <tr className='bg-gray-100'>
                    <th className='border border-gray-300 p-2'>ID</th>
                    <th className='border border-gray-300 p-2'>CUSTOMER</th>
                    <th className='border border-gray-300 p-2'>CATEGORY</th>
                    <th className='hidden lg:table-cell border border-gray-300 p-2'>DESCRIPTION</th>
                    <th className='border border-gray-300 p-2'>DATE</th>
                    <th className='border border-gray-300 p-2'>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingServices?.map((service, index) => (

                    <tr key={index}>
                      <td className='border border-gray-300 p-2'>{service.id}</td>
                      <td className='border border-gray-300 p-2'>{service.customer.username}</td>
                      <td className='border border-gray-300 p-2'>{service.category}</td>
                      <td className='hidden lg:table-cell border border-gray-300 p-2'>{service.description}</td>
                      <td className='border border-gray-300 p-2'>{new Date(service.date).toLocaleDateString()}</td>
                      <td className='border border-gray-300 p-2'>
                        <button onClick={(e) => {
                          e.preventDefault()
                          navigate(`/view-service-admin/${service.id}`)
                        }} className='bg-blue-300 m-1 hover:bg-blue-900 hover:text-white text-blue-900 font-bold py-1 px-2 rounded'>
                          Assign
                        </button>
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

export default AdminDashboard