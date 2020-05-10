import React from 'react'
import plant from './plant.gif'
import './Home.css';
import { Link } from 'react-router-dom'


const Home = () => (
    <div className="App">
      <header className="App-header">
        <img src={plant} className="App-logo" alt="logo" />
        <p>
          The Greenhouse
        </p>

        <button><Link to='/login'>click me!</Link></button>

      </header>
    </div>
)

export default Home
