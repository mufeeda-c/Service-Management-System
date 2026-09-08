import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerCustomer } from '../api/register';

const RegisterCustomer = () => {

    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [userNameError, setUserNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSubmit = async (e) => {

        e.preventDefault();

        // Clear previous errors
        setUserNameError('');
        setPhoneError('');
        setEmailError('');
        setPasswordError('');

        // Frontend validation
        let hasError = false;

        if (userName.trim() === '') {
            setUserNameError('Username required');
            hasError = true;
        }

        if (phone.trim() === '') {
            setPhoneError('Phone number required');
            hasError = true;
        }

        if (email.trim() === '') {
            setEmailError('Email required');
            hasError = true;
        }

        if (password.trim() === '') {
            setPasswordError('Password required');
            hasError = true;
        }

        if (hasError) {
            return;
        }

        // Call API
        const result = await registerCustomer(
            userName,
            phone,
            email,
            password
        );

        console.log("Registration result:", result);

        // Registration successful
        if (result.success) {

            alert('User registered successfully');

            // Clear fields
            setUserName('');
            setPhone('');
            setEmail('');
            setPassword('');

            // Navigate to login
            navigate('/login');

            return;
        }

        // Backend errors
        const errors = result.data;

        if (errors?.username) {
            setUserNameError(errors.username[0]);
        }

        if (errors?.email) {
            setEmailError(errors.email[0]);
        }

        if (errors?.phone) {
            setPhoneError(errors.phone[0]);
        }

        if (errors?.password) {
            setPasswordError(errors.password[0]);
        }
    };


    return (
        <div className="justify-items-center">

            <h1 className="text-3xl font-bold mt-8">
                Register Here!
            </h1>

            <form
                onSubmit={handleSubmit}
                className="w-1/4 mx-auto m-12 border rounded-xl p-8"
            >

                {/* Username */}
                <div className="mb-5">

                    <label
                        htmlFor="Username"
                        className="block mb-2.5 text-sm font-medium text-heading"
                    >
                        Your Username
                    </label>

                    <input
                        type="text"
                        id="Username"
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


                {/* Phone */}
                <div className="mb-5">

                    <label
                        htmlFor="phone"
                        className="block mb-2.5 text-sm font-medium text-heading"
                    >
                        Your phone
                    </label>

                    <input
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={(e) => {
                            setPhone(e.target.value);
                            setPhoneError('');
                        }}
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-xl focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                        placeholder="9988456783"
                    />

                    {phoneError && (
                        <p className="text-red-500 text-sm mt-1">
                            {phoneError}
                        </p>
                    )}

                </div>


                {/* Email */}
                <div className="mb-5">

                    <label
                        htmlFor="email"
                        className="block mb-2.5 text-sm font-medium text-heading"
                    >
                        Your email
                    </label>

                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailError('');
                        }}
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-xl focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                        placeholder="name@gmail.com"
                    />

                    {emailError && (
                        <p className="text-red-500 text-sm mt-1">
                            {emailError}
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
                            setPassword(e.target.value);
                            setPasswordError('');
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


                {/* Technician registration */}
                <div className="mb-5 flex justify-end">

                    <button
                        type="button"
                        onClick={() => navigate('/register/technician')}
                        className="text-blue-600"
                    >
                        Register as Technician
                    </button>

                </div>


                {/* Submit + Login */}
                <div className="flex justify-between">

                    <button
                        type="submit"
                        className="box-border border rounded-xl focus:ring-brand-medium shadow-xs font-medium leading-5 text-sm px-4 py-2.5 focus:outline-none"
                    >
                        Submit
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate('/login')}
                        className="mt-3 text-blue-600"
                    >
                        Already have an account?
                    </button>

                </div>

            </form>

        </div>
    );
};

export default RegisterCustomer;