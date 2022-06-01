import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../FirebaseConfigs/firebaseConfigs'
import { collection, addDoc } from 'firebase/firestore'
import './Signup.css'






function Signup() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [address, setAddress] = useState("");

    const navigate = useNavigate()

    const [errorMsg, setErrorMsg] = useState("")

    const [successMsg, setSuccessMsg] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // userCredential means email and password
                const user = userCredential.user
                const initailcartvalue = 0;
                console.log(user)

                // addDoc is used to add contents to the cloud database
                // users naam ka ek folder banega apne database waha pe sara data store hona chahiye
                addDoc(collection(db, "users"), {
                    //yeh saari chize store karani hai mereko
                    username: username, email: email, phonenumber: phonenumber, password: password, cart: initailcartvalue, address: address, uid: user.uid
                }).then(()=>{
                    setSuccessMsg('New user added successfully, you will now be automatically redirected to login page')
                    setUsername('')
                    setPhonenumber('')
                    setEmail('')
                    setPassword('')
                    setErrorMsg('')
                    
                    // setTimeout me humne l=yeh likha hai ki agar success msg aa jaye to 4 sec ke andar login page me redirect ho jaye
                    setTimeout(()=>{
                        setSuccessMsg('');
                        navigate('/login');
                    
                    }, 4000);

                }) // catch me hum error msg show kra denge
               .catch((error)=> { setErrorMsg(error.message)})
            })
            .catch((error)=> {
                if(error.message === 'Firebase: Error (auth/invalid-email).')
                {
                    setErrorMsg(' Please fill all requied fields')
                }
                if(error.message === 'Firebase: Error (auth/email-already-in-use') {
                    setErrorMsg('User already exists')
                }
            })
    }


    return (
        <div>
            <Navbar />
            <div className='signup-container'>
                <form className='signup-form' onSubmit={handleSubmit}>
                    <p>Create Account</p>

                    {successMsg && <>
                    <div className='success-msg'>
                        {successMsg}
                        </div></>}
                    {errorMsg && <>
                    <div className='error-msg'>
                        {errorMsg}

                    </div>
                    </>}



                    <label>Your Name</label>
                    <input onChange={(e) => setUsername(e.target.value)}
                        type='text' placeholder='Your Name' />


                    <label>Mobile Number</label>
                    <input onChange={(e) => setPhonenumber(e.target.value)}
                        type='tel' placeholder="Mobile number" />

                    <label>Email</label>
                    <input onChange={(e) => setEmail(e.target.value)}
                        type='email' placeholder="Your Email" />

                    <label>Password</label>
                    <input onChange={(e) => setPassword(e.target.value)}
                        type='password' placeholder='Your password' />

                    <label>Address</label>
                    <textarea onChange={(e) => setAddress(e.target.value)}
                        placeholder='Your address'></textarea>
                    <button type='submit'>Sign Up</button>

                    <div>
                        <span>Atready have an account?</span>
                        <Link to='/login'>Sign In</Link>
                    </div>




                </form>

            </div>
        </div>
    )
}

export default Signup