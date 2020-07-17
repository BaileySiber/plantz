import React from 'react'
import plant from './plant.gif'
import './Home.css';
// import { Link } from 'react-router-dom'
import GoogleSignIn from './GoogleBtn';


const Home = () => (
  <div className="Home">
    <header className="Home-header">
      <p>
        Welcome to the Greenhouse!
      </p>
      <img src={plant} className="Home-logo" alt="logo" />
      <GoogleSignIn />
    </header>
  </div>
)

export default Home
