import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = (props) => {

    const auth = ()=>{
        props.setAuth(false)
        localStorage.removeItem('token')
        
    }
  return (
    <>
    <nav className='p-4 bg-slate-200'>
        <div className="flex justify-center items-center gap-96">
            <ul>
                <Link to={'/'}>Home</Link>
            </ul>
            <div className="">
                <button onClick={()=>auth()} className='px-2 py-1 bg-blue-500 text-white'>logout</button>
            </div>

        </div>
    </nav>
          
    </>
  )
}

export default Navbar
    