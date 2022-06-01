import React from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'
import cartlogo from '../components/assets/cartlogo.png'
import profilelogo from '../components/assets/profilelogo.png'


function Navbar() {
  return (
    <nav>
        <Link to='/'><button>Home</button></Link>
        <Link to='/signup'><button>Register</button></Link>
        <Link to='/login'><button>Login</button></Link>
        <Link to='/cart'>
            <div className='cart-btn'>
                <img src={cartlogo} alt='no img' />
                <span className='cart-icon-css'>0</span>

            </div>
        </Link>

        <Link to='userprofile'>
            <img src={profilelogo} className='profile-icon' />
        </Link>

    </nav>
  )
}

export default Navbar