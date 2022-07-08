import './App.css';
import SignUp from './components/SignUp';
import Login from './components/login';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import UserData from './components/userData';
import { createContext, useEffect, useState } from 'react';


export const store = createContext();


function App() {
  const [token, setToken] = useState(null);


  useEffect(() => {
    setToken(localStorage.getItem("token"))
    console.log("tokeeeeeeeeeeeeeeeeeeen",token)
  },[])


  return (
    <store.Provider value={[token, setToken]}>
      <Router>
        <div>
          <Routes>
            <Route path='*' element={<Login />}></Route>
            <Route path='/signup' element={<SignUp />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/userData' element={<UserData />}></Route>

          </Routes>
        </div>
      </Router>
    </store.Provider>
  );
}

export default App;
