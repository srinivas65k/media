import './App.css';
import SignUp from './components/SignUp';
import Login from './components/login';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import UserData from './components/userData';
import { useEffect, useState } from 'react';
import ReceivedFriendRequest from './components/frineds/receivedFriendRequest';
import SentFriendRequest from './components/frineds/sentFriendRequest';
import { PayloadContext } from "./components/context"
import axios from 'axios';


// export const store = createContext();
// export const userDataSelf = createContext();
// export const userDataLoading = createContext();


function App() {
  const [token, setToken] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    setToken(localStorage.getItem("token"))
  }, [data, token, loading])


  const getUserData = () => {
    axios.get("http://localhost:3002/getUserData", {
      headers: {
        'x-token': [token]
      },
    })
      .then(res => {
        setData(res.data)
        setLoading(true)
      })
  }
  useEffect(() => {
    getUserData()
  }, [token])


  return (
    <Router>
      <PayloadContext.Provider
        value={{
          token: token,
          data: data,
          loading: loading,
          setLoading: setLoading,
          setToken: setToken,
          setData: setData
        }}
      >
        <Routes>
          <Route path='*' element={<Login />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/userData' element={<UserData />}></Route>
          <Route path='/notifications' element={<SentFriendRequest />}></Route>
          <Route path='/requests' element={<ReceivedFriendRequest />}></Route>
        </Routes>
      </PayloadContext.Provider>
    </Router>
  );
}

export default App;
