import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import './Shelf.css';

class Shelf extends React.Component {

  constructor(props){
    super(props);
    this.state={
      show: false,
    }
  }

  showModal = () => {
    this.setState({show: true})
  }

  hideModal = () => {
    this.setState({show:false})
  }

  addPlant = () => {
    console.log("adding a new plant!")
    this.setState({show:false})
  }

  render() {
    return(

      <div>
        <div class="wrap">
          <div class="base">
            <div class="flowerpot"></div>
            <div class="blade blade-center"></div>
            <div class="blade blade-left-s"></div>
            <div class="blade blade-right-s"></div>
            <div class="blade blade-left-l"></div>
            <div class="blade blade-right-l"></div>
          </div>
        </div>
      </div>
    )
  }
}

export default Shelf
