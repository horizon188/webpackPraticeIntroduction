//test.js
import React, { Component } from "react";
import config from "@/config/config.json";
import styles from "./App.css"; //导入
import img from "@/assets/image/1.png";
import {cube,square} from "./print.js";
import { BrowserRouter as Router, Route,Switch,Link } from 'react-router-dom';
import Layout from './../Layout/Layout'
class TestCon extends Component {
  constructor() {
    super();
  }
  handleClickRoot(e) {
  }
  render() {
    return (
      <div className={styles.root} onClick={()=>this.handleClickRoot()}>
       <Router>
         <Switch>
          <Route path="/register" exact render={(({ location }) => (<h2><Link to="/" >去布局页</Link> </h2>))} />
          <Route path="/" component={Layout} />
         </Switch>
        </Router>
      </div>
    );
  }
}
export default TestCon;
console.log();
