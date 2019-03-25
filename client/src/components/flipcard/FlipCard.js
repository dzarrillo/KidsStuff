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
    riddleCount: 0
  };

  //   Populate the math question
  componentWillMount() {
    // Create question
    // this.getQuestion();
  }

  componentDidMount() {
     // Create question
    //  this.getQuestion();
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

  //   This populates the multiple choice answer
  populateAnswer = () => {
    let ansArr = [];
    let answer = 0;
    let counter = 0;
    let num1 = this.getRandomNumber();
    let num2 = this.getRandomNumber();

    this.setState({ numOne: num1 });
    this.setState({ numTwo: num2 });

    ansArr.push(num1 + num2);
    while (counter <= 2) {
      answer = this.getRandomNumber();
      if (!ansArr.includes(answer)) {
        ansArr.push(answer);
        counter += 1;
      }
    }
    
    ansArr.map( num => {
      console.log("Before shuffle" + num);
    })
    ansArr.slice(this.shuffleArray(ansArr));
    // ansArr = [...this.shuffleArray(ansArr)];

    this.setState({ answers: ansArr.slice() });
    // this.setState({answers: [...ansArr]});

    this.setState({ answer: num1 + num2 });
  };

  getQuestion = () => {
    this.setState({ numOne: this.getRandomNumber() });
    this.setState({ numTwo: this.getRandomNumber() });
  };

  getRandomNumber = () => {
    let num = Math.floor(Math.random() * 10 + 1);
    // console.log(num);
    return num;
  };

  handleButtonClick = e => {
    // alert("button clicked: " + e.target.name);
    if (e.target.value == this.state.answer) {
      // alert("Awsome!!!!!!");
      this.setState({ flipFront: true });
      this.setState({ flipBack: true });
    } else {
      alert("Wrong answer.....");
    }
  };

  handleButtonOk = e => {
    this.setState({ flipFront: false });
    this.setState({ flipBack: false });
    
    if(this.state.riddleCount < (this.state.riddles.length - 1) ){
      let num = this.state.riddleCount + 1;
      this.setState({riddleCount: num});
    } else {
      this.setState({riddleCount: 0}); 
    }

   
    // this.getQuestion();
    // this.populateAnswer();
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
        {/* <div id="flipcardFront" className="front"> */}
        <div
          id="flipcardFront"
          className={"front " + (this.state.flipFront ? "flipfront " : "")}
        >
          <div className="bgimage" />
          <div className="">
            <h2 className="cardtitle">Answer the math question to get the answer to the riddle</h2>
           
            {this.state.riddles.length ? (
              <p className="riddle">{this.state.riddles[this.state.riddleCount].Field_1}</p>
            ) : (
              <p className="riddle">No data to display</p>
            )}
          </div>
          <div className="addition">
            <h1>
              {this.state.numOne} + {this.state.numTwo} = ?
            </h1>
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
        </div>
        {/* <div className="back"> */}
        <div className={"back " + (this.state.flipBack ? "flipback " : "")}>
          <div className="backcontent card-img-back">
            {/* <h6 className="backtitle" >Answer to Riddle</h6> */}
            {this.state.riddles.length ? (
              <p className="back-content">{this.state.riddles[this.state.riddleCount].Field_2}</p>
              // <p>{this.state.riddles[0].Field_2}</p>
            ) : (
              <p className="back-content">No data to display</p>
            )}
            <button className="roundbutton" type="button" name="btnOk" onClick={this.handleButtonOk}>
              OK
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default FlipCard;
