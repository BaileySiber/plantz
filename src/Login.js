import React from 'react'
import { Switch, Route } from 'react-router-dom'
import './Login.css';
import GoogleSignIn from './GoogleBtn';

const Login = () => (
  <div className="Login">
    <header className="Login-header">
      <p>hi</p>
    </header>
    <GoogleSignIn/>
    </div>
  )

  export default Login
