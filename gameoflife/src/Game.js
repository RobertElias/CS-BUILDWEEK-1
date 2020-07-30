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
    this.intervalId = setInterval(this.play, this.speed); // will create each generation on play button
  };

  stopBtn = () => {
    clearInterval(this.intervalId);
  };