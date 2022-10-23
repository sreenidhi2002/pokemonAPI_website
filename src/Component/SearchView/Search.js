import React from 'react'
import axios from 'axios'
import '../../App.css'
import PropTypes from 'prop-types';
import {
    Link
  } from "react-router-dom"


  class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: 'none',
            data: props.data,
            sort: 'Name',
            orderedBy: 'ascending',
        }
    }

    checkInputChange = (input) => {this.setState({search: input})}
    sortStyle = (sort_style) => {this.setState({sort: sort_style})}
    ascendingDescendingHandler = (sort_asc_desc) => {this.setState({orderedBy: sort_asc_desc})}

    componentDidMount() {
        if (this.state.data === null) {
            axios.get('https://pokeapi.co/api/v2/pokemon?limit=858')
            .then(response => {
                // Array with all responses
                let data = []
                for (let idx = 0; idx < response.data.results.length; idx++) {
                    data.push({
                        'name': response.data.results[idx].name,
                        'pkmn_url': response.data.results[idx].url,
                        'index': idx + 1,
                        'pkmn_type': "",
                        'spriteUrl': null
                    })
                }

                // For each response (each pokemon) set the type of pokemon and get the sprite to display
                for (let current = 0; current < data.length; current++) {
                    axios.get(data[current].pkmn_url).then(
                        response=>{
                            data[current].pkmn_type = response.data.types[0].type.name
                            data[current].spriteUrl = response.data.sprites.front_default
                            this.setState({data: data})
                        }
                    )
                }
            });
        }    
    }


    displayList = () => {
        if (this.state.data) {
            if (this.state.sort === "Index") {
                let results_found = []
                let pokemon_arr = JSON.parse(JSON.stringify(this.state.data))

                // Sort based on users selection of ascending or descending
                if (this.state.orderedBy === "ascending") {
                    pokemon_arr.sort((first, second) => {
                        return first.index > second.index ? 1 : -1
                    });
                }

                if (this.state.orderedBy === "descending") {
                    pokemon_arr.sort((first, second) => {
                        return first.index < second.index ? 1 : -1
                    });
                }


                for (let idx = 0; idx < pokemon_arr.length; idx++) {
                    // Check if the character(s) typed in match with the beginning of the pokemon's name
                    if (pokemon_arr[idx].name.startsWith(this.state.search)) {
                        results_found.push(
                            <div className='overall'>
                                <div className='pkmnContainer'>
                                    <Link className = "galleryPkmn" to = {"/detail/" + pokemon_arr[idx].index}>
                                    <img src = {pokemon_arr[idx].spriteUrl} className = "galleryPkmnImg" alt = "current_pkmn_picture" />

                                        <div className = "galleryPkmnText">{pokemon_arr[idx].name}</div>
                                        <div className = "galleryPkmnText">{pokemon_arr[idx].index}</div>
                                    </Link>
                                    <div></div>
                                </div>
                            </div>
                        )
                    }
                }
                return (
                    <div className = 'search_results'> {results_found} </div>
                )
            } else if (this.state.sort === "Name") {
                let pokemon_arr = JSON.parse(JSON.stringify(this.state.data))
                if (this.state.search.length === 0) {
                    return (<div className='suggestion'>Enter an input in the search bar to see results!</div>)
                }

                // Sort based on users selection of ascending or descending
                if (this.state.orderedBy === "ascending") {
                    pokemon_arr.sort((first, second) => {
                        return first.name > second.name ? 1 : -1
                    });
                }

                if (this.state.orderedBy === "descending") {
                    pokemon_arr.sort((first, second) => {
                        return first.name < second.name ? 1 : -1
                    });
                }

                var results_found = []
                for (let idx = 0; idx < pokemon_arr.length; idx++) {
                    if (pokemon_arr[idx].name.startsWith(this.state.search)) {
                        results_found.push(
                            <div className='overall'>
                            <div className='pkmnContainer'>
                            <Link className = "galleryPkmn" to = {"/detail/" + pokemon_arr[idx].index}>
                                <div className = "galleryPkmnText">{pokemon_arr[idx].name}</div>
                                <div className = "galleryPkmnText">{pokemon_arr[idx].index}</div>
                                <img src = {pokemon_arr[idx].spriteUrl} className = "galleryPkmnImg" alt = "current_pkmn_picture" />
                            </Link>
                            <div></div>
                            </div>
                        </div>
                        )
                    }
                }
                return (
                    <div className = 'search_results'> {results_found} </div>
                )
            } 
        }
    }

    render() {
        return (
            <div className='GalleryViewMain'>
                <div className='GalleryTitle'> Search for a particular pokemon by typing its name in the Searchbar, click on the Pokemon to find out more! </div>
                <div>
                    <input type = "text" className='searchbarfont' placeholder = "Put your input here" onChange={e => this.checkInputChange(e.target.value)}></input>
                </div>
                <div> 
                    <div></div>
                    <div className='GalleryTitle'> Sort by: </div>

                    <select className="dropdown" onChange = {e=>this.ascendingDescendingHandler(e.target.value)}>
                        <option value="ascending">Ascending </option>
                        <option value="descending">Descending</option>
                    </select>

                    <select className="dropdown" onChange = {e=>this.sortStyle(e.target.value)}>
                        <option value="Name">Pokemon Name</option>
                        <option value="Index">Pokemon Index</option>
                    </select>
                </div>
                {this.displayList()}   
            </div>
        );
    }
}

Search.propTypes = {
    data: PropTypes.array,
    search: PropTypes.string,
    sort: PropTypes.string,
    orderedBy: PropTypes.string
  }

export default Search;
