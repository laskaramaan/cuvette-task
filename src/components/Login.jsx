import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
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

    const handleLogin = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setSuccessMsg('Logged in successfully, you will be redirected to home page')

                setEmail('')
                setPassword('')
                setErrorMsg('')
                setTimeout(() => {
                    setSuccessMsg('');
                    navigate('/home');

                }, 3000);
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(error.message)
                if (error.message === 'Firebase: Error (auth/invalid-email).') {
                    setErrorMsg(' Please fill all requied fields')
                }
                if (error.message === 'Firebase: Error (auth/user-not-found).') {
                    setErrorMsg(' Email not found')
                }
                if (error.message === 'Firebase: Error (auth/wrong-password).') {
                    setErrorMsg(' Wrong Password')
                }

            })

    }


    return (
        <div>

            <Navbar />
            <div className='login-container'>
                <form className='login-form' >
                    <p>Login </p>

                    {/* Success mssge ke andar kuch hai to wo show kr do */}
                    {successMsg && <>
                        <div className='success-msg'>
                            {successMsg}
                        </div></>}

                    {/* Error mssge ke andar kuch hai to wo show kr do  */}
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