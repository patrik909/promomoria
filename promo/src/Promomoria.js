import React, { Component } from 'react';
import './App.css';

class App extends Component {

  componentDidMount(){
    fetch('api/fetch')
      .then(res => res.text())
      .then(result => {
        console.log(result)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="Promomoria">
        <h1> This is Promomoria </h1>
      </div>
    );
  }
}

export default App;
