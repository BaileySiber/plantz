import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import './Shelf.css';
import Succulent from './Succulent.js'
import Leafy from './Leafy.js'

class Shelf extends React.Component {

  constructor(props){
    super(props);
    this.state={
      show: false,
    }
  }

  render() {
    const shelf_plants = this.props.plants
    const rendered_plants = []

    for (const index in shelf_plants){
      const plant = shelf_plants[index]

      console.log(plant)

      if(plant.common_name === "fern"){
        console.log("Got a fern!")

        rendered_plants.push(
          <div class="bottom_stats_data_secs"><Leafy /></div>
        )
      }
      else if(plant.common_name === "succulent"){
        console.log("Not a fern. don't care bout you")

        rendered_plants.push(
          <div class="bottom_stats_data_secs"><Succulent /></div>
        )
      }
    }

    return(

      <div>
        <div class="bottom_stats">
            <div class="bottom_stats_data">
              {rendered_plants}
            </div>
            <div class="bottom_stats_table">
              <div class="bottom_stats_table_top"></div>
              <div class="bottom_stats_table_border"></div>
              <div class="bottom_stats_table_shadow"></div>
              <div class="bottom_stats_table_bottom"></div>
            </div>
          </div>
      </div>
    )
  }
}

export default Shelf
