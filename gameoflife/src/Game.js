import React from "react";
import ReactDOM from "react-dom";
import './Game.css';
import { ButtonToolbar, Dropdown, DropdownButton } from "react-bootstrap";

class Box extends React.Component {
  selectBox = () => {
    this.props.selectBox(this.props.row, this.props.col);
  };
  render() {
    return (
      <div
        className={this.props.boxClass}
        id={this.props.id}
        onClick={this.selectBox}
      />
    );
  }
}
class Grid extends React.Component {
  render() {
    const width = this.props.cols * 14;
    var rowsArr = [];

    var boxClass = "";
    for (var i = 0; i < this.props.rows; i++) {
      for (var j = 0; j < this.props.cols; j++) {
        // you can do this with map as well
        let boxId = i + "_" + j;

        boxClass = this.props.gridFull[i][j] ? "box on" : "box off"; // classes from CSS to see if boxes are on or off
        rowsArr.push(
          <Box
            boxClass={boxClass}
            key={boxId}
            boxId={boxId}
            row={i}
            col={j}
            selectBox={this.props.selectBox} // this method is being passed through two components
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
    this.props.gridSize(e) // this event is going to be coming from the eventKey in the DropdownItem section
  }
  render() {
    return (
      <div className="center">
        <ButtonToolbar>
          <button className="btn" onClick={this.props.playButton}>
            Play
          </button>
          <button className="btn" onClick={this.props.pauseButton}>
            Pause
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
          <DropdownButton
            title="Grid Size"
            id="size-menu"
            onSelect={this.handleSelect}
          >
            <Dropdown.Item eventKey="1">25x25</Dropdown.Item>
            <Dropdown.Item eventKey="2">50x30</Dropdown.Item>
            <Dropdown.Item eventKey="3">70x50</Dropdown.Item>
          </DropdownButton>
        </ButtonToolbar>
      </div>
    );
  }
}