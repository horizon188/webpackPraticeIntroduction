//test.js
import React, { Component } from "react";
import config from "./config.json";
import styles from "./test.css"; //导入
import img from "./assets/image/1.png";
import { square } from "./print.js";
console.log("styles", styles, JSON.stringify(styles));
class TestCon extends Component {
  constructor() {
    super();
    square();
  }
  render() {
    return (
      <div className={styles.root}>
        {/* <img src={img}></img> */}
        {typeof process.env.NODE_ENV}
        {typeof NODE_ENV}
        {config.testText + 11}
      </div>
    );
  }
}
export default TestCon;
console.log();
