import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {store} from "../App"

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token,setToken] = useContext(store)
    const navigate = useNavigate();

    const handleLogin = (e) => {
        axios.post("http://localhost:3002/login", {
            email: email,
            password: password
        }).then(res => {
            setToken(res.data)
            localStorage.setItem("token",res.data)
            navigate("/userData")
        }).catch(err => {
            console.log(err)
        })
        e.preventDefault();
    }

    return (
        <div>
            <form>
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    name="email"
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />
                <button onClick={handleLogin}>Login</button>
                <p>Don't have an account? <a href='/signup'>Sign Up Here</a> </p>
            </form>
        </div>
    )
}

export default Login