import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import {storage, auth, db } from '../FirebaseConfigs/firebaseConfigs'
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore'
import {useNavigate} from 'react-router-dom'
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage'


function Addcourse() {

    const [coursetitle,setcoursetitle] = useState(""); 
    const [coursecategory ,setcoursecategory] = useState("");
    const [description, setDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [price , setPrice] = useState("");
    const [coursevideo, setcoursevideo] = useState("");

    const [videoError, setvideoError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [uploadError, setUploadError] = useState('');
 

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


    const handleCourseVideo = (e)=> {
        e.preventDefault();
        let selectedFile = e.target.files[0];

        if(selectedFile)
        {
          
            setcoursevideo(selectedFile)
            setvideoError('')

        }
        else
        {
            setvideoError("Please select your file")

        }
    }

    // handleAddCourse function is responsible for storing data to firestore
    const handleAddCourse = (e) => {
        e.preventDefault();
        const storageRef = ref(storage, `product-images${coursecategory.toUpperCase()}/${Date.now()}`)

        uploadBytes(storageRef,coursevideo).then(()=>{
            getDownloadURL(storageRef).then(url =>{
                addDoc(collection(db,  `products-${coursecategory.toUpperCase()} `),{
                    coursetitle,
                coursecategory,
                description,
                price,
                coursevideo: url

                })
            })
        })


    }

    return (
        <div>
            <Navbar />
            {loggeduser ?
                <div className='addprod-container'>
                    <form className='addprod-form' onSubmit={handleAddCourse}>
                        <p>Add Course</p>
                        {successMsg && <div className='success-msg'>{successMsg}</div>}
                        {uploadError && <div className='error-msg'>{uploadError}</div>}

                        <label>Course tile</label>
                        <input type='text' onChange={(e)=>{setcoursetitle(e.target.value)}} placeholder='course title'/>

                        <label>Course Category</label>
                        <input type='text' onChange={(e)=>{setcoursecategory(e.target.value)}} placeholder='course Category'/>
                        
                        <label>Course Video</label>
                        <input onChange={handleCourseVideo} type='file' />
                        {videoError && <>
                            <div className='error-msg'>{videoError}</div>
                        </>}
                        <label>Description</label>
                        <textarea onChange={(e)=>setDescription(e.target.value)} placeholder='description of your course'></textarea>

                        <label>Price</label>
                        <input type='text' onChange={(e)=>{setPrice(e.target.value)}} placeholder='Enter price'/>

                        <button type='submit'>add</button>

                    </form>
                   

                </div> : <div>You dont have access to add courses</div>}

        </div>
    )
}

export default Addcourse
