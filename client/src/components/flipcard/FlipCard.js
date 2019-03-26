import React, { Component } from "react";
import "./FlipCard.css";
import API from "../../utils/API";

class FlipCard extends Component {
  state = {
    numOne: 0,
    numTwo: 0,
    isError: false,
    answer: 0,
    answers: [],
    riddles: [],
    flipFront: false,
    flipBack: false,
    riddleCount: 0,
    operation: this.props.operation
  };

  componentWillMount() {
    // Create question
    // this.getQuestion();
  }

  componentDidMount() {
    // Get the riddles from mongo database
    API.getRiddles()
      .then(res => {
        let tempriddles = [...res.data];
        tempriddles.slice(this.shuffleArray(tempriddles));

        this.setState({ riddles: [...tempriddles] });
      })
      .catch(error => {
        console.log(error);
        this.setState({ isError: true });
      });
    // Populate answers
    this.populateAnswer();
  }

  //   This populates the math question and multiple choice answer
  populateAnswer = () => {
    let ansArr = [];
    let answer = 0;
    let counter = 0;
    let num1 = this.getRandomNumber();
    let num2 = this.getRandomNumber();

    if (num1 > num2) {
      this.setState({ numOne: num1 });
      this.setState({ numTwo: num2 });
    } else {
      this.setState({ numOne: num2 });
      this.setState({ numTwo: num1 });
    }

    if (this.state.operation === "ADD") {
      this.setState({ answer: num1 + num2 });
      ansArr.push(num1 + num2);
    } else if (this.state.operation === "SUB") {
      let tot = 0;
      if (num1 > num2) {
        tot = num1 - num2;
        ansArr.push(tot);
      } else {
        tot = num2 - num1;
        ansArr.push(tot);
      }
      this.setState({ answer: tot });
    }

    while (counter <= 2) {
      answer = this.getRandomNumber();
      if (!ansArr.includes(answer)) {
        ansArr.push(answer);
        counter += 1;
      }
    }

    ansArr.slice(this.shuffleArray(ansArr));

    this.setState({ answers: ansArr.slice() });
  };

  // getQuestion = () => {
  //   let number1 = this.getRandomNumber();
  //   let number2 = this.getRandomNumber();
  //   if (number1 > number2) {
  //     this.setState({ numOne: number1 });
  //     this.setState({ numTwo: number2 });
  //   } else {
  //     this.setState({ numOne: number2 });
  //     this.setState({ numTwo: number1 });
  //   }
  // };

  getRandomNumber = () => {
    let num = Math.floor(Math.random() * 10 + 1);
    return num;
  };

  handleButtonClick = e => {
    if (e.target.value == this.state.answer) {
      this.setState({ flipFront: true });
      this.setState({ flipBack: true });
    } else {
      // alert("Wrong answer.....");
    }
  };

  handleButtonOk = e => {
    this.setState({ flipFront: false });
    this.setState({ flipBack: false });
  };

  // Get next riddle and math question
  handleButtonNext = e => {
    if (this.state.riddleCount < this.state.riddles.length - 1) {
      let num = this.state.riddleCount + 1;
      this.setState({ riddleCount: num });
    } else {
      this.setState({ riddleCount: 0 });
    }

    this.populateAnswer();
  };

  // Shuffle the array
  shuffleArray = arr => {
    for (let i = arr.length - 1; i > 1; i--) {
      let m = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[m]] = [arr[m], arr[i]];
    }
    return arr;
  };

  render() {
    return (
      <div className="card middle">
        <div
          id="flipcardFront"
          className={"front " + (this.state.flipFront ? "flipfront " : "")}
        >
          <div className="bgimage" />
          <div className="">
            <h2 className="cardtitle">
              Answer the math question to get the answer to the riddle
            </h2>

            {this.state.riddles.length ? (
              <p className="riddle">
                {this.state.riddles[this.state.riddleCount].Field_1}
              </p>
            ) : (
              <p className="riddle">No data to display</p>
            )}
          </div>
          <div className="addition">
            {this.state.operation === "ADD" ? (
              <h1>
                {this.state.numOne} + {this.state.numTwo} = ?
              </h1>
            ) : (
              <h1>
                {this.state.numOne} - {this.state.numTwo} = ?
              </h1>
            )}
          </div>
          <div className="multiplechoice">
            <button
              type="button"
              className="roundbutton"
              name="btnOne"
              value={this.state.answers[0]}
              onClick={this.handleButtonClick}
            >
              {this.state.answers[0]}
            </button>
            <button
              type="button"
              className="roundbutton"
              name="btnTwo"
              value={this.state.answers[1]}
              onClick={this.handleButtonClick}
            >
              {this.state.answers[1]}
            </button>
            <button
              className="roundbutton"
              type="button"
              name="btnThree"
              value={this.state.answers[2]}
              onClick={this.handleButtonClick}
            >
              {this.state.answers[2]}
            </button>
            <button
              className="roundbutton"
              type="button"
              name="btnFour"
              value={this.state.answers[3]}
              onClick={this.handleButtonClick}
            >
              {this.state.answers[3]}
            </button>
          </div>

          <button
            className="ovalbutton"
            type="button"
            name="btnNext"
            onClick={this.handleButtonNext}
          >
            Next Question
          </button>
        </div>
        <div className={"back " + (this.state.flipBack ? "flipback " : "")}>
          <div className="backcontent card-img-back">
            {this.state.riddles.length ? (
              <p className="back-content">
                {this.state.riddles[this.state.riddleCount].Field_2}
              </p>
            ) : (
              <p className="back-content">No data to display</p>
            )}
            <button
              className="ovalbutton"
              type="button"
              name="btnOk"
              onClick={this.handleButtonOk}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default FlipCard;
