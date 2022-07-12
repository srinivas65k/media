import React, { useState } from 'react'
import axios from "axios"

const SignUp = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(0);
    const [designation, setDesignation] = useState("");
    const [experience, setExperience] = useState("");



    const handleSubmit = () => {
        axios.post("http://localhost:3002/signup", {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password : password,
            phoneNumber: phoneNumber,
            designation: designation,
            experience: experience,
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className='form-container'>
            <h1>Sign Up Form</h1>
            <form>
                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    name="firstName"
                    onChange={(e) => {
                        setFirstName(e.target.value)
                    }}
                />
                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    onChange={(e) => {
                        setLastName(e.target.value)
                    }}
                />
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
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                    type="number"
                    name="phoneNumber"
                    onChange={(e) => {
                        setPhoneNumber(e.target.value)
                    }}
                />
                <label htmlFor="designation">Designation</label>
                <input
                    type="text"
                    name="designation"
                    onChange={(e) => {
                        setDesignation(e.target.value)
                    }}
                />
                <label htmlFor="experience">Experience</label>
                <input
                    type="number"
                    name="experience"
                    onChange={(e) => {
                        setExperience(e.target.value)
                    }}
                />
                <button onClick={handleSubmit}>Submit</button>
                <p>Already have an account? <a href='/login'>Login Here</a> </p>
            </form>
        </div>
    )
}

export default SignUp