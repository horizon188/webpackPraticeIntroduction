//test.js
import React, { Component } from "react";
import config from "@/config/config.json";
import styles from "./Layout.css"; //导入
import img from "@/assets/image/1.png";
import {cube,square} from "./print.js";


class TestCon extends Component {
  constructor() {
    super();
  }
  handleClick(e) {
    // console.log("Print", Print);
    console.log(21,cube(23));
  }
  render() {
    return (
      <div className={styles.root} onClick={()=>this.handleClick()}>
        {/* <img src={img}></img> */}
        <div>布局页</div>
        {typeof process.env.NODE_ENV}
        {typeof NODE_ENV}
        {config.testText + 11}
      </div>
    );
  }
}
export default TestCon;
console.log();
