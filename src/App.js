import PropTypes from 'prop-types';
import './App.css'

import React from 'react';
import { Component } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

import Search from './Component/SearchView/Search.js';
import Gallery from './Component/GalleryView/Gallery.js';
import DetailTest from './Component/DetailView/Detail.js';

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
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className='navtop'>
        <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg" className="picture_main" alt='Pokedex logo'></img>
        <div className='navtopHeading'>Pokedex Entries</div>
        </div>
          <div className='NavButton'>
            <Link to="/">Search</Link>
            <Link to="/gallery">Gallery</Link>
          </div>
        <Routes>
          <Route path="/gallery" element={<Gallery data = {this.state.data}/>}/>
          <Route path="/" element={<Search data = {this.state.data}/>}/>
          <Route path="/detail/:id" element={<DetailTest data = {this.state.data}/>}/>
        </Routes>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  get: PropTypes.number,
  data: PropTypes.array
}

export default App;
