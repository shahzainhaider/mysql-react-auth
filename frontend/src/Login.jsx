import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [data, setData] = useState({ email: '', pass: '' })
    const navigate = useNavigate()
    if(localStorage.getItem('token')){
        window.location.pathname='/'
    }

    axios.defaults.withCredentials = true
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let result = await axios.post('http://localhost:3000/login', data)
            if(result.data.status ===200){
                localStorage.setItem('token',result.data.token)
                props.setAuth(true)
                window.location.pathname='/'
            }else {
                console.log(result.data.message)
            }
            

        } catch (error) {
            console.log('error')
            console.log(error.message)
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
                    <h1 className="mb-8 text-3xl text-center">Login</h1>
                    <form onSubmit={handleSubmit}>
                    <input 
                        type="email"
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
                        type="submit"
                        className="w-full text-center py-3 rounded bg-green-500 text-white focus:outline-none my-1"
                    >Login</button>
                    </form>
                </div>

                <div className="text-grey-dark mt-6">
                    Don't have an account? 
                    <Link className="no-underline border-b border-blue text-blue" to={'/register'}>
                        sign up
                    </Link>.
                </div>
            </div>
        </div>
      
    </>
  )
}

export default Login
