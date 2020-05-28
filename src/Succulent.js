import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import './Succulent.css'
import raindrop from './drops.png'

class Succulent extends React.Component {

  constructor(props){
    super(props);
    this.state={
      show: false,
      show2: false
    }
  }

  showModal = () => {
    this.setState({show: true})
  }

  hideModal = () => {
    this.setState({show:false})
  }


  hideModalShowSecond = () => {
    this.setState({show:false})
    this.setState({show2:true})
  }

  hideSecondModal = () => {
    this.setState({show2:false})
  }

  render() {

    console.log('name is' + this.props.plant.assigned_name)

    return(
      <div>
        <div onClick={() => this.showModal()} class="base">
          <div class="flowerpot"></div>
          <div class="blade blade-center"></div>
          <div class="blade blade-left-s"></div>
          <div class="blade blade-right-s"></div>
          <div class="blade blade-left-l"></div>
          <div class="blade blade-right-l"></div>
          <p class="name" >{this.props.plant.assigned_name}</p>
        </div>

        <Modal show={this.state.show} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title class="modal-t">
              {this.props.plant.assigned_name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body class="modal-b">
            <h6 class="underline">Common Name:</h6> <p class="val">{this.props.plant.plant_data.name}</p>
            <h6 class="underline">Scientific Name:</h6> <p class="val">{this.props.plant.plant_data.scientific_name}</p>
            <h6 class="underline">Description:</h6> <p class="val">{this.props.plant.plant_data.description}</p>
            <h6 class="underline">Watering Frequency:</h6> <p class="val">{this.props.plant.plant_data.watering_frequency}</p>
            <h6 class="underline">Watering Amount:</h6> <p class="val">{this.props.plant.plant_data.watering_amount}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button className="secondary" onClick={this.hideModal}>
              Close
            </Button>
            <Button className="water" onClick={this.hideModalShowSecond}>
              <img className="raindrop" src={raindrop} />
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.show2} onHide={this.hideSecondModal}>
          <Modal.Header closeButton>
            <Modal.Title class="modal-t">
              {this.props.plant.assigned_name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body class="modal-b">
            <p>so you want a watering reminder huh?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button className="secondary" onClick={this.hideSecondModal}>
              Nah
            </Button>
            <Button className="primary" onClick={this.setReminder}>
              Yes!
            </Button>
          </Modal.Footer>
        </Modal>

      </div>

    )
  }
}

export default Succulent