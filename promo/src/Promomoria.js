import React, { Component } from 'react';
import './App.css';
import Register from './Components/Register.js';

class App extends Component {

  componentDidMount(){
    // fetch('api/fetch')
    //   .then(res => res.json())
    //   .then(result => {
    //     console.log(result)
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }

  render() {
    return (
      <div className="Promomoria">
        <Register />
      </div>
    );
  }
}

export default App;
