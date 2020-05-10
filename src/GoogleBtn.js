import React from 'react'
import GoogleLogin from 'react-google-login';

const responseGoogle = (response) => {
  console.log(response);
}

const loginFailure = () => {
    window.confirm('Login failure! Try Again.')
  }

const GoogleSignIn = () => (
  <div className="Login">
    <header className="Login-header">
      <p>hey</p>
      <GoogleLogin
        clientId="235351537587-pchproqf9sk54ti65i832ae988qo04uj.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={loginFailure}
        cookiePolicy={'single_host_origin'}
      />
    </header>
    </div>
  )

export default GoogleSignIn
