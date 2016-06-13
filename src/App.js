import React, { Component } from 'react';

export default class App extends Component {

  componentDidMount() {
    // Example of data fetching from server
    fetch('data.json')
      .then((httpResponse) => httpResponse.json())
      .then((data) => console.log(data));
  }
  
  render() {
    return (
      <div className="main">
        <h1 className="hello">Welcome to Strikersoft!</h1>
        <img src="images/strikersoft.svg" />
      </div>
    );
  }
}
