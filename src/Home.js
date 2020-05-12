import React from 'react'
import plant from './plant.gif'
import './Home.css';
import { Link } from 'react-router-dom'
import GoogleSignIn from './GoogleBtn';


const Home = () => (
    <div className="Home">
      <header className="Home-header">
        <img src={plant} className="Home-logo" alt="logo" />
        <p>
          Welcome to the Greenhouse!
        </p>

        <GoogleSignIn />

        {/* This should be automatically rerouted to if someone is logged in */}
        <Link to='/greenhouse'>
          <button>Click Me to Come to Your Greenhouse</button>
        </Link>

      </header>
    </div>
)

export default Home
