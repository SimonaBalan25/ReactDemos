import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class AlcoholicDrinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], showDetails: false, selectedItem: {} };
    console.log("Alcoholic");
  }

  componentDidUpdate() {
    //this.state.items.forEach(c => this.fetchCategory(c));
  }

  componentDidMount() {
    console.log("mounted");
    this.fetchItems();
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
          response: this.state.selectedItem
        });
        //this.forceUpdate();
      }
    );
    console.log(this.props);
  }

  fetchItems() {
    var linkUrl =
      "https://thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic";

    axios
      .get(linkUrl)
      .then(response => {
        this.setState({ items: response.data.drinks }, () => {
          this.forceUpdate();
        });
        console.log(response.data.drinks);
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
        <h3>Alcoholic</h3>
        <div style={{ display: "flex", flexWrap: "wrap" }}>{itemDetails}</div>
        <div>
          <button onClick={this.onAddCocktail.bind(this)}>Add</button>
        </div>
      </div>
    );
  }
}

AlcoholicDrinks.propTypes = {
  handleSet: PropTypes.func.isRequired
};

export default AlcoholicDrinks;
