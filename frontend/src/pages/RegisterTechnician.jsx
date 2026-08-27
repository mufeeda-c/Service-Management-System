import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerTechnician } from '../api/register'

const RegisterTechnician = () => {
    const navigate = useNavigate()
    const [userName, setUserName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userNameError, setUserNameError] = useState(false)
    const [phoneError, setPhoneError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [userExist, setUserExist] = useState(false)

    const handleSubmit = async (e) => {
        setUserExist(false)
        setUserNameError(false)
        setPhoneError(false)
        setEmailError(false)
        setPasswordError(false)
        e.preventDefault()
        if (userName.trim() == "" || phone.trim() == "" || email.trim() == "" || password.trim() == "") {
            if (userName.trim() == "") {
                setUserNameError(true)
            }
            if (phone.trim() == 0) {
                setPhoneError(true)
            }
            if (email.trim() == "") {
                setEmailError(true)
            }
            if (password.trim() == "") {
                setPasswordError(true)
            }
            return
        } else {
            const result = await registerTechnician(userName, phone, email, password)
            console.log(result.data.message);
            if(result.data.message=="user already exist"){
                setUserExist(true)
                return
            }else{
                navigate('/')
            }
            setUserName('')
            setPhone('')
            setEmail('')
            setPassword('')
        }
    }
    return (
        <div className=' justify-items-center'>
            <h1 className="text-3xl font-bold mt-8 ">
                Register Here!
            </h1>

            <form className="w-1/4 mx-auto m-12 border rounded-xl p-8">
                <div className="mb-5">
                    <label for="Username" className="block mb-2.5 text-sm font-medium text-heading">Your Username</label>
                    <input onChange={(e) => setUserName(e.target.value)} type="text" id="Username" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-xl focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="John" required />
                    {userNameError && (
                        <p className="text-red-500 text-sm mt-1">Username required</p>
                    )}
                </div>
                <div className="mb-5">
                    <label for="phone" className="block mb-2.5 text-sm font-medium text-heading">Your phone</label>
                    <input type="number" id="phone" onChange={(e) => setPhone(e.target.value)} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-xl focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="9988456783" required />
                    {phoneError && (
                        <p className="text-red-500 text-sm mt-1">Phone Number required</p>
                    )}
                </div>
                <div className="mb-5">
                    <label for="email" className="block mb-2.5 text-sm font-medium text-heading">Your email</label>
                    <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-xl focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="name@gmail.com" required />
                    {emailError && (
                        <p className="text-red-500 text-sm mt-1">Email required</p>
                    )}
                </div>
                <div className="mb-5">
                    <label for="password" className="block mb-2.5 text-sm font-medium text-heading">Your password</label>
                    <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-xl focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="••••••••" required />
                    {passwordError && (
                        <p className="text-red-500 text-sm mt-1">Password required</p>
                    )}
                </div>
                <div className='mb-5 justify-items-end'>
                    <a href="" onClick={() => navigate('/')}>Register as Customer</a>
                </div>
                <button type="submit" onClick={handleSubmit} className="  box-border border rounded-xl  focus:ring-brand-medium shadow-xs font-medium leading-5  text-sm px-4 py-2.5 focus:outline-none">Submit</button>
                {userExist && (
                    <p className="text-red-500 text-sm mt-1">User Already Exist</p>
                )}
            </form>

        </div>
    )
}

export default RegisterTechnician
