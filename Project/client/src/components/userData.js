import axios from 'axios'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { store } from '../App';
import AllUsersData from './allUsersData';
import ReceivedFriendRequest from './frineds/receivedFriendRequest';
import SentFriendRequest from './frineds/sentFriendRequest';


const UserData = () => {

  const { email } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const [token, setToken] = useContext(store);
  const [allUsersData, setAllUsersData] = useState();


  useEffect(() => {
    axios.get("http://localhost:3002/getUserData", {
      headers: {
        'x-token': [token]
      },
    })
      .then(res => {
        // console.log(res)
        setData(res.data)
        setLoading(true)
        HandleChange("")
      })
  }, [email, token])

  // useEffect(() => {
  //   friendRequestsReceived()
  // }, [])

  const handleLogout = () => {
    navigate("/login")
    setLoading(false)
    window.location.reload()
  }



  // Search Using Debouncing

  const HandleChange = (value) => {
    axios.get(`http://localhost:3002/search?searchData=${value}`, {
      headers: {
        'x-token': [token]
      }
    })
      .then(res => {
        setAllUsersData(res.data)
        setLoading(true)
      })
  }

  // Debounce method

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args)
      }, 500);
    }
  }

  // debounce Optimization

  const optimizedFun = useCallback(debounce(HandleChange), [])

  // Accept friend request

  // const addFriendRequest = (id) => {
  //   axios.put("http://localhost:3002/acceptFriendRequest", { id, email: data.email })
  //     .then(response => {
  //       console.log(response)
  //     }).catch(err => {
  //       console.log(err)
  //     })

  // }



  return (
    <div>
      {
        token && loading === true ?
          <div>
            <div>
              <p>First Name : {data.firstName}</p>
              <p>Last Name : {data.lastName}</p>
              <p>Email : {data.email}</p>
              <p>Designation : {data.phoneNumber}</p>
              <p>Designation : {data.designation}</p>
              <p>Experience : {data.experience}</p>
              <button onClick={handleLogout}>logout</button>
            </div>
          </div>
          :
          <div>Loading......Please login again<a href="/login">Sign in</a></div>
      }
      {
        allUsersData && token &&
        <div>
          <input placeholder='Search'
            onChange={
              (event) => optimizedFun(event.target.value)
            }
          />
          <AllUsersData
            allUsersData={allUsersData}
            data={data}
          />
        </div>
      }
      {loading === true &&
        <div>
          <hr />
          <SentFriendRequest data={data} />
          <hr />
          <ReceivedFriendRequest data={data} />
        </div>
      }
    </div>
  )
}

export default UserData