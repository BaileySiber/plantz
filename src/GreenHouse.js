import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import './GreenHouse.css';

class GreenHouse extends React.Component {

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
        <p className="GreenHouse-title">
          Welcome to the Greenhouse!
        </p>

        <button onClick={() => this.showModal()}> + </button>

        <Modal show={this.state.show} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              Add Plant
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>Add a new plant to your collection!</Modal.Body>
          <Modal.Footer>
            <Button className="secondary" onClick={this.hideModal}>
              Close
            </Button>
            <Button className="primary" onClick={this.addPlant}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>

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

export default GreenHouse
