import React from "react";

class ItemIconDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { itemUrl: "", itemTitle: "", category: "" };
  }

  componentDidMount() {
    if (this.props.location.state != undefined) {
      this.setState({
        itemUrl: this.props.location.state.response.strDrinkThumb,
        itemTitle: this.props.location.state.response.strDrink,
        category: this.props.location.state.current
      });
    }
  }

  getPrevRoute() {
    switch (this.state.category) {
      case "AlcoholicDrinks":
        return "/alcoholic-drinks";
      case "NonAlcoholicDrinks":
        return "/nonalcoholic-drinks";
      case "OrdinaryDrinks":
        return "/ordinary-drinks";
      case "ChampagneFlute":
        return "/champagne-flute";
      case "CocktailGlass":
        return "/cocktail-glass";
    }
  }

  returnToMain = e => {
    this.props.history.push(this.getPrevRoute());
  };

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
          <button onClick={this.returnToMain}>Back</button>
        </div>
      </div>
    );
  }
}

export default ItemIconDetails;
