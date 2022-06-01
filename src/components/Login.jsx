import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../FirebaseConfigs/firebaseConfigs'
import { collection, addDoc } from 'firebase/firestore'
import './Login.css'

function Login() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errorMsg, setErrorMsg] = useState("")
    const [successMsg, setSuccessMsg] = useState("")
    //navigate hum tab use karenge jab suppose user ne login kr liya...phir uskjo kaunsa page dikhana hai 
    const navigate = useNavigate()
    const auth = getAuth()


    return (
        <div>

            <Navbar />
            <div className='login-container'>
                <form className='login-form' >
                    <p>Login </p>

                    {successMsg && <>
                    <div className='success-msg'>
                        {successMsg}
                        </div></>}
                    {errorMsg && <>
                    <div className='error-msg'>
                        {errorMsg}

                    </div>
                    </>}



                    
                    <label>Email</label>
                    <input onChange={(e) => setEmail(e.target.value)}
                        type='email' placeholder="Your Email" />

                    <label>Password</label>
                    <input onChange={(e) => setPassword(e.target.value)}
                        type='password' placeholder='Your password' />

                    

                    <button onClick={handleLogin}>Login</button>

                    <div>
                        <span>Don't have an account?</span>
                        <Link to='/signup'>Sign Up</Link>
                    </div>




                </form>

            </div>
        </div>
    )
}

export default Login