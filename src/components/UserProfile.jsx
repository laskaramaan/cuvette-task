import React, { useState, useEffect } from 'react'
import { auth, db } from '../FirebaseConfigs/firebaseConfigs'
import { updateProfile } from 'firebase/auth'
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore'
import Navbar from './Navbar'
import './UserProfile.css'

function UserProfile() {
  function GetCurrentUser() {
    const [user, setUser] = useState('')
    const userCollectionRef = collection(db, "users")


    // useEffect realtime changes karke deta hai

    useEffect(() => {
      auth.onAuthStateChanged(userlogged => {
        if (userlogged) {
          const getUsers = async () => {
            const q = query(collection(db, 'users'), where('uid', '==', userlogged.uid))
            //console.log(q)
            const data = await getDocs(q);
            setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
          }
          getUsers();
        }
        else {
          setUser(null)
        }

      })

    }, [])
    return user


  }
  const loggeduser = GetCurrentUser();

  if (loggeduser) { console.log(loggeduser[0]) }

  return (
    <div>
      <Navbar />
      <div className='userprofile-outercontainer'>
        {loggeduser ? <div className='user-profile'>
          <p>Your Account details</p>
          <div className='data-row'>
            <span>Your Name</span>
            <span> {loggeduser[0].username}</span>

          </div>

          <div className='data-row'>
            <span>Your Email</span>
            <span> {loggeduser[0].email}</span>

          </div>
          <div className='data-row'>
            <span>Your Phone-number</span>
            <span> {loggeduser[0].phonenumber}</span>

          </div>
          <div className='data-row'>
            <span>Your address</span>
            <span> {loggeduser[0].address}</span>

          </div>
        </div> : <div>

          You are not logged in

        </div>}

      </div>

    </div>
  )
}

export default UserProfile