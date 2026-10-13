import React, { useState } from 'react'
import SideBarAdmin from '../components/SideBarAdmin'
import { useEffect } from 'react'
import { user, update_profile } from '../api/register'

const AdminProfile = () => {

    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [pincode, setPincode] = useState('')
    const [profilePhoto, setProfilePhoto] = useState(null)
    const [preview, setPreview] = useState(null)
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [username, setUsername] = useState('')

    async function fetchProfileData() {
            try {
                const result = await user()
                const data = result.data
                setAddress(data.address)
                setCity(data.city)
                setPincode(data.pincode)
                setEmail(data.email)
                setPhone(data.phone)
                setUsername(data.username)
                if (data.photo) {
                    setPreview(data.photo)

                }
                console.log('Fetched profile data:', data)
            } catch (error) {
                console.error('Error fetching profile data:', error)
            }
        }
        
    useEffect(() => {
        
        fetchProfileData()
    }, [])

    const handlePhotoChange = (e) => {
        const file = e.target.files[0]

        if (file) {
            setProfilePhoto(file)
            setPreview(URL.createObjectURL(file))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!address || !city || !pincode) {
            alert('Please fill all required fields')
            return
        }

        if (pincode.length !== 6) {
            alert('Please enter a valid 6-digit pincode')
            return
        }

        console.log('Address:', address)
        console.log('City:', city)
        console.log('Pincode:', pincode)
        console.log('Profile Photo:', profilePhoto)

        // API call will come here
        const result = await update_profile(address, city, pincode, profilePhoto)
        console.log('Profile updated successfully:', result.data)
    }

    const handleCancel = () => {
        fetchProfileData()
    }

    return (
        <div className="flex md:flex-row flex-col h-screen overflow-hidden">

            {/* Sidebar */}
            <SideBarAdmin />

            {/* Main Content */}
            <div className="bg-gray-100 w-full h-screen p-4 md:p-8 overflow-y-auto">

                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    My Profile
                </h2>

                <div className="flex lg:flex-row flex-col gap-6">

                    {/* ================= PROFILE CARD ================= */}
                    <div className="bg-white p-6 rounded-xl w-full lg:w-1/2 shadow-md">

                        <div className="flex flex-col items-center">

                            {/* Profile Image */}
                            <div className="mb-4">

                                {preview ? (

                                    <img
                                        src={preview}
                                        alt="Profile"
                                        className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow"
                                    />

                                ) : (

                                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-100">
                                        <span className="text-gray-500 text-5xl">
                                            👤
                                        </span>
                                    </div>

                                )}

                            </div>

                            {/* Name */}
                            <h2 className="text-2xl font-bold text-gray-800">
                                {username || 'Admin Name'}
                            </h2>

                            {/* Email */}
                            <p className="text-sm text-gray-500 mt-2">
                                {email}
                            </p>

                            {/* Phone */}
                            <p className="text-sm text-gray-500 mt-1">
                                {phone || 'Not added yet'}
                            </p>

                        </div>

                        <hr className="border-gray-200 my-6" />

                        {/* Role */}
                        <div className="flex flex-col items-center">

                            <span className="rounded-full bg-green-100 px-5 py-2 font-semibold text-green-800">
                                ADMIN
                            </span>

                        </div>

                        {/* Profile Information */}
                        <div className="mt-6 space-y-4">

                            <div>
                                <p className="text-sm text-gray-500">
                                    Address
                                </p>

                                <p className="font-medium text-gray-800">
                                    {address || 'Not added yet'}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    City
                                </p>

                                <p className="font-medium text-gray-800">
                                    {city || 'Not added yet'}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Pincode
                                </p>

                                <p className="font-medium text-gray-800">
                                    {pincode || 'Not added yet'}
                                </p>
                            </div>

                        </div>

                    </div>


                    {/* ================= PROFILE FORM ================= */}
                    <div className="bg-white p-6 rounded-xl w-full lg:w-1/2 shadow-md">

                        <p className='text-xl font-bold mb-5'>
                            {!city || !address || !pincode ? 'Complete Your Profile' : 'Update Your Profile'}

                        </p>

                        <form onSubmit={handleSubmit}>

                            {/* Address */}
                            <div className="mb-5">

                                <label
                                    htmlFor="address"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Full Address
                                </label>

                                <textarea
                                    id="address"
                                    rows="4"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-900 focus:border-blue-900 block w-full p-3"
                                    placeholder="House No, Street, Area"
                                    required
                                />

                            </div>


                            {/* City */}
                            <div className="mb-5">

                                <label
                                    htmlFor="city"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    City
                                </label>

                                <input
                                    type="text"
                                    id="city"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-900 focus:border-blue-900 block w-full p-3"
                                    placeholder="Enter your city"
                                    required
                                />

                            </div>


                            {/* Pincode */}
                            <div className="mb-5">

                                <label
                                    htmlFor="pincode"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Pincode
                                </label>

                                <input
                                    type="text"
                                    id="pincode"
                                    value={pincode}
                                    onChange={(e) => {
                                        const value = e.target.value

                                        if (/^\d*$/.test(value)) {
                                            setPincode(value)
                                        }
                                    }}
                                    maxLength="6"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-900 focus:border-blue-900 block w-full p-3"
                                    placeholder="Enter 6-digit pincode"
                                    required
                                />

                            </div>


                            {/* Profile Photo */}
                            <div className="mb-6">

                                <label
                                    htmlFor="profilePhoto"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Profile Photo
                                    <span className="text-gray-500 font-normal">
                                        {' '}(optional)
                                    </span>
                                </label>

                                <input
                                    type="file"
                                    id="profilePhoto"
                                    accept="image/png, image/jpeg, image/jpg, image/webp"
                                    onChange={handlePhotoChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5"
                                />

                                <p className="text-gray-500 text-xs mt-2">
                                    Upload JPG, PNG or WebP image.
                                </p>

                            </div>


                            {/* Buttons */}
                            <div className="flex items-center">

                                <button
                                    type="submit"
                                    className="bg-blue-950 hover:bg-blue-800 text-white font-semibold py-2.5 px-6 rounded-lg transition"
                                >
                                    Save Profile
                                </button>

                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="ml-3 border border-gray-400 hover:bg-gray-500 hover:text-white text-gray-700 font-semibold py-2.5 px-6 rounded-lg transition"
                                >
                                    Cancel
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default AdminProfile
