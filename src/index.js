// main.js
__webpack_nonce__ = "c29tZSBjb29sIHN0cmluZyB3aWxsIHBvcCB1cCAxMjM=";
import React, { Component } from "react";
import { render } from "react-dom";
// import { render } from "react-router-dom";
import App from "@/pages/App/App.js";
import "@/assets/css/index.css";

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/service-worker.js').then(registration => {
//       console.log('SW registered: ', registration);
//     }).catch(registrationError => {
//       console.log('SW registration failed: ', registrationError);
//     });
//   });
// }
render(<App />, document.getElementById("root"));
