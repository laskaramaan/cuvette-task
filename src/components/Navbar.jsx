import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import cartlogo from '../components/assets/cartlogo.png'
import profilelogo from '../components/assets/profilelogo.png'
import { auth, db } from '../FirebaseConfigs/firebaseConfigs'
import { collection, getDocs, query, where } from 'firebase/firestore'


function Navbar() {
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

  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate('/login')

    })
  }

  return (
    <div>
      <div className='navbar'>
        <div className='LeftContainer'>
          <h1>Amaan's App</h1>

        </div>
        <div className='RightContainer'>

          {/* !loggeduser ka mtlb hai agar user logged in na ho to  */}
          {!loggeduser && <nav>
            <Link to='/'><button>Home</button></Link>

            <Link to='/signup'><button>Register</button></Link>
            <Link to='/login'><button>Login</button></Link>

            <Link to='/cart'>
              <div className='cart-btn'>
                <img src={cartlogo} alt='no img' />
                <span className='cart-icon-css'>0</span>

              </div>
            </Link>

            <Link to='/userprofile'>
              <img src={profilelogo} className='profile-icon' />
            </Link>

          </nav>}

          {loggeduser &&
            <nav>
              <Link to='/'><button>Home</button></Link>
              <Link to='/addcourse'><button>Add Course</button></Link>


              <Link to='/cart'>
                <div className='cart-btn'>
                  <img src={cartlogo} alt='no img' />
                  <span className='cart-icon-css'>{loggeduser[0].cart}</span>

                </div>
              </Link>

              <Link to='userprofile'>
                <img src={profilelogo} className='profile-icon' />
              </Link>

              <button className='logout-btn' onClick={handleLogout}>Logout</button>
            </nav>

          }


        </div>

      </div>

      <div className='product-types'>
        <a href='/product-type/mobiles'><button>course 1</button></a>
        <a href='/product-type/laptops'><button>course 2</button></a>
        <a href='/product-type/camera'><button>course 3</button></a>
        <a href='/product-type/shoes'><button>course 4</button></a>


      </div>

    </div>
  )
}

export default Navbar