import React, { useState, useEffect } from 'react'
import {storage, auth, db } from '../FirebaseConfigs/firebaseConfigs'
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { getDownloadURL,ref,uploadBytes } from 'firebase/storage'
import Navbar from './Navbar'


function Addcourse() {

    const [coursetitle,setCoursetitle] = useState('');
    const [description,setDescription] = useState('');
    const [price, setPrice] = useState("");
    const [coursevideo, setCourseVideo] = useState('');
    const [imageError, setImageError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [uploadError, setUploadError] = useState('')

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
    // if(loggeduser){console.log(loggeduser[0])}




    const handleCourseVideo = (e)=>{
        e.preventDefault();
        let selectedFile = e.target.files[0];

        if(selectedFile){
            setCourseVideo(selectedFile);
        }
        else{
            setImageError('Please select your file')

        }


    }

    const handleAddProduct = (e)=> {
        e.preventDefault();
    }




    return (
        <div>
            <Navbar />
            {loggeduser ? 
            <div>
                {/* HandleAddProduct function will store all the info in firebase storage */}


                <form className='addcourse-form' onSubmit={handleAddProduct}>
                    <p>Add Course details</p>

                    {successMsg && <div className='success-msg'>{successMsg}</div>}
                    {uploadError && <div className='error-msg'>{uploadError}</div>}


                    <label>Course Title</label>
                    <input onChange={(e) => setCoursetitle(e.target.value)} type='text' placeholder='Course title'/>

                    <label>Course video</label>
                    <input onChange={handleCourseVideo} type='file'/>

                    <label>Description</label>
                    <textarea onChange={(e) => setDescription(e.target.value)}  placeholder='Course title'></textarea>

                    <label>Price</label>
                    <input onChange={(e)=> setPrice(e.target.value)} type='text' placeholder='Enter price' />

                    <button type='submit'>Add</button>


                    
                </form>
                    

            </div> : <div>You dont have access to add courses</div>}

        </div>
    )
}

export default Addcourse