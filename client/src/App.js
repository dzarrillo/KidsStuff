import React, { Component } from 'react';
import './App.css';
// import FlipCardThreeD from "./components/flipcardthreed/FlipCardThreeD";
import FlipCard from "./components/flipcard/FlipCard";
import FlipTest from "./components/fliptest/FlipTest";


class App extends Component {
  
  
  render() {
    return (
      <div className="App">
        <main className="main">
          <section>
            <FlipCard operation={"ADD"}></FlipCard>
          </section>
          <section>
            <FlipCard operation={"SUB"}></FlipCard>
          </section>
        </main>
                
      </div>
    );
  }
}

export default App;
