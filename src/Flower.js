import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import './Flower.css'
import raindrop from './drops.png'

class Succulent extends React.Component {

  constructor(props){
    super(props);
    this.state={
      show: false,
      show2: false,
      show3: false,
      reminder: ""
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
    this.setState({show3:false})
  }

  hideModalShowThird = () => {
    this.setState({show:false})
    this.setState({show2:false})
    this.setState({show3:true})
  }

  hideSecondModal = () => {
    this.setState({show2:false})
  }

  hideThirdModal = () => {
    this.setState({show3:false})
  }

  deletePlant = () => {
    fetch(process.env.REACT_APP_SERVER_URL + 'greenhouse/plants/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.props.plant._id,
      })
    })
    .then(response => {

      if (response.status === 202) {
        console.log('le plant has been deleted!')
        this.setState({show3:false})
        this.props.rerenderShelfCallback(this.props.plant)
      }
      else {
        console.log("uh oh... something went wrong deleting: " + response)
      }
    }).catch(err => console.log('error deleting' + err))
  }

  setReminder = async () => {
    await this.setState({reminder:"True"})

      fetch(process.env.REACT_APP_SERVER_URL + 'greenhouse/plants/reminder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reminder: this.state.reminder,
          _id: this.props.plant._id
        })
      })
      .then((response) => {
        console.log(response.status)
        if (response.status === 200) {
          this.setState({show2:false})
        }
      })
      .catch(err => console.log("error parsing response :'(" + err))
  }


  render() {

    console.log('name is' + this.props.plant.assigned_name)

    return(
      <div>
        <div onClick={() => this.showModal()} class="base">
          <div class="flowerpot"></div>
          <div class="stem"></div>
          <div class="center"></div>
          <div class="center2"></div>
          <div class="petal"></div>
          <div class="petal-s"></div>
          <div class="petal2"></div>
          <div class="petal2-s"></div>
          <div class="petal3"></div>
          <div class="petal3-s"></div>
          <div class="petal4"></div>
          <div class="petal5"></div>
          <div class="petal5-s"></div>
          <div class="petal6-s"></div>
          <div class="petal7"></div>
          <div class="petal6"></div>
          <div class="petal7-s"></div>
          <div class="petal8"></div>
          <div class="petal8-s"></div>
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
            <h6 class="underline">Watering Frequency (Days):</h6> <p class="val">{this.props.plant.plant_data.watering_frequency}</p>
            <h6 class="underline">Watering Amount:</h6> <p class="val">{this.props.plant.plant_data.watering_amount}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button className="delete float-left mr-auto" onClick={this.hideModalShowThird}>
              Delete Plant
            </Button>
            <Button className="secondary" onClick={this.hideModal}>
              Close
            </Button>
            <Button className="water" onClick={this.hideModalShowSecond}>
              <img alt="raindrop" className="raindrop" src={raindrop} />
            </Button>
          </Modal.Footer>
        </Modal>

        {this.state.reminder ?

        <Modal show={this.state.show2} onHide={this.hideSecondModal}>
          <Modal.Header closeButton>
            <Modal.Title class="modal-t">
              {this.props.plant.assigned_name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body class="modal-b">
            <p>you have a reminder set...do you want to remove reminder?</p>
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

        :

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

      }


      <Modal show={this.state.show3} onHide={this.hideThirdModal}>
        <Modal.Header closeButton>
          <Modal.Title class="modal-t">
            {this.props.plant.assigned_name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body class="modal-b">
          <p>are you sure you want to delete?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="secondary" onClick={this.hideThirdModal}>
            Nah
          </Button>
          <Button className="primary" onClick={this.deletePlant}>
            Yep
          </Button>
        </Modal.Footer>
      </Modal>

    </div>

    )
  }
}

export default Succulent
