import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import * as ReactBootstrap from 'react-bootstrap';
import { ButtonToolbar } from "react-bootstrap";

class Box extends React.Component {
  selectBox = () => {
    this.props.selectBox(this.props.row, this.props.col);
  };
  render() {
    return (
      <div
        className={this.props.boxContainer}
        id={this.props.id}
        onClick={this.selectBox}
      />
    );
  }
}
class Grid extends React.Component {
  render() {
    const width = this.props.cols * 16;
    var rowsArr = [];

    var boxContainer = "";
    for (var i = 0; i < this.props.rows; i++) {
      for (var j = 0; j < this.props.cols; j++) {
        // you can do this with .map as well
        let containerId = i + "_" + j;

        boxContainer = this.props.gridFull[i][j] ? "box on" : "box off"; // classes from CSS to see if boxes are on or off
        rowsArr.push(
          <Box
            boxContainer={boxContainer}
            key={containerId}
            containerId={containerId}
            row={i}
            col={j}
            // this method through two components
            selectBox={this.props.selectBox} 
          />
        );
      }
    }
    return (
      <div className="grid" style={{ width: width }}>
        {rowsArr}
      </div>
    );
  }
}
class Buttons extends React.Component {
  handleSelect = (e) => {
    this.props.gridSize(e) 
  }
  render() {
    return (
      <div className="center">
        <ButtonToolbar>
          <button className="btn" onClick={this.props.startBtn}>
            Start
          </button>
          <button className="btn" onClick={this.props.stopBtn}>
            Stop
          </button>
          <button className="btn" onClick={this.props.clear}>
            Clear
          </button>
          <button className="btn" onClick={this.props.slow}>
            Slow
          </button>
          <button className="btn" onClick={this.props.fast}>
            Fast
          </button>
          <button className="btn" onClick={this.props.seed}>
            Seed
          </button>
          
        </ButtonToolbar>
      </div>
    );
  }
}

class Main extends React.Component {
  constructor() {
    super();
    this.speed = 100;
    this.rows = 30;
    this.cols = 50;

    this.state = {
      generation: 0,
      gridFull: Array(this.rows)
        .fill()
        .map(() => Array(this.cols).fill(false)),
    };
  }

  selectBox = (row, col) => {
    let gridCopy = arrayClone(this.state.gridFull);
    gridCopy[row][col] = !gridCopy[row][col]; 
    this.setState({
      gridFull: gridCopy,
    });
  };

  seed = () => {
    // random generated squares when game starts
    let gridCopy = arrayClone(this.state.gridFull);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (Math.floor(Math.random() * 4) === 1) {
          gridCopy[i][j] = true;
        }
      }
    }
    this.setState({
      gridFull: gridCopy,
    });
  };
  startBtn = () => {
    clearInterval(this.intervalId);
    // will create each generation on start button
    this.intervalId = setInterval(this.start, this.speed); 
  };

  stopBtn = () => {
    clearInterval(this.intervalId);
  };

  slow = () => {
    this.speed = 1000;
    this.startBtn();
  }

  fast = () => {
    this.speed = 100;
    this.startBtn();
  }

  clear = () => {
    var grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false)); // sets back to org array
    this.setState({
      gridFull: grid,
      generation: 0
    })
  }
  start = () => {
    // main function 
    let move = this.state.gridFull;
    // this will start changing the squares, check what grid is currently like

    let moves2 = arrayClone(this.state.gridFull); 
   //Rules
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        // every elements in the grid
        // count is how many neighbors it has
        let count = 0; 
        // if there is a neighbor, we increase by one.
        // each cell has 8 potential neighbors, 
        //you can see, there are 8 lines increasing the count
        if (i > 0) if (move[i - 1][j]) count++;
        if (i > 0 && j > 0) if (move[i - 1][j - 1]) count++;
        if (i > 0 && j < this.cols - 1) if (move[i - 1][j + 1]) count++;
        if (j < this.cols - 1) if (move[i][j + 1]) count++;
        if (j > 0) if (move[i][j - 1]) count++;
        if (i < this.rows - 1) if (move[i + 1][j]) count++;
        if (i < this.rows - 1 && j > 0) if (move[i + 1][j - 1]) count++;
        if (i < this.rows - 1 && this.cols - 1) if (move[i + 1][j + 1]) count++;
        // decide whether it will live or die
        // if it's dead and it has three neighbors, it becomes a live cell
        if (move[i][j] && (count < 2 || count > 3)) moves2[i][j] = false; 
        // if there is less than two or more than three, it dies
        if (!move[i][j] && count === 3) moves2[i][j] = true; 
      }
    }
    this.setState({
      gridFull: moves2,
      // we increment the generation
      generation: this.state.generation + 1, 
    });
  };

  componentDidMount() {
    this.seed();
    
  }

  render() {
    return (
      <div>
        <h1 className="title">Conways Game of Life</h1>
       
        
        <Grid
        // from our state
         // props from Grid
          gridFull={this.state.gridFull} 
          rows={this.rows}
          cols={this.cols}
          selectBox={this.selectBox}
        />
        <h2>Current Generation: {this.state.generation}</h2>
         <Buttons
          startBtn={this.startBtn}
          stopBtn={this.stopBtn}
          slow={this.slow}
          fast={this.fast}
          clear={this.clear}
          seed={this.seed}
          gridSize={this.gridSize}
        />
        
      </div>
    );
  }
}

function arrayClone(arr) {
  // This is a helper function to clone arrays to avoid changing state
  return JSON.parse(JSON.stringify(arr)); 
}

ReactDOM.render(<Main />, document.getElementById("root"));