import React from 'react'
import plant from './plant.gif'
import './Home.css';

const Home = () => (
    <div className="App">
      <header className="App-header">
        <img src={plant} className="App-logo" alt="logo" />
        <p>
          The Greenhouse
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
)

export default Home
