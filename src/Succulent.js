import React from 'react'
import './Succulent.css'

class Succulent extends React.Component {

  constructor(props){
    super(props);
    this.state={
      show: false,
    }
  }

  showAlert = () => {
    window.alert("hello!")
  }

  render() {

    console.log('name is' + this.props.name)

    return(
      <div>
        <p>{this.props.name}</p>

        <div onClick={() => this.showAlert()} class="base">
          <div class="flowerpot"></div>
          <div class="blade blade-center"></div>
          <div class="blade blade-left-s"></div>
          <div class="blade blade-right-s"></div>
          <div class="blade blade-left-l"></div>
          <div class="blade blade-right-l"></div>
        </div>
      </div>

    )
  }
}

  export default Succulent
