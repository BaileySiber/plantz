import React from 'react'
import GoogleLogin from 'react-google-login';
import GreenHouse from './GreenHouse';
import { Link, Redirect } from 'react-router-dom'


class GoogleSignIn extends React.Component {

  constructor(props){
    super(props);
    this.state={
      isLoggedIn: false,
      name: ''
    }
  }

  loginSuccess = (response) => {
    console.log('in login success' + response.profileObj.name);
    // fetch('https://thegreenhouse.herokuapp.com/login/user', {
    this.setState({name:response.profileObj.name})
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
        this.setState({isLoggedIn:true})
      }
      else if(resp.status === 200){
        console.log('dey exist silly')
        this.setState({isLoggedIn:true})
      }
    })
    .catch(err => console.log('error saving user' + err))
  }

  loginFailure = () => {
    window.confirm('Login failure! Try Again.')
  }


  render() {
    return(
      <div className="Login">

        {this.state.isLoggedIn

          ?

          <Redirect to='/greenhouse' />

          :

          <header className="Login-header">
            <GoogleLogin
              clientId="235351537587-pchproqf9sk54ti65i832ae988qo04uj.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={this.loginSuccess}
              onFailure={this.loginFailure}
              cookiePolicy={'single_host_origin'}
            />
          </header>

        }

      </div>
    )
  }
}

export default GoogleSignIn
