import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../api/register'

const login = () => {
    const navigate = useNavigate()
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [userNameError, setUserNameError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [loginError, setLoginError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoginError('')
        setUserNameError('')
        setPasswordError('')

        //call API
        const result = await loginUser(userName, password)
        console.log("login result", result)

        if (result.success) {

            alert('User logged in successfully');

            // Clear fields
            setUserName('');
            setPassword('');

            // Navigate to login
            const role = result.data.user['role']
            navigate(`/${role}`)

            return;
        }
        // Backend errors
        const errors = result.data;

        if (errors?.username) {
            setUserNameError(errors.username[0]);
        }

        if (errors?.password) {
            setPasswordError(errors.password[0]);
        }
        if (errors?.error) {
            setLoginError(errors.error);
        }

    }

    return (
        <div className=' justify-items-center'>
            <h1 className="text-3xl font-bold mt-8 ">
                Login Here!
            </h1>

            <form
                onSubmit={handleSubmit}
                className="w-1/4 mx-auto m-12 border rounded-xl p-8"
            >

                {/* Username */}
                <div className="mb-5">

                    <label
                        htmlFor="username"
                        className="block mb-2.5 text-sm font-medium text-heading"
                    >
                        Your Username
                    </label>

                    <input
                        type="text"
                        id="username"
                        value={userName}
                        onChange={(e) => {
                            setUserName(e.target.value);
                            setUserNameError('');
                        }}
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-xl focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                        placeholder="John"
                    />

                    {userNameError && (
                        <p className="text-red-500 text-sm mt-1">
                            {userNameError}
                        </p>
                    )}

                </div>
                <div className="mb-5">
                    <label for="password" className="block mb-2.5 text-sm font-medium text-heading">Your password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setPasswordError('');
                        }} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-xl focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                        placeholder="••••••••" 
                    />
                    {passwordError && (
                        <p className="text-red-500 text-sm mt-1">
                            {passwordError}
                        </p>
                    )}
                </div>
                <div className='flex justify-between'>
                    <button
                        type="submit"
                        className="box-border border rounded-xl focus:ring-brand-medium shadow-xs font-medium leading-5 text-sm px-4 py-2.5 focus:outline-none"
                    >
                        Submit
                    </button>
                    <a href="" className='mt-3' onClick={() => navigate('/register/technician')}>Don't have an account?</a>
                </div>
                {loginError && (
                    <p className="text-red-500 text-sm mt-1">{loginError}</p>
                )}
            </form>

        </div>
    )
}

export default login

