import React, { Component } from 'react';
import './App.css';
// import FlipCardThreeD from "./components/flipcardthreed/FlipCardThreeD";
import FlipCard from "./components/flipcard/FlipCard";
import FlipTest from "./components/fliptest/FlipTest";


class App extends Component {
  
  
  render() {
    return (
      <div className="App">
        {/* <FlipTest></FlipTest> */}
        <FlipCard></FlipCard>
      </div>
    );
  }
}

export default App;
