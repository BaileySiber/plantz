import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import './GreenHouse.css';
import Shelf from './Shelf.js';

class GreenHouse extends React.Component {

  constructor(props){
    super(props);
    this.state={
      user_email: this.props.location.state.user_email,
      assigned_name:'',
      common_name: '',
      plant_list:[]
    }
  }

  onAssignedNameChange = (event) => {
    this.setState({
      assigned_name: event.target.value
    })
  }

  showModal = () => {
    this.setState({show: true})
  }

  hideModal = () => {
    this.setState({show:false})
  }

  componentDidMount = () => {
    this.getPlants()
    this.getPlantList()
  }

  handleOnSearch = (string, cached) => {
    // onSearch returns the string searched and if
    // the values are cached. If the values are cached
    // "cached" contains the cached values, if not, returns false
    console.log(string, cached);
  }

  handleOnSelect = item => {
    // the item selected
    console.log("plant was selected!" + item.name);
    this.setState({common_name: item.name})
  }

  handleOnFocus = () => {
    console.log("Focused");
  }

  getPlantList = () => {
    console.log("getting plant list")
    fetch('http://localhost:3001/greenhouse/plants/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if(response.status === 200){
        console.log('plant data list obtained!')
        response.json().then(response => {
          console.log('have the plant data')
          console.log(response[0])
          this.setState({plant_list: response})
        })
      }
    })

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

    console.log('in add plant')

    if(this.state.common_name == 0){
      alert('Please fill in name!')
      return
    }

    if(this.state.assigned_name == 0){
      alert('Please fill in assigned name')
      return
    }

    const plantList = this.state.plant_list
    const plantAdd = []

    for (const index in plantList){
      console.log('inside of plant list loop')
      const plant = plantList[index]
      console.log(plant)
      if(plant.name === this.state.common_name){
        plantAdd.push(plant)

        console.log("adding a new plant!")
        fetch('http://localhost:3001/greenhouse/plants/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_email: this.state.user_email,
            assigned_name: this.state.assigned_name,
            plant_data: plant
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
    }
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
              Add a new plant to your collection!
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formCommonName">
                <Form.Label>Common Plant Name</Form.Label>
                <ReactSearchAutocomplete
                  items={this.state.plant_list}
                  onSearch={this.handleOnSearch}
                  onSelect={this.handleOnSelect}
                  onFocus={this.handleOnFocus}
                  placeholder="Start typing..."
                  autoFocus
                />
              </Form.Group>
              <Form.Group controlId="formAssignedName">
                <Form.Label>Your Plant's Name</Form.Label>
                <Form.Control type="input" onChange={this.onAssignedNameChange} placeholder="Ex: Lil Donk" />
                <Form.Text className="text-muted">
                  Naming your plant just adds to the fun :)
                </Form.Text>
              </Form.Group>
            </Form>
          </Modal.Body>
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
