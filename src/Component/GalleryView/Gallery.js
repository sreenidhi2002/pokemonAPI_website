import React from 'react'
import axios from 'axios';
import PropTypes from 'prop-types';
import '../../App.css'
import { Link } from 'react-router-dom';


class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            type: null,
        }
    }

    handleTypeClicker = (type) => {
        this.setState({
            type: type
        })
    }

    componentDidMount() {
        if (this.state.data === null) {
            axios.get('https://pokeapi.co/api/v2/pokemon?limit=858')
            .then(response => {
                let results = response.data.results
                let data = []
                for (let i = 0; i < results.length; i++) {
                    let url = results[i].url
                    data.push({
                        'name': results[i].name,
                        'index': i+1,
                        'url': url,
                        'type': null,
                        'spriteUrl': null
                    })
                }
                for (let i = 0; i < data.length; i++) {
                    axios.get(data[i].url).then(
                        response=>{
                            data[i].type = response.data.types[0].type.name
                            data[i].spriteUrl = response.data.sprites.front_default
                            this.setState({ data: data})
                        }
                    )
                }
                });
        }
    }


    getTypeData = (type) => {
        if (this.state.type === "All") {
            return this.state.data;
        } else if (this.state.type === "bug" || this.state.type === "dark" 
            || this.state.type === "dragon" || this.state.type === "electric"
            || this.state.type === "fairy" || this.state.type === "fighting"
            || this.state.type === "fire" || this.state.type === "flying"
            || this.state.type === "ghost" || this.state.type === "grass"
            || this.state.type === "ground" || this.state.type === "ice"
            || this.state.type === "normal" || this.state.type === "poison"
            || this.state.type === "psychic" || this.state.type === "rock"
            || this.state.type === "steel" || this.state.type === "water"
        ) {
            let typeData = []
            for (let i = 0; i < this.state.data.length; i++) {
                if (this.state.data[i].type === this.state.type) {
                    typeData.push(this.state.data[i])
                }
            }
            return typeData
        }
    }

    displayView = (type) => {
        let data = this.getTypeData(this.state.type);
        var newData = []
        if (data) {
            for (let i = 0; i < data.length; i++) {
                newData.push(
                    <div className='overall'>
                        <div className='pkmnContainer'>
                            <Link className = "galleryPkmn" to = {"/detail/" + String(data[i].index)}>
                                <div className = "galleryPkmnText">{data[i].index}</div>
                                <img src = {data[i].spriteUrl} className = "galleryPkmnImg" alt = "pic" />
                                <div className = "galleryPkmnText">{data[i].name}</div>
                                <div className = "galleryPkmnText">{data[i].type}</div>
                            </Link>
                            <div></div>
                        </div>
                    </div>
                )
            }
            return (
                <div className='pkmnContains'>
                    {newData}
                </div>
            )
        }

    }


    render() {
        return (
            <div className = "GalleryViewMain">
                <div className='GalleryTitle'>
                    Choose an option from the types listed below to view the Pokemon!
                </div>
                <div className = "buttonList">
                    <button className = "PkmnTypeButton" onClick = {()=>{this.handleTypeClicker("All")}}>All</button>

                    <button className = "PkmnTypeButton" onClick = {()=>{this.handleTypeClicker("bug")}}>Bug</button>

                    <button className = "PkmnTypeButton" onClick = {()=>{this.handleTypeClicker("dark")}}>Dark</button>
                    <button className = "PkmnTypeButton" onClick = {()=>{this.handleTypeClicker("dragon")}}>Dragon</button>

                    <button className = "PkmnTypeButton" onClick = {()=>{this.handleTypeClicker("electric")}}>Electric</button>

                    <button className = "PkmnTypeButton" onClick = {()=>{this.handleTypeClicker("fairy")}}>Fairy</button>
                    <button className = "PkmnTypeButton" onClick = {()=>{this.handleTypeClicker("fighting")}}>Fighting</button>
                    <button className = "PkmnTypeButton" onClick = {()=>{this.handleTypeClicker("fire")}}>Fire</button>
                    <button className = "PkmnTypeButton" onClick = {()=>{this.handleTypeClicker("flying")}}>Flying</button>

                    <button className = "PkmnTypeButton" onClick = {()=>{this.handleTypeClicker("ghost")}}>Ghost</button>
                    <button className = "PkmnTypeButton" onClick = {()=>{this.handleTypeClicker("grass")}}>Grass</button>
                    <button className = "PkmnTypeButton" onClick = {()=>{this.handleTypeClicker("ground")}}>Ground</button>

                    <button className = "PkmnTypeButton" onClick = {()=>{this.handleTypeClicker("ice")}}>Ice</button>

                    <button className = "PkmnTypeButton" onClick = {()=>{this.handleTypeClicker("normal")}}>Normal</button>

                    <button className = "PkmnTypeButton" onClick = {()=>{this.handleTypeClicker("poison")}}>Poison</button>
                    <button className = "PkmnTypeButton" onClick = {()=>{this.handleTypeClicker("psychic")}}>Psychic</button>

                    <button className = "PkmnTypeButton" onClick = {()=>{this.handleTypeClicker("rock")}}>Rock</button>
                    
                    <button className = "PkmnTypeButton" onClick = {()=>{this.handleTypeClicker("steel")}}>Steel</button>

                    <button className = "PkmnTypeButton" onClick = {()=>{this.handleTypeClicker("water")}}>Water</button>


                </div>
                {this.displayView(this.state.type)}
            </div>
        );
    }
}

Gallery.propTypes = {
    data: PropTypes.array,
    type: PropTypes.string
  }

export default Gallery;