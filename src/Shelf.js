import React from 'react'
import './Shelf.css';
import Succulent from './Succulent.js'
// import Leafy from './Leafy.js'
import Flower from './Flower.js'

class Shelf extends React.Component {

  constructor(props){
    super(props);
    this.state={
      show: false
    }
  }

  render() {

    const shelf_plants = this.props.plants
    const rendered_plants = []

    for (const index in shelf_plants){
      const plant = shelf_plants[index]

      console.log("looking at plant in shelf for loop" + plant)

      if(plant.plant_data.plant_type === "Flower"){
        console.log("Got a fern!")

        rendered_plants.push(
          <div class="bottom_stats_data_secs"><Flower plant={plant}/></div>
        )
      } else if(plant.plant_data.plant_type === "Succulent"){
        console.log("succulent!" + plant.assigned_name)

        rendered_plants.push(
          <div class="bottom_stats_data_secs"><Succulent plant={plant}/></div>
        )
      } else {
        console.log("unrecognized plant type: ", this.plant_data.plant_type)
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
