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
    console.log(21, cube(23),'你好信息');
  }
  render() {
    return (
      <div className={styles.root} onClick={() => this.draw()}>
        {/* <img src={img}></img> */}
        <div>布局页-修改</div>
        <div>布局页-新增</div>
        <canvas id="canvas"></canvas>
        
      </div>
    );
  }
}
export default TestCon;
console.log();
