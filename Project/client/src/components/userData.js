import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PayloadContext } from './context';
import Header from './header/header';


const UserData = () => {
  const navigate = useNavigate();
  const { setToken, token, data, loading, setLoading } = useContext(PayloadContext)

  useEffect(() => {
    const loginToken = localStorage.getItem("token")
    if (loginToken) {
      setToken(loginToken)
    }
  }, [setToken])


  const handleLogout = () => {
    navigate("/login")
    setLoading(false)
    setToken(localStorage.removeItem("token"))
    window.location.reload()
  }


  return (
    <div>
      {
        token && loading === true ?
        <div className='userDetailsCard'>
            <Header />
            <div className='userDetails'>
              <h1>First Name : {data.firstName}</h1>
              <h1>Last Name : {data.lastName}</h1>
              <h1>Email : {data.email}</h1>
              <h1>Designation : {data.phoneNumber}</h1>
              <h1>Designation : {data.designation}</h1>
              <h1>Experience : {data.experience}</h1>
              <button onClick={handleLogout}>logout</button>
            </div>
          </div>
          :
          <div>Loading......Please login again<a href="/login">Sign in</a></div>
      }
    </div>
  )
}

export default UserData