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

      }
    }).catch(err => {
      console.log('error saving message' + err)
    })

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

        <Shelf dataFromParent = {this.state.plants} />

      </div>
    )
  }
}

export default GreenHouse
