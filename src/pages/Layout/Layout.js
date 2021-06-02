//test.js
import React, { Component } from "react";
import config from "@/config/config.json";
import styles from "./Layout.css"; //导入
import img from "@/assets/image/1.png";
import { cube, square } from "./print.js";

var offset = 0;
class TestCon extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.draw = this.draw.bind(this);
    this.march = this.march.bind(this);
    this.march();
  }

  draw() {
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setLineDash([4, 4]);
    ctx.lineDashOffset = -offset;
    ctx.strokeRect(10, 10, 100, 100);
  }

  march() {
    offset++;
    if (offset > 16) {
      offset = 0;
    }
    this.draw();
    setTimeout(this.march, 20);
  }

  handleClick(e) {
    // console.log("Print", Print);
    console.log(21, cube(23));
  }
  render() {
    return (
      <div className={styles.root} onClick={() => this.draw()}>
        {/* <img src={img}></img> */}
        <div>布局页</div>
        <canvas id="canvas"></canvas>

        {typeof process.env.NODE_ENV}
        {typeof NODE_ENV}
        {config.testText + 11}
      </div>
    );
  }
}
export default TestCon;
console.log();
