import { useState, useEffect } from 'react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { book_service, logoutUser, fetchSkills } from '../api/register'
import SideBar from '../components/SideBar'

const BookService = () => {
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [address, setAddress] = useState('')
    const [pincode, setPincode] = useState('')
    const [date, setDate] = useState('')

    const [descriptionError, setDescriptionError] = useState('')
    const [categoryError, setCategoryError] = useState('')
    const [addressError, setAddressError] = useState('')
    const [pincodeError, setPincodeError] = useState('')
    const [dateError, setDateError] = useState('')

    const [skills, setSkills] = useState([])


    const navigate = useNavigate()

    useEffect(() => {
        async function getSkill() {
            const skills = await fetchSkills()
            setSkills(skills.data)
        }
        getSkill()
    }, [])

   
    const handleSubmit = async (e) => {
        e.preventDefault()
        const result = await book_service(description, address, date, category, pincode)
        console.log("book service result", result)
        if (result.success) {
            alert('Service booked successfully');
            setDescription('')
            setCategory('')
            setAddress('')
            setPincode('')
            setDate('')
            navigate('/customer')
            return
        }
        const errors = result.data;
        if (errors?.description) {
            setDescriptionError(errors.description[0])
        }
        if (errors?.category) {
            setCategoryError(errors.category[0])
        }
        if (errors?.address) {
            setAddressError(errors.address[0])
        }
        if (errors?.pincode) {
            setPincodeError(errors.pincode[0])
        }
        if (errors?.date) {
            setDateError(errors.date[0])
        }
    }
    return (
        <div>
            <div className='flex md:flex-row flex-col  h-screen overflow-hidden   '>
                <SideBar />
                <div className='bg-gray-200 border border-gray-300 w-full pt-4  ps-8 pe-8 pb-8 overflow-y-auto'>
                    <div className='flex justify-between items-center mb-8'>
                        <h2 className='text-2xl font-bold mb-4'>Book a Service</h2>
                        <button onClick={(e) => {
                            e.preventDefault()
                            navigate('/my-requests')
                        }} className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded' >
                            ← My requests
                        </button>
                    </div>
                    <div className='flex xl:flex-row flex-col    gap-4 '>
                        <div className='bg-white p-4 rounded-md w-full shadow-md mb-0'>
                            <form onSubmit={handleSubmit} className='m-4'>
                                <div className='mb-4'>
                                    <label htmlFor='service' className='block mb-2 text-md font-medium text-gray-900'>What service do you need?</label>
                                    <select id='service' onChange={(e) => {
                                        e.preventDefault()
                                        setCategoryError('')
                                        setCategory(e.target.value)
                                    }} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-900 focus:border-blue-900 block w-full p-2.5'>
                                        <option value="" disabled className='text-gray-400'>---Select your skill---</option>
                                        {skills.map((item) => (
                                            <option
                                                key={item.value}
                                                value={item.value}
                                            >
                                                {item.label}
                                            </option>
                                        ))}
                                    </select>
                                    {categoryError && <p className='text-red-500 text-sm'>{categoryError}</p>}
                                    <p className='text-gray-500 text-sm mt-1'>We match you with the right expert for your needs.</p>
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor='description' className='block mb-2 text-lmd font-medium text-gray-900'>Describe your issue</label>
                                    <textarea onChange={(e) => {
                                        e.preventDefault()
                                        setDescriptionError('')
                                        setDescription(e.target.value)
                                    }} id='description' rows='4' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-900 focus:border-blue-900 block w-full p-2.5' placeholder='Tell us more about the service you need...'></textarea>
                                    {descriptionError && <p className='text-red-500 text-sm'>{descriptionError}</p>}
                                    <p className='text-gray-500 text-sm mt-1'>The more details you provide, the better we can assist you.</p>
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor='address' className='block mb-2 text-md font-medium text-gray-900'>Service address</label>
                                    <input type='text' id='address' onChange={(e) => {
                                        e.preventDefault()
                                        setAddressError('')
                                        setAddress(e.target.value)
                                    }} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-900 focus:border-blue-900 block w-full p-2.5' placeholder='Enter your address...' />
                                    {addressError && <p className='text-red-500 text-sm'>{addressError}</p>}
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="pincode" className="block mb-2 text-md font-medium text-gray-900">Pincode</label>
                                    <input type="text" id="pincode" onChange={(e) => {
                                        e.preventDefault()
                                        setPincodeError('')
                                        setPincode(e.target.value)
                                    }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-900 focus:border-blue-900 block w-full p-2.5" placeholder="Enter your area pincode..." />
                                    {pincodeError && <p className='text-red-500 text-sm'>{pincodeError}</p>}
                                </div>

                                <div className='mb-4'>
                                    <label htmlFor='time' className='block mb-2 text-md font-medium text-gray-900'>Preferred time slot</label>
                                    <input type='datetime-local' id='time' onChange={(e) => {
                                        e.preventDefault()
                                        setDate(e.target.value)
                                    }} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-900 focus:border-blue-900 block w-full p-2.5' />
                                    {dateError && <p className='text-red-500 text-sm'>{dateError}</p>}
                                    <p className='text-gray-500 text-sm mt-1'>Choose a time that works best for you.</p>
                                </div>
                                <button type='submit' className='bg-blue-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                                    Submit Request
                                </button>
                                <button className='hover:bg-gray-500 hover:text-white py-1.5 px-4 rounded ml-3 border border-gray-400' >Cancel</button>
                            </form>
                        </div>
                        <div className=' w-full flex flex-col gap-4'>
                            <div className='bg-white p-4 rounded-md w-full gap-4 shadow-md mb-0'>
                                <h3 className='text-xl font-bold mb-6'>What happens after you book a service? </h3>
                                <p className='text-lg font-semibold'><span className='text-purple-900 text-center p-2 rounded-xl bg-purple-200'>1</span>  Request submitted </p>
                                <p className='text-gray-500 ps-8'>Your request is in our queue as pending.</p>
                                <p className='text-lg font-semibold mt-5'><span className='text-purple-900 text-center p-2 rounded-xl bg-purple-200'>2</span>  Technician assigned </p>
                                <p className='text-gray-500 ps-8'>Admin matches a verified expert to your job.</p>
                                <p className='text-lg font-semibold mt-5'><span className='text-purple-900 text-center p-2 rounded-xl bg-purple-200'>3</span>  Expert on the way </p>
                                <p className='text-gray-500 ps-8'>Technician accepts and heads to your address.</p>
                                <p className='text-lg font-semibold mt-5'><span className='text-purple-900 text-center p-2 rounded-xl bg-purple-200'>4</span> Job complete & payment processed </p>
                                <p className='text-gray-500 ps-8'>Pay securely once the job is complete.</p>

                            </div>
                            <div className='bg-white p-4 rounded-md w-full gap-4 shadow-md mb-0 '>
                                <h3 className='text-xl font-bold mb-6'>Tips for a faster service </h3>
                                <ul type="disc" className='list-disc ps-5'>
                                    <li className='text-gray-500 mt-5'> Be specific - mention brand, age, and model of the device.</li>
                                    <li className='text-gray-500 mt-2'> Add photos if possible (Phase 2+).</li>
                                    <li className='text-gray-500 mt-2'> Choose a time slot with some buffer time.</li>
                                    <li className='text-gray-500 mt-2'> Make sure someone is home during the scheduled time.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default BookService