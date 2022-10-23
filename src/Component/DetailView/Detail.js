import React, { Component } from 'react';
import axios from 'axios'
import PropTypes from 'prop-types';
import {HashRouter, Route, Routes, useParams} from 'react-router-dom';



class Detail extends Component {
    render() {
        return (
            <h1> Detailed OLD </h1>
        ) 
    }

}

// function Detail() {
//     const poke_id = useParams()
//         return (
//             <h1> Detailed view {poke_id} </h1>
//         )
// }

export default Detail;
