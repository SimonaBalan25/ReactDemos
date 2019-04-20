import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const shoppingCartItems = [
  {
    title: "Blouse XXL",
    description: "This has white colour and is vintage.",
    price: "23E"
  },
  {
    title: "Skirt M",
    description: "It is a red one and works for parties",
    price: "20E"
  },
  {
    title: "T-shirt S",
    description: "Green and works better on a casual out.",
    price: "5E"
  }
];

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
