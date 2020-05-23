import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import './Succulent.css'
import raindrop from './drops.png'

class Succulent extends React.Component {

  constructor(props){
    super(props);
    this.state={
      show: false
    }
  }

  showModal = () => {
    this.setState({show: true})
  }

  hideModal = () => {
    this.setState({show:false})
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
            <Button className="water" onClick={this.addPlant}>
            <img className="raindrop" src={raindrop} />
            </Button>
            <Button className="secondary" onClick={this.hideModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

    )
  }
}

  export default Succulent
