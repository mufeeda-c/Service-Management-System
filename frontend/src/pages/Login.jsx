import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../api/register'

const Login = () => {
    const navigate = useNavigate()

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const [userNameError, setUserNameError] = useState('')
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
        setUserNameError('')
        setPasswordError('')

        const result = await loginUser(userName, password)
        if (result.success) {
            sessionStorage.setItem("user", result.data.user.username);

            // Show snackbar
            setSnackbar({
                show: true,
                message: 'User logged in successfully!',
                type: 'success'
            })

            // Clear fields
            setUserName('')
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

        if (errors?.username) {
            setUserNameError(errors.username[0])
        }

        if (errors?.password) {
            setPasswordError(errors.password[0])
        }

        if (errors?.error) {
            setLoginError(errors.error)
        }
    }

    return (
        <>
            <div className="justify-items-center">

                <h1 className="text-3xl font-bold mt-8">
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
                                setUserName(e.target.value)
                                setUserNameError('')
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
                            className="box-border border rounded-xl shadow-xs font-medium text-sm px-4 py-2.5"
                        >
                            Submit
                        </button>

                        <button
                            type="button"
                            className="mt-3"
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

            {/* Snackbar */}
            {snackbar.show && (
                <div className="fixed bottom-5 right-5 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-2">
                    <span>✓</span>
                    <span>{snackbar.message}</span>
                </div>
            )}
        </>
    )
}

export default Login