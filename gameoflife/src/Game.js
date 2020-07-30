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
