import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {getAvailableCustomer, getAllPendingServices ,getAllInProgressServices,getAllCompletedServices, getAvailableTech, getTech} from '../api/register'
import SideBarAdmin from '../components/SideBarAdmin'
const AdminDashboard = () => {
  const [pendingServices, setPendingServices] = useState([])
  const [inProcessServices,setInProcessServices]=useState([])
  const [completed,setCompleted]=useState([])
  const [availableTech,setavailableTech]=useState([])
  const [availableCustomer,setAvailableCustomer]=useState([])
  const [username,setUsername]=useState("")
  const [tech,setTech]=useState([])

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
      const tech=await getTech()
      setTech(tech.data)
      const availableCustomer=await getAvailableCustomer()
      setAvailableCustomer(availableCustomer.data)
      const name = sessionStorage.getItem("user");
      setUsername(name)
    }
    getData()
  }, [])

  return (
    <>
      <div className='flex md:flex-row flex-col   h-screen overflow-hidden'>
        <SideBarAdmin/>
        <div className='bg-gray-200 border border-gray-300 w-full  p-8 overflow-y-auto'>
          <div className='flex justify-between items-center mb-8'>
            <h2 className='text-2xl font-bold mb-4'>Welcome Back {username} !</h2>
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
              <p className='text-2xl text-blue-900 font-bold'>{tech.length}</p>
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
                          navigate(`/AssignTechnician/${service.id}`)
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