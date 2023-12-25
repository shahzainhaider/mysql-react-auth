import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = (props) => {
  axios.defaults.withCredentials = true
  let  user= props.user
console.log(user)

  return (
    <>
      {
       user && <h1 className='text-black'>{user.name}</h1>
      }

    </>
  )
}

export default Home
