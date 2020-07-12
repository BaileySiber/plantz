import React from 'react'
import GoogleLogin from 'react-google-login';
import GreenHouse from './GreenHouse';
import { Link, Redirect } from 'react-router-dom'


class GoogleSignIn extends React.Component {

  constructor(props){
    super(props);
    this.state={
      isLoggedIn: false,
      email: '',
      name: ''    }
  }

  loginSuccess = (response) => {

    console.log('in login success' + response.profileObj.name);

    this.setState({name:response.profileObj.name, email:response.profileObj.email})

    fetch( process.env.REACT_APP_SERVER_URL + 'login/user', {
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
        // new user has logged in and been successfully created
        console.log('this was saved!')
        this.setState({isLoggedIn:true})
      }
      else if(resp.status === 200){
        // existing user has successfully logged in
        console.log('dey exist silly')
        this.setState({isLoggedIn:true})
      }
      else {
        console.log("something unexpected happend, status code: ", resp.status)
      }

    }).catch(err => console.log('error saving user' + err))
  }

  loginFailure = () => {
    window.confirm('Login failure! Try Again.')
  }


  render() {
    return(
      <div className="Login">

        {this.state.isLoggedIn

          ?

          <Redirect to={{ pathname: '/greenhouse',
          state: { user_email: this.state.email } }} />

          :

          <header className="Login-header">
            <GoogleLogin
              clientId={process.env.REACT_APP_CLIENT_ID}
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
