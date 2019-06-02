import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

class Cocktails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      showDetails: false,
      selectedItem: {},
      newItem: {}
    };
    console.log("Cocktail");
  }

  componentDidUpdate() {}

  componentDidMount() {
    console.log("mounted2");

    this.fetchItems();
    //console.log("newww" + JSON.stringify(this.props.location.state));
    if (
      this.props.location != undefined &&
      this.props.location.state != undefined &&
      this.props.location.state.cocktail_name != undefined
    ) {
      let cocktailNewItem = Object.assign({}, this.state.newItem);
      cocktailNewItem.strDrink = this.props.location.state.cocktail_name;
      cocktailNewItem.strDrinkThumb = this.props.location.state.file;
      this.setState({ newItem: cocktailNewItem }, () => {
        console.log(
          "New item: " + JSON.stringify(this.props.location.state.file)
        );
      });
    }
  }

  componentDidUpdate() {
    this.render();
  }

  onShowDetails(item) {
    //const { history } = this.props;

    console.log("something");
    this.setState(
      {
        showDetails: true,
        selectedItem: item
      },
      () => {
        this.props.history.push("/item-details", {
          response: this.state.selectedItem,
          current: this.props.category
        });
        //this.forceUpdate();
      }
    );
    console.log(this.props);
  }

  getUrl(categ) {
    switch (categ) {
      case "AlcoholicDrinks":
        return "https://thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic";
      case "NonAlcoholicDrinks":
        return "https://thecocktaildb.com/api/json/v1/1/filter.php?a=Non_alcoholic";
      case "OrdinaryDrinks":
        return "https://thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_drink";
      case "ChampagneFlute":
        return "https://thecocktaildb.com/api/json/v1/1/filter.php?g=Champagne_flute";
      case "CocktailGlass":
        return "https://thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass";
    }
  }

  fetchItems() {
    console.log("Category!! " + this.props.category);
    let linkUrl = this.getUrl(this.props.category);
    console.log("link url " + linkUrl);
    axios
      .get(linkUrl)
      .then(response => {
        this.setState({ items: response.data.drinks }, () => {
          this.setState(
            prevState => ({
              items: [...prevState.items, this.state.newItem]
            }),
            () => {
              console.log(this.state.items);
            }
          );
          this.forceUpdate();
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  onAddCocktail() {
    this.props.history.push("/add-cocktail");
  }

  render() {
    let itemDetails = this.state.items.map((item, index) => {
      return (
        <div style={{ flex: "1 0 21%" }}>
          <div>
            <a href="#">
              <img src={item.strDrinkThumb} style={{ width: "130px" }} />
            </a>
          </div>
          <div>
            <a href="#" onClick={this.onShowDetails.bind(this, item)}>
              {item.strDrink}
            </a>
          </div>
        </div>
      );
    });

    return (
      <div>
        <h3>{this.props.category}</h3>
        <div style={{ display: "flex", flexWrap: "wrap" }}>{itemDetails}</div>
        <div>
          <button onClick={this.onAddCocktail.bind(this)}>Add</button>
        </div>
      </div>
    );
  }
}

Cocktails.propTypes = {
  handleSet: PropTypes.func.isRequired
};

export default Cocktails;
