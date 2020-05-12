import React from 'react'
import './GreenHouse.css';

const GreenHouse = () => (
  <div>
    <p className="GreenHouse-title">
      Welcome to the Greenhouse!
    </p>
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

export default GreenHouse
