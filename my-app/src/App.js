import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import PropTypes from "prop-types";

const itemDetails = {
  title: "Title1",
  description: "Desc1",
  price: 12
};

function onItemClick() {
  itemDetails.isVisible = !itemDetails.isVisible;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isVisibleOn: false, message: "" };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.childHandler = this.childHandler.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isVisibleOn: !prevState.isVisibleOn
    }));
  }

  /*
     Function that gets called when
     we bubble up our `return` from Child 
    */
  childHandler(dataFromChild) {
    // log our state before and after we updated it

    this.setState(
      {
        message: dataFromChild
      },
      () => console.log("Updated Parent State:", this.state)
    );
  }

  render() {
    return (
      <div>
        <HeaderApp />
        <div style={{ float: "left", width: "25%" }}>
          <ShoppingCartItem title="Item1" onClick={this.handleClick} />
          <div>{this.state.message}</div>
        </div>
        <div style={{ float: "left" }}>
          <ItemDetails
            details={itemDetails}
            isVisible={this.state.isVisibleOn}
            action={this.childHandler}
          />
        </div>
      </div>
    );
  }
}
const divStyle = {
  fontSize: "30px"
};
function HeaderApp() {
  return (
    <div style={{ divStyle }}>
      <div>Shopping Cart</div>
    </div>
  );
}

function ShoppingCartList() {
  return <div />;
}

function ShoppingCartItem({ title, onClick }) {
  return (
    <div>
      <h4
        onClick={() => {
          onClick(title);
        }}
      >
        {title}
      </h4>
    </div>
  );
}

function ItemDetails(props) {
  var displayStyle = { display: "block" };
  var hiddenStyle = { display: "none" };

  return (
    <div style={props.isVisible ? displayStyle : hiddenStyle}>
      <div>Title : {props.details.title}</div>
      <div>description : {props.details.description}</div>
      <div>Price : {props.details.price}</div>
      <button onClick={() => props.action("The button was clicked")}>
        Check Item1!
      </button>
    </div>
  );
}

ItemDetails.propTypes = {
  details: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  }),
  isVisible: PropTypes.bool.isRequired,
  action: PropTypes.func.isRequired
};

export default App;
