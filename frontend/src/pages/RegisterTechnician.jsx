import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerTechnician, fetchSkills } from '../api/register';

const RegisterTechnician = () => {

    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [skill, setSkill] = useState('');

    const [userNameError, setUserNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [skillError, setSkillError] = useState('');

    const [skills, setSkills] = useState([])

    useEffect(() => {
        async function getSkill() {
            const skills = await fetchSkills()
            setSkills(skills.data)
        }
        getSkill()
    }, [])

    const handleSubmit = async (e) => {

        e.preventDefault();

        // Clear previous errors
        setUserNameError('');
        setPhoneError('');
        setEmailError('');
        setPasswordError('');
        setSkillError('')

        let hasError = false;

        // Frontend validation
        if (userName.trim() === '') {
            setUserNameError('Username required');
            hasError = true;
        }

        if (phone.trim() === '') {
            setPhoneError('Phone number required');
            hasError = true;
        }

        if (skill.trim() === '') {
            setSkillError('Skill required');
            hasError = true
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

        // API call
        const result = await registerTechnician(
            userName,
            phone,
            email,
            password,
            skill
        );

        console.log("Registration result:", result);

        // Success
        if (result.success) {

            alert('Technician registered successfully');

            setUserName('');
            setPhone('');
            setEmail('');
            setPassword('');
            setSkill('')

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

        if (errors?.skill) {
            setSkillError(errors.skill[0])
        }

        if (errors?.password) {
            setPasswordError(errors.password[0]);
        }
    };


    return (

        <div className='bg-blue-950  m-0 p-0 pb-8'>
            <div className="justify-items-center ">

                <h1 className="text-3xl text-white font-bold pt-4">
                    Register as Technician
                </h1>
                <div className="w-full p-8 pt-1 lg:w-1/3 md:w-1/2 sm:w-2/3 mx-auto mt-8 bg-gray-200 rounded-xl shadow-md">

                    <form
                        onSubmit={handleSubmit}
                        className=" mx-auto m-12 rounded-xl ps-8 pe-8"
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


                        {/* Phone */}
                        <div className="mb-5">

                            <label
                                htmlFor="phone"
                                className="block mb-2.5 text-sm font-medium text-heading"
                            >
                                Your Phone
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
                                Your Email
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

                        {/* skill */}
                        <div className="mb-5">

                            <label
                                htmlFor="skill"
                                className="block mb-2.5 text-sm font-medium text-heading"
                            >
                                Your skill/trade
                            </label>

                            <select id='skill' name='skill' onChange={(e) => {
                                setSkill(e.target.value)
                                setSkillError('')
                            }
                            } value={skill} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-xl focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                            >
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

                            {skillError && (
                                <p className="text-red-500 text-sm mt-1">
                                    {skillError}
                                </p>
                            )}

                        </div>


                        {/* Password */}
                        <div className="mb-5">

                            <label
                                htmlFor="password"
                                className="block mb-2.5 text-sm font-medium text-heading"
                            >
                                Your Password
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


                        {/* Customer registration */}
                        <div className="mb-5 flex justify-end">

                            <button
                                type="button"
                                onClick={() => navigate('/register/customer')}
                                className="text-blue-950"
                            >
                                Register as Customer
                            </button>

                        </div>


                        {/* Submit + Login */}
                        <div className="flex justify-between">

                            <button
                                type="submit"
                                className="box-border bg-blue-950 text-white rounded-xl focus:ring-brand-medium shadow-xs font-medium leading-5 text-sm px-4 py-2.5 focus:outline-none"
                            >
                                Submit
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate('/login')}
                                className="mt-3 text-blue-950"
                            >
                                Already have an account?
                            </button>

                        </div>

                    </form>
                </div></div>
        </div>
    );
};

export default RegisterTechnician;