import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Products from './Products'
import Banner from './Banner'
import { auth, db } from '../FirebaseConfigs/firebaseConfigs'
import { collection, getDocs, query, where } from 'firebase/firestore'

function Home() {
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
  //if(loggeduser){console.log(loggeduser[0])}

  




  return (
    <div>
      <Navbar />

      <Banner />

      {/* Agar user exist krta hai means logged in hai to phir uska data show karo*/}
      <p>{loggeduser?loggeduser[0].email:"No data"}</p>


    </div>


  )
}

export default Home