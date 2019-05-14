import React from "react";

class ItemIconDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { itemUrl: "", itemTitle: "" };
  }

  componentDidMount() {
    this.setState({
      itemUrl: this.props.location.state.response.strDrinkThumb,
      itemTitle: this.props.location.state.response.strDrink
    });
  }

  returnToMain() {
    this.props.history.goBack();
  }

  render() {
    console.log("item details");
    console.log(this.props);
    return (
      <div>
        <div>
          <img src={this.state.itemUrl} />
          <h2>{this.state.itemTitle}</h2>
        </div>
        <div>
          <button onClick={this.returnToMain.bind(this)}>Back</button>
        </div>
      </div>
    );
  }
}

export default ItemIconDetails;
