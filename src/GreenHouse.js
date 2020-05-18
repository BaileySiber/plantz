import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import './GreenHouse.css';
import Shelf from './Shelf.js';

class GreenHouse extends React.Component {

  constructor(props){
    super(props);
    this.state={
      user_email: this.props.location.state.user_email
    }
  }

  showModal = () => {
    this.setState({show: true})
  }

  hideModal = () => {
    this.setState({show:false})
  }

  componentDidMount = () => {
    this.getPlants()
  }

  getPlants = () => {
    console.log("getting ze plants")
    fetch('http://localhost:3001/greenhouse/plants/' + this.state.user_email, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (response.status === 200) {
        console.log('le plants have been found!')

        response.json().then(response => {
          console.log("we got dem plantz")
          this.setState({plants: response})
        }).catch(err => {
          console.log("error parsing response :'(" + err)
        })
      }else {
        console.log("uh oh... something went wrong: " + response)
      }
    }).catch(err => {
      console.log('error saving message' + err)
    })
  }

  addPlant = () => {
    console.log("adding a new plant!")
    fetch('http://localhost:3001/greenhouse/plants/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_email: this.state.user_email,
        common_name: "fern",
        scientific_name: "fernulicious fernucosis",
        assigned_name: "my buddy the fern",
        plant_type: "leafy",
        description: "My favorite fern in the whole wide world",
        watering_frequency: "once/week",
        watering_amount: "~ 1.5 teapots"
      })
    })
    .then(response => {

      if (response.status === 201) {
        console.log('your plant has been added to our sacred list')

        response.json().then(response => {
          console.log("we got dem plantz")
          console.log(response.message)
          this.setState({show:false})
          this.getPlants()
        }).catch(err => {
          console.log("error parsing response :'(" + err)
        })
      }else {
        console.log("uh oh... something went wrong: " + response)
      }
    }).catch(err => {
      console.log('error saving message' + err)
    })
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

        <Shelf plants = {this.state.plants} />

      </div>
    )
  }
}

export default GreenHouse
