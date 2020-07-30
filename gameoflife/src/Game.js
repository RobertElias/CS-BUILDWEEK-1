import React from "react";
import ReactDOM from "react-dom";
import './Game.css';
import { ButtonToolbar, Dropdown, DropdownButton } from "react-bootstrap";

const CELL_SIZE = 25;
const WIDTH = 800;
const HEIGHT = 600;

//Create Cells
class Cell extends React.Component {
  render () {
    const {x, y} = this.props;
    return (
      <div
        className="Cell"
        style={{
          left: `${CELL_SIZE * x + 1}px`,
          top: `${CELL_SIZE * y + 1}px`,
          width: `${CELL_SIZE - 1}px`,
          height: `${CELL_SIZE - 1}px`,
        }}
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
