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