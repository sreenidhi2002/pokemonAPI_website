import logo from './logo.svg';
import PropTypes from 'prop-types';
import './App.css'

import axios from 'axios'
import React from 'react';
import {useEffect, useState} from 'react';
import { Component } from 'react';
import { render } from '@testing-library/react';
import {Button, List, Image, Input,  Container  } from "semantic-ui-react";
import { HashRouter, useParams, Link, Route, Switch, Routes } from 'react-router-dom'

import Search from './Component/SearchView/Search.js';
import Gallery from './Component/GalleryView/Gallery.js';
import Detail from './Component/DetailView/Detail.js';


function DetailTest() {

  // ID of the pokemon from the webpage link
  let { id } = useParams();

  // Left and right buttons
  let last_pkmn = null
  let next_pkmn = null

  let detail_view_path = "/detail/"
  if (id < 858) {
    next_pkmn = detail_view_path + String(parseInt(id) + 1)
  } else {
    next_pkmn = detail_view_path + String(1)
  }

  if (id > 1) {
    last_pkmn = detail_view_path + String(parseInt(id) - 1)
  } else {
    last_pkmn = detail_view_path + String(858)
  }

  let det_data = [];
  const [data_a, setData] = useState([]);
  const [data_types, setTypeData] = useState();
  const [data_hp, setHP] = useState();
  const [data_atk, setAtk] = useState();
  const [data_def, setDef] = useState();
  const [data_special_atk, setSpecialAtk] = useState();
  const [data_special_def, setSpecialDef] = useState();
  const [data_speed, setSpeed] = useState();

  const [pkmn_front, setFrontPicture] = useState();
  const [pkmn_back, setBackPicture] = useState();

    axios.get('https://pokeapi.co/api/v2/pokemon/' + id)
      .then(response => {
        //console.log("Get from server ", response.data)
        setData(response.data)
        setTypeData(response.data.types[0].type.name)
        setHP(response.data.stats[0].base_stat)
        setAtk(response.data.stats[1].base_stat)
        setDef(response.data.stats[2].base_stat)
        setSpecialAtk(response.data.stats[3].base_stat)
        setSpecialDef(response.data.stats[4].base_stat)
        setSpeed(response.data.stats[5].base_stat)
        setFrontPicture(response.data.sprites.front_default)
        setBackPicture(response.data.sprites.back_default)
        // console.log("BEFORE getting: ", response.data.stats[0].base_stat)
      }).catch(err => console.log(err)); 
    // console.log("After getting: ", data_hp)

  return (
    <div className='appdiv'>
      
      <h1> {data_a.name} </h1>

      <div className="prev_next_buttons prev" id="previous_btn">
        <Link className="linkContent" to={last_pkmn}> &#8592; </Link>
      </div>

      <div className="prev_next_buttons next" id="next_btn">
        <Link className="linkContent" to={next_pkmn}> &#8594; </Link>
      </div>


      <h3> Pokemon ID: {data_a.id} </h3>

      <img alt="Front" src = {pkmn_front} className="pokemon_picture"/>
      <img alt="Back" src = {pkmn_back} className="pokemon_picture"/>


      <h4> Type: {data_types} </h4>
      <h4> Height: {data_a.height} </h4>
      <h4> Weight: {data_a.weight} </h4>
      <h4> Health: {data_hp} HP </h4>
      <h4> Attack: {data_atk} </h4>
      <h4> Defense: {data_def} </h4>
      <h4> Special Attack: {data_special_atk} </h4>
      <h4> Special Defense: {data_special_def} </h4>
      <h4> Speed: {data_speed} </h4>



    </div>
  );
}
  

class App extends Component {
  constructor() {
    super();
    this.state = {
      get: 0,
      data: null
    }
  }

  render() {
    return (
      // Use of HashRouter and process.env.PUBLIC_URL as per instructions from TAs in Piazza Posts
      <HashRouter basename={process.env.PUBLIC_URL}>
        <div className='navtop'>
        <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg" class="picture_main"></img>
        <h1>Pokedex Entries</h1>
        </div>
          <div className='NavButton'>
            <Link to="/search">Search</Link>
            <Link to="/gallery">Gallery</Link>
          </div>
        <Routes>
          <Route path="/gallery" element={<Gallery data = {this.state.data}/>}/>
          <Route path="/search" element={<Search data = {this.state.data}/>}/>
          <Route path="/detail/:id" element={<DetailTest data = {this.state.data}/>}/>
        </Routes>
      </HashRouter>
    );
  }
}

App.propTypes = {
  get: PropTypes.number,
  data: PropTypes.array
}

export default App;
