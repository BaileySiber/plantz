import React from 'react'
import GoogleLogin from 'react-google-login';

const loginSuccess = (response) => {
  console.log('in login success' + response.profileObj.name);
  // fetch('https://thegreenhouse.herokuapp.com/login/user', {
  fetch('http://localhost:3001/login/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: response.profileObj.name,
      email: response.profileObj.email
    })
  })
  .then(resp => {
    if(resp.status === 201){
      console.log('this was saved!')
    }
    else if(resp.status === 200){
      console.log('dey exist silly')
    }
  })
  .catch(err => console.log('error saving user' + err))
}

const loginFailure = () => {

  window.confirm('Login failure! Try Again.')
}

const GoogleSignIn = () => (
  <div className="Login">
    <header className="Login-header">
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
