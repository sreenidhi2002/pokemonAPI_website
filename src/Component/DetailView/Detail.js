import React, { Component } from 'react';
import axios from 'axios'
import {useParams} from 'react-router-dom';
import {useState} from 'react';
import { Link } from "react-router-dom"


// class Detail extends Component {
//     render() {
//         return (
//             <h1> Detailed OLD </h1>
//         ) 
//     }

// }

// function Detail() {
//     const poke_id = useParams()
//         return (
//             <h1> Detailed view {poke_id} </h1>
//         )
// }

// export default Detail;

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
        
        <h1 className='detailTitle'> {data_a.name} </h1>
  
        <div className="prev_next_buttons prev" id="previous_btn">
          <Link className="linkContent" to={last_pkmn}> &#8592; </Link>
        </div>
  
        <div className="prev_next_buttons next" id="next_btn">
          <Link className="linkContent" to={next_pkmn}> &#8594; </Link>
        </div>
        
        <div></div>
        <div className='pkmncard'>
        <h3> Pokemon ID: {data_a.id} </h3>
        
        <div className='detailImg'>
            <img alt="Front" src = {pkmn_front} className="pokemon_picture"/>
            <img alt="Back" src = {pkmn_back} className="pokemon_picture"/>
        </div>
  
        <h4> Type: {data_types} </h4>
        
        <div className='columnDetail'> 
            <div className='generalinfo'> Height: {data_a.height} </div>
            <div className='generalinfo'> Weight: {data_a.weight} </div>
        </div>
        
        <div className='columnDetail'> 
            <div className='generalinfo'> Health: {data_hp} HP </div>
            <div className='generalinfo'> Speed: {data_speed} </div>
        </div>

        <div className='columnDetail'> 
            <div className='generalinfo'> Attack: {data_atk} </div>
            <div className='generalinfo'> Defense: {data_def} </div>
        </div>

        <div className='columnDetail'>
            <div className='generalinfo'> Special Attack: {data_special_atk} </div>
            <div className='generalinfo'> Special Defense: {data_special_def} </div>    
        </div>
        
        </div>


      </div>
    );
  }

  export default DetailTest;