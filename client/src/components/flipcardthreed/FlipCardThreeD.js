import React, { Component } from "react";
import "./FlipCardThreeD.css";

class FlipCardThreeD extends Component {
  state = {
    numOne: 0,
    numTwo: 0,
    answer: 0,
    answers: []
  }

  componentWillMount(){
    // Create question
    this.getQuestion();
  }

  componentDidMount() {
    // Populate answers
    this.populateAnswer();
  }

  populateAnswer = () => {
    let ansArr = [];
    let answer = 0;
    let counter = 0;
    this.setState({answer: this.state.numOne + this.state.numTwo});
    ansArr.push(this.state.numOne + this.state.numTwo);
    while(counter <= 2){
      answer = this.getRandomNumber();
      if(!ansArr.includes(answer)){
        ansArr.push(answer);
        counter += 1;
      } 
    }
    this.setState({ answers: ansArr.slice() })
  }

  getQuestion = () => {
    this.setState({ numOne: this.getRandomNumber() } );
    this.setState({ numTwo: this.getRandomNumber() } );
  }

  getRandomNumber = () => {
    let num = Math.floor((Math.random() * 10) + 1);
    console.log(num);
    return num;
  }
  handleButtonClick = () => {
    alert("button clicked");
  }
  render() {
    return (
      <div className="card">
        <div className="card__content">
          {/* Front */}
          <div className="card__front">
            <button className="card__button" type="button" name="btnOne" value="8" onClick={this.handleButtonClick}>
              {this.state.answers[0]}
            </button>
            <button type="button" name="btnTwo" value="8">
            {this.state.answers[1]}
            </button>
            <button type="button" name="btnThree" value="8">
            {this.state.answers[2]}
            </button>
            <button className="card__title"  type="button" name="btnFour" value="8">
              {this.state.answers[3]}
            </button>

            <h6 className="card__title"> {this.state.numOne} + {this.state.numTwo} = ?</h6>

            {/* <p className="card__subtitle">What is</p> */}
          </div>
          {/* Back */}
          <div className="card__back">
            <p className="card__body">
              This would be some longer text that gives a description of the
              things from the other side I guess
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default FlipCardThreeD;
