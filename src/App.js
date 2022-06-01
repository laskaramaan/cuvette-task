import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import PgFOF from './components/PgFOF'
import Cart from './components/Cart';
import UserProfile from './components/UserProfile';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/home' element={<Home/>} />
        <Route exact path='/signup' element={<Signup/>} />
        <Route exact path='/login' element={<Login/>} />
        <Route exact path='/cart' element={<Cart/>} />
        <Route exact path='/userprofile' element={<UserProfile/>}/>
        <Route path="*" element={<PgFOF/>} />
        
      
      </Routes>

    </BrowserRouter>
  );
}

export default App;
