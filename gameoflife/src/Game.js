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
class Game extends React.Component {

  // create the constructor
  constructor() {
    super();
    this.rows = HEIGHT / CELL_SIZE;
    this.cols = WIDTH / CELL_SIZE;

    this.board = this.makeEmptyBoard();
}
  //state management
  state = {
    cells:[],
  }

  
  render () {
    return (
      <div>
        <div>
          {' '}{' '}{' '}{' '}{' '}{' '}{' '}{' '}
          <div
            className="Board"
            style={{
              width: WIDTH,
              height: HEIGHT,
              backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
            }}
          />
          {' '}{' '}{' '}{' '}{' '}{' '}
        </div>
      </div>
    );
  }
}

export default Game;
