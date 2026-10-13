import React, { useEffect, useState } from 'react'
import SideBarTechnician from '../components/SideBarTechnician'
import { Technician, update_profile_technician } from '../api/register'
const TechnicianProfile= () => {

    const [about, setAbout] = useState('')
    const [experience, setExperience] = useState('')
    const [pincode, setPincode] = useState('')
    const [profilePhoto, setProfilePhoto] = useState(null)
    const [preview, setPreview] = useState(null)
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [username, setUsername] = useState('')
    const [skill,setSkill]=useState('')

    useEffect(() => { 
        async function fetchProfileData() {
            try {
                const result = await Technician()
                const data = result.data
                setAbout(data.about)
                setExperience(data.experience)
                setPincode(data.pincode)
                setEmail(data.email)
                setPhone(data.phone)
                setUsername(data.username)
                setSkill(data.skill)
                if (data.photo) {
                    setPreview(data.photo)
                }
                console.log('Fetched profile data:', data)
            } catch (error) {
                console.error('Error fetching profile data:', error)
            }
        }
        fetchProfileData()
    },[])

    const handlePhotoChange = (e) => {
        const file = e.target.files[0]

        if (file) {
            setProfilePhoto(file)
            setPreview(URL.createObjectURL(file))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log('About:', about)
        console.log('Experience:', experience)
        console.log('Pincode:', pincode)
        console.log('Profile Photo:', profilePhoto)

        // API call will come here
        const result= await update_profile_technician(about,experience,pincode,profilePhoto)
        console.log('Profile updated successfully:', result.data)

    }

    const handleCancel = () => {
        setAbout('')
        setExperience('')
        setPincode('')
        setProfilePhoto(null)
        setPreview(null)
    }

    return (
        <div>
            <div className='flex md:flex-row flex-col h-screen overflow-hidden'>

                <SideBarTechnician/>

                <div className='bg-gray-200 border border-gray-300 w-full h-screen p-8 overflow-y-auto'>

                    <h2 className='text-2xl font-bold mb-4'>
                        My Profile
                    </h2>

                    <div className='flex lg:flex-row flex-col gap-4'>

                        {/* Profile Details */}
                        <div className='bg-white p-6 rounded-md w-full shadow-md'>

                            <div className='flex flex-col items-center'>

                                {/* Profile Image */}
                                <div className='mb-4'>

                                    {preview ? (
                                        <img
                                            src={preview}
                                            alt='Profile'
                                            className='w-28 h-28 rounded-full object-cover border-4 border-gray-200'
                                        />
                                    ) : (
                                        <div className='w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center'>
                                            <span className='text-gray-500 text-4xl'>
                                                👤
                                            </span>
                                        </div>
                                    )}

                                </div>

                                <p className='text-2xl font-bold'>
                                    {username}
                                </p>

                                <h3 className='text-sm text-gray-500 font-semibold mt-2'>
                                    {email}
                                </h3>

                                <h3 className='text-sm text-gray-500 font-semibold mb-2'>
                                    {phone}
                                </h3>

                            </div>

                            <hr className='border-gray-200 my-4' />

                            <div className='flex flex-col items-center m-4'>

                                <div className='rounded-xl bg-green-300 px-4 py-1 font-semibold text-green-900 text-lg'>
                                    {skill}
                                </div>

                                <div className='flex w-full max-w-md'>

                                    <div className='bg-gray-100 p-4 rounded-md w-full shadow-md mt-4 mx-2'>
                                        <p className='text-2xl text-yellow-500 font-bold text-center'>
                                            0.7
                                        </p>

                                        <h3 className='text-md text-gray-500 font-semibold text-center'>
                                            ★ Rating
                                        </h3>
                                    </div>

                                    <div className='bg-gray-100 p-4 rounded-md w-full shadow-md mt-4 mx-2'>
                                        <p className='text-2xl text-green-700 font-bold text-center'>
                                            6
                                        </p>

                                        <h3 className='text-md text-gray-500 font-semibold text-center'>
                                            Jobs Done
                                        </h3>
                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* Complete Profile Form */}
                        <div className='bg-white p-6 rounded-md w-full shadow-md'>

                            <p className='text-xl font-bold mb-5'>
                                {!about || !experience || !pincode ? 'Complete Your Profile' : 'Update Your Profile'}
                                
                            </p>

                            <form onSubmit={handleSubmit}>

                                {/* About */}
                                <div className='mb-4'>

                                    <label
                                        htmlFor='about'
                                        className='block mb-2 text-md font-medium text-gray-900'
                                    >
                                        About You
                                    </label>

                                    <textarea
                                        id='about'
                                        rows='4'
                                        value={about}
                                        onChange={(e) => setAbout(e.target.value)}
                                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-900 focus:border-blue-900 block w-full p-2.5'
                                        placeholder='E.g. 8 years experience in residential electrical work, specializing in wiring and panel upgrades.'
                                    />

                                    <p className='text-gray-500 text-sm mt-1'>
                                        Customers see this before booking — be specific.
                                    </p>

                                </div>


                                {/* Experience */}
                                <div className='mb-4'>

                                    <label
                                        htmlFor='experience'
                                        className='block mb-2 text-md font-medium text-gray-900'
                                    >
                                        Years of Experience
                                    </label>

                                    <input
                                        type='number'
                                        id='experience'
                                        min='0'
                                        value={experience}
                                        onChange={(e) => setExperience(e.target.value)}
                                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-900 focus:border-blue-900 block w-full p-2.5'
                                        placeholder='Enter years of experience'
                                    />

                                </div>


                                {/* Pincode */}
                                <div className='mb-4'>

                                    <label
                                        htmlFor='pincode'
                                        className='block mb-2 text-md font-medium text-gray-900'
                                    >
                                        Service Area Pincode
                                    </label>

                                    <input
                                        type='text'
                                        id='pincode'
                                        value={pincode}
                                        onChange={(e) => setPincode(e.target.value)}
                                        maxLength='6'
                                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-900 focus:border-blue-900 block w-full p-2.5'
                                        placeholder='Enter your service area pincode'
                                    />

                                </div>


                                {/* Profile Photo */}
                                <div className='mb-5'>

                                    <label
                                        htmlFor='profilePhoto'
                                        className='block mb-2 text-md font-medium text-gray-900'
                                    >
                                        Profile Photo
                                        <span className='text-gray-500'>
                                            {' '}(optional)
                                        </span>
                                    </label>

                                    <input
                                        type='file'
                                        id='profilePhoto'
                                        accept='image/png, image/jpeg, image/jpg, image/webp'
                                        onChange={handlePhotoChange}
                                        className='bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5'
                                    />

                                    <p className='text-gray-500 text-sm mt-1'>
                                        Upload a profile photo (JPG, PNG or WebP).
                                    </p>

                                </div>


                                {/* Buttons */}
                                <div className='flex items-center'>

                                    <button
                                        type='submit'
                                        className='bg-blue-950 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded'
                                    >

                                        Save Profile
                                    </button>

                                    <button
                                        type='button'
                                        onClick={handleCancel}
                                        className='hover:bg-gray-500 hover:text-white py-2 px-5 rounded ml-3 border border-gray-400'
                                    >
                                        Cancel
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default TechnicianProfile
