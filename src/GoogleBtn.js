import React from 'react'
import GoogleLogin from 'react-google-login';

const loginSuccess = (response) => {
  console.log(response);
  fetch('https://thegreenhouse.herokuapp.com/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: response.profileObj
    })
  })
  .then(resp => resp.json())
  .then(resp => {
    console.log(resp)
  })
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
        onSuccess={loginSuccess}
        onFailure={loginFailure}
        cookiePolicy={'single_host_origin'}
      />
    </header>
  </div>
)

export default GoogleSignIn
