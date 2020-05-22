import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import './Succulent.css'

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
            <Modal.Title>
              {this.props.plant.assigned_name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formCommonName">
                <Form.Label>Common Name: {this.props.plant.plant_data.name}</Form.Label>
              </Form.Group>
              <Form.Group controlId="formSciName">
                <Form.Label>Scientific Name: {this.props.plant.plant_data.scientific_name}</Form.Label>
              </Form.Group>
              <Form.Group controlId="formDesc">
                <Form.Label>Description: {this.props.plant.plant_data.description}</Form.Label>
              </Form.Group>
              <Form.Group controlId="formWaterFreq">
                <Form.Label>Watering Frequency: {this.props.plant.plant_data.watering_frequency}</Form.Label>
              </Form.Group>
              <Form.Group controlId="formWaterAmt">
                <Form.Label>Watering Amount: {this.props.plant.plant_data.watering_amount}</Form.Label>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
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
