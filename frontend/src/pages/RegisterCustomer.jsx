import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const register = () => {
    const navigate=useNavigate()
    const [userName,setUserName]=useState('')
    const handleSubmit=async(e)=>{
        e.preventDefault()

    }
    return (
        <div className=' justify-items-center'>
            <h1 className="text-3xl font-bold m-20 ">
                Register Here!
            </h1>

            <form className="w-1/4 mx-auto m-20 border rounded-xl p-8">
                <div className="mb-5">
                    <label for="Username" className="block mb-2.5 text-sm font-medium text-heading">Your Username</label>
                    <input type="text" id="Username" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-xl focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="John" required />
                </div>
                <div className="mb-5">
                    <label for="phone" className="block mb-2.5 text-sm font-medium text-heading">Your phone</label>
                    <input type="number" id="phone" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-xl focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="9988456783" required />
                </div>
                <div className="mb-5">
                    <label for="email" className="block mb-2.5 text-sm font-medium text-heading">Your email</label>
                    <input type="email" id="email" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-xl focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="name@gmail.com" required />
                </div>
                <div className="mb-5">
                    <label for="password" className="block mb-2.5 text-sm font-medium text-heading">Your password</label>
                    <input type="password" id="password" class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-xl focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="••••••••" required />
                </div>
                <div className='mb-5 justify-items-end'>
                    <a href="" onClick={()=>navigate('/register/technician')}>Register as Technician</a>
                </div>
                <button type="submit" onClick={handleRegisterCustomer} className="  box-border border rounded-xl  focus:ring-brand-medium shadow-xs font-medium leading-5  text-sm px-4 py-2.5 focus:outline-none">Submit</button>
            </form>

        </div>
    )
}

export default register