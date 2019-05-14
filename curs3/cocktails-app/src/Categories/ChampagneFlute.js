import React from "react";
import axios from "axios";

class ChampagneFlute extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
    console.log("Champagne");
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

  fetchItems() {
    var linkUrl =
      "https://thecocktaildb.com/api/json/v1/1/filter.php?g=Champagne_flute";

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
            <a href="#">{item.strDrink}</a>
          </div>
        </div>
      );
    });

    return (
      <div>
        <h3>Champagne Flute</h3>
        <div style={{ display: "flex", flexWrap: "wrap" }}>{itemDetails}</div>
      </div>
    );
  }
}

export default ChampagneFlute;
