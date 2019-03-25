import React, { Component }  from "react";
import "./FlipTest.css";

class FlipTest extends Component {
    state = {
        flip: false,
        slide: false,
    };

    handleSlide = () =>{
        this.setState({slide: true});
        this.setState({flip: false});
    }

    handleFlip = () => {
        this.setState({flip: true});
        this.setState({slide: false});
    }

    render(){

        return(
            <div>
            <div>
                <div className={"box " + (this.state.slide ? "slide " : "") + (this.state.flip ? "flip " : "")}></div>
            </div>{/* Give some space */}
            <button onClick={(e)=>this.handleSlide(e)}>Slide</button>
            <button onClick={(e)=>this.handleFlip(e)}>Flip</button>

            </div>
        )
    }
}

export default FlipTest;