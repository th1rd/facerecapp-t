import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import './App.css';

const app = new Clarifai.App({
  apiKey: '6e58f73ae8a74802b5ff45e0cd074730'
});

// c0c0ac362b03416da06ab3fa36fb58e3

const particlesOptions = {
    particles: {
      number: {
        value: 30,
        density: {
          enable: true,
          value_area: 200                  
        }
      }
    }
  }
class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
    }
  }

  
   onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () =>{
    this.setState({imageUrl: this.state.input})
      app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input)
      .then(
      function(response) {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      },
      function(err) {
        // body...
      }
    );
  }

 
  render() {
    return (
    <div className="App">
        <Particles className='particles' 
                params={particlesOptions} 
        />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm 
        onInputChange={this.onInputChange} 
        onButtonSubmit={this.onButtonSubmit} 
      />
      <FaceRecognition imageUrl={this.state.imageUrl} />
    </div>
  );
}}

export default App;
