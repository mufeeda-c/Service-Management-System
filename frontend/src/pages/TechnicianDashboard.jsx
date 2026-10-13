import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
//  import RequestTable from '../components/RequestTable';
import { accept_job, Technician, reject_service, technician_assigned_job, set_offline, set_online } from '../api/register'
import SideBarTechnician from '../components/SideBarTechnician'
const TechnicianDashboard = () => {
  const [services, setServices] = useState([])
  const [user, setUser] = useState([])
  const [username, setUsername] = useState("")

  const [snackbar, setSnackbar] = useState({
    show: false,
    message: '',
    type: ''
  })

  const [assignedJob, setAssignedJob] = useState([])
  const navigate = useNavigate()
  async function getData() {
    const result = await Technician()
    console.log(result.data)
    setUser(result.data)
    const assignedJob = await technician_assigned_job(result?.data.id)
    console.log("assigned job", assignedJob.data)
    setAssignedJob(assignedJob.data)
  }

  useEffect(() => {
    setUser([])
    setServices([])
    setAssignedJob([])

    getData()
    const name = sessionStorage.getItem("user");
    setUsername(name)

  }, [])

  async function handleActivate(id) {
    const result = await set_online(id)
    getData()
  }
  async function handleDeactivate(id) {
    const result = await set_offline(id)
    getData()
  }


  const handleAcceptJob = async (id) => {
    console.log("accept id", id)
    const result = await accept_job(id)
    console.log("result:", result)
    console.log("success:", result.success)

    if (result.success) {

      setSnackbar({
        show: true,
        message: 'Job Accepted',
        type: 'success'
      })
      setTimeout(() => {
        navigate('/my-job')
      }, 1500)
      console.log("navigated")
    }
  }


  const handleRejectJob = async (id) => {
    console.log("Rejecting job:", id)

    const result = await reject_service(id)

    console.log("Reject result:", result)

    if (result.success) {

      setSnackbar({
        show: true,
        type: "error",
        message: result.data.message || "Job rejected successfully"
      })

      // Remove rejected job from frontend immediately
      setAssignedJob(prevJobs =>
        prevJobs.filter(job => job.id !== id)
      )

      // Hide snackbar after 2 seconds
      setTimeout(() => {
        setSnackbar({
          show: false,
          message: '',
          type: ''
        })
      }, 2000)

    } else {

      setSnackbar({
        show: true,
        type: "error",
        message: result.data?.error || "Failed to reject service"
      })

      setTimeout(() => {
        setSnackbar({
          show: false,
          message: '',
          type: ''
        })
      }, 2000)
    }
  }

  return (
    <>
      <div className='flex md:flex-row flex-col h-screen overflow-hidden'>
        <SideBarTechnician />
        <div className='bg-gray-200 border border-gray-300 w-full h-screen  p-8 overflow-y-auto'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-2xl font-bold mb-4'>Welcome Back {username} !</h2>

            <button className={` ${user.online_status ? "text-green-900 bg-green-200 hover:bg-green-300" : "text-red-900 bg-red-200 hover:bg-red-300 "} text-center pl-3 pr-3 rounded-xl cursor-pointer`}
              onClick={() =>
                user.online_status
                  ? handleDeactivate(user.id) : handleActivate(user.id)
              }
            >{user.online_status ? "Online" : "Offline"}</button>
          </div>
          <div className='flex sm:flex-row flex-col space-y-4  justify-between gap-4 items-center'>
            <div className='bg-white p-4 rounded-md w-full shadow-md mb-0'>
              <h3 className='text-sm text-gray-500 font-semibold mb-2'>SKILL</h3>
              <p className='text-2xl text-blue-900 font-bold'>{user.skill}</p>
            </div>
            <div className='bg-white p-4 rounded-md w-full shadow-md mb-0'>
              <h3 className='text-sm text-gray-500 font-semibold mb-2'>RATING </h3>
              <p className='text-2xl text-yellow-500 font-bold'>10</p>
            </div>
            <div className='bg-white p-4 rounded-md w-full shadow-md mb-0'>
              <h3 className='text-sm text-gray-500 font-semibold mb-2'>ACTIVE </h3>
              <p className='text-2xl text-blue-500 font-bold'>10</p>
            </div>
            <div className='bg-white p-4 rounded-md w-full shadow-md mb-0'>
              <h3 className='text-sm text-gray-500 font-semibold mb-2'>COMPLETED </h3>
              <p className='text-2xl text-green-700 font-bold'>10</p>
            </div>
          </div>
          <h3 className='text-lg font-semibold mt-4'>Active Jobs - NEED YOUR ACTION</h3>
          <div className='mt-4 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4'>
            {assignedJob?.map((job, index) => (
              <>
                <div key={job.id} className='bg-white p-4 rounded-md w-full shadow-md mb-0'>
                  <div className='flex justify-between w-full' >
                    <p className='text-xl text-blue-900 font-bold'>{job.category}  <span className='text-sm text-gray-400'>  #{job.technician.username}</span></p>
                    <div>
                      {job.status === 'pending' && (
                        <span className='text-blue-900 text-center pl-3 pr-3 rounded-xl bg-blue-200'>{job.status}</span>
                      )}
                      {job.status === 'in Progress' && (
                        <span className='text-yellow-900 text-center pl-3 pr-3 rounded-xl bg-yellow-200'>{job.status}</span>
                      )}
                      {job.status === 'completed' && (
                        <span className='text-green-900 text-center pl-3 pr-3 rounded-xl bg-green-200'>{job.status}</span>
                      )}
                      {job.status === "assigned" && (
                        <span className='text-purple-900 text-center pl-3 pr-3 rounded-xl bg-purple-200'>{job.status}</span>
                      )}
                      {job.status === 'cancelled' && (
                        <span className='text-red-900 text-center pl-3 pr-3 rounded-xl bg-red-200'>{job.status}</span>
                      )}
                    </div>
                  </div>
                  <p className='text-sm text-gray-700  mt-2 mb-1'>{job.description}</p>
                  <div>
                    <div className='flex justify-between'>
                      <div className='text-sm text-gray-700  mb-2'>{job.customer.username}  </div>
                      <div className='text-sm text-gray-700  mb-2'> {job.customer.phone} </div>
                    </div>
                    <p className='text-sm text-gray-700  mb-2'>{job.address}  </p>
                    <p className='text-sm text-gray-700  mb-2'>{new Date(job.date).toLocaleDateString()} , {new Date(job.date).toLocaleTimeString()} </p>
                  </div>
                  <div>
                    <button onClick={(e) => {
                      e.preventDefault()
                      handleAcceptJob(job.id)
                    }} className='bg-blue-900 hover:bg-blue-700 text-white font-bold p-2 pt-1 pb-1 rounded' >
                      Accept
                    </button>
                    <button onClick={(e) => {
                      e.preventDefault()
                      handleRejectJob(job.id)
                    }} className='bg-red-700 hover:bg-red-500 text-white ms-2 font-bold p-2 pt-1 pb-1 rounded' >
                      Reject
                    </button>
                  </div>
                </div>
              </>
            ))}


          </div>

          <div className='bg-white p-4 rounded-md w-full shadow-md mt-8'>
            <h3 className='text-lg font-semibold mb-4'>Recent Completed jobs</h3>
            {services?.length == 0 && (
              <h2>No data found</h2>
            )}
            {/* <RequestTable /> */}
            {services?.length > 0 && (
              <table className='w-full border border-gray-300 rounded-md text-left'>
                <thead>
                  <tr className='bg-gray-100'>
                    <th className='border border-gray-300 p-2'>ID</th>
                    <th className='border border-gray-300 p-2'>CUSTOMER</th>
                    <th className='hidden lg:table-cell border border-gray-300 p-2'>CATEGORY</th>
                    <th className='border border-gray-300 p-2'>DATE</th>
                    <th className='border hidden lg:table-cell border-gray-300 p-2'>TECHNICIAN</th>
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
                        {service.status === 'cancelled' && (
                          <span className='text-red-900 text-center pl-3 pr-3 rounded-xl bg-red-200'>{service.status}</span>
                        )}
                      </td>
                      <td className='border hidden lg:table-cell border-gray-300 p-2'>{service.technician === null ? 'Not Assigned' : service.technician}</td>
                      <td className='border border-gray-300 p-2'>{new Date(service.date).toLocaleDateString()}</td>
                      <td className='border border-gray-300 p-2'>
                        <button onClick={(e) => {
                          e.preventDefault()
                          navigate(`/view-service/${service.id}`)
                        }} className='bg-blue-300 m-1 hover:bg-blue-900 hover:text-white text-blue-900 font-bold py-1 px-2 rounded'>
                          View
                        </button>
                        <button onClick={(e) => {
                          e.preventDefault()
                          navigate(`/edit-service/${service.id}`)
                        }} className='bg-yellow-300 m-1 hover:bg-yellow-900 hover:text-white text-yellow-900 font-bold py-1 px-2 rounded'>
                          Edit
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
      {snackbar.show && (
        <div
          className={`fixed bottom-5 right-5 text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-2 ${snackbar.type === "success"
            ? "bg-green-600"
            : "bg-red-600"
            }`}
        >
          <span>
            {snackbar.type === "success" ? "✓" : "✕"}
          </span>

          <span>{snackbar.message}</span>
        </div>
      )}
    </>
  )
}

export default TechnicianDashboard