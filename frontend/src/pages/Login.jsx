import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../api/register'

const Login = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [userEmailError, setUserEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [loginError, setLoginError] = useState('')

    const [snackbar, setSnackbar] = useState({
        show: false,
        message: '',
        type: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoginError('')
        setUserEmailError('')
        setPasswordError('')

        const result = await loginUser(email, password)
        if (result.success) {
            sessionStorage.setItem("user", result.data.user.username);

            // Show snackbar
            setSnackbar({
                show: true,
                message: 'User logged in successfully!',
                type: 'success'
            })

            // Clear fields
            setEmail('')
            setPassword('')

            // Get role
            const role = result.data.user.role

            // Navigate after 1.5 seconds
            setTimeout(() => {
                navigate(`/${role}`)
            }, 1500)

            return
        }

        // Backend errors
        const errors = result.data

        if (errors?.email) {
            setUserEmailError(errors.email[0])
        }

        if (errors?.password) {
            setPasswordError(errors.password[0])
        }

        if (errors?.error) {
            setLoginError(errors.error)
        }
    }

    return (
        <div className='bg-blue-950 h-screen m-0 p-0'>
            <div className="justify-items-center ">

                <h1 className="text-3xl text-white font-bold pt-8">
                    Login Here!
                </h1>
                    <div className="w-full p-8 lg:w-1/3 md:w-1/2 sm:w-2/3 mx-auto mt-8 bg-gray-200 rounded-xl shadow-md">
                        <form
                            onSubmit={handleSubmit}
                            className="mx-auto m-6   rounded-xl p-8"
                        >

                        {/* Username */}
                        <div className="mb-5">

                            <label
                                htmlFor="email"
                                className="block mb-2.5 text-sm font-medium text-heading"
                            >
                                Your Email
                            </label>

                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    setUserEmailError('')
                                }}
                                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-xl focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                                placeholder="John"
                            />

                            {userEmailError && (
                                <p className="text-red-500 text-sm mt-1">
                                    {userEmailError}
                                </p>
                            )}

                        </div>

                        {/* Password */}
                        <div className="mb-5">

                            <label
                                htmlFor="password"
                                className="block mb-2.5 text-sm font-medium text-heading"
                            >
                                Your password
                            </label>

                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                    setPasswordError('')
                                }}
                                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-xl focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                                placeholder="••••••••"
                            />

                            {passwordError && (
                                <p className="text-red-500 text-sm mt-1">
                                    {passwordError}
                                </p>
                            )}

                        </div>

                        {/* Buttons */}
                        <div className="flex justify-between">

                            <button
                                type="submit"
                                className="box-border border rounded-xl bg-blue-950 text-white shadow-xs font-medium text-sm px-4 py-2.5"
                            >
                                Submit
                            </button>

                            <button
                                type="button"
                                className="mt-3 text-blue-950"
                                onClick={() => navigate('/register/technician')}
                            >
                                Don't have an account?
                            </button>

                        </div>

                        {/* Login Error */}
                        {loginError && (
                            <p className="text-red-500 text-sm mt-1">
                                {loginError}
                            </p>
                        )}

                    </form>
                </div>
            </div>

            {/* Snackbar */}
            {snackbar.show && (
                <div className="fixed bottom-5 right-5 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-2">
                    <span>✓</span>
                    <span>{snackbar.message}</span>
                </div>
            )}
        </div>
    )
}

export default Login