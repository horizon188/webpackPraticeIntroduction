//test.js
import React, {Component} from 'react'
import config from './config.json';
import styles from './test.css';//导入
import img from './assets/image/1.png'
console.log('styles',styles,JSON.stringify(styles))
class TestCon extends Component{
    render() {
        return (<div className={styles.root}>
        {/* <img src={img}></img> */}
        {111+config.testText}</div>);
    } 
}
export default TestCon;console.log();