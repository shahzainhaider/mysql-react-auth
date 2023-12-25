import axios from 'axios'
import React, { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'

const Register = () => {
    const [data, setData] = useState({ name: '', email: '', pass: '' })
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let result = await axios.post('http://localhost:3000/users', data)
            if(result.status ===200){
                alert('User created.!!')
                navigate('/login')
            }else{
                alert('error')
            }

        } catch (error) {
            console.log(error)
        }

    }
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className="bg-grey-lighter min-h-screen flex flex-col">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                placeholder="Full Name" />

                            <input
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                placeholder="Email" />

                            <input
                                type="password"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="pass"
                                value={data.pass}
                                onChange={handleChange}
                                placeholder="Password" />
                            <button
                                className="w-full text-center py-3 rounded text-white bg-green-500 focus:outline-none my-1"
                            >Createsadad Account</button>
                        </form>

                        <div className="text-center text-sm text-grey-dark mt-4">
                            By signing up, you agree to the
                            <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                                Terms of Service
                            </a> and
                            <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                                Privacy Policy
                            </a>
                        </div>
                    </div>

                    <div className="text-grey-dark mt-6">
                        Already have an account?
                        <Link className="no-underline border-b border-blue text-blue" to={'/login'}>
                            Log in
                        </Link>.
                    </div>
                </div>
            </div>

        </>
    )
}

export default Register
