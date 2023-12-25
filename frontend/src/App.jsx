import { BrowserRouter as Router,Routes,Route, useNavigate } from "react-router-dom"
import Register from "./Register"
import Home from "./Home"
import Login from "./Login"
import Navbar from "./components/Navbar"
import { useEffect, useState } from "react"
import axios from "axios"
function App() {
  // const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [auth, setAuth] = useState(false)

  useEffect(() => {
    if(localStorage.getItem('token')){
      axios.get('http://localhost:3000')
        .then((res) => {
          if(res.data.status ===401){
            window.location.pathname='/login'
          }
          setAuth(true)
          setUser(res.data.user)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    else{
      if(window.location.pathname !== '/login'){
        window.location.pathname='/login'
      }
    }
  }, [auth])

  return (
    <>
    <Router>
    <Navbar setAuth={setAuth} auth={auth}/>
      <Routes>
        <Route path="/" element={<Home user={user} auth={auth}  />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login setAuth={setAuth} />} />
      </Routes>
    </Router>

      
    </>
  )
}

export default App
