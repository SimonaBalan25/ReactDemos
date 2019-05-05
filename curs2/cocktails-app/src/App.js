import React, { Fragment } from "react";
import "./App.css";
import axios from "axios";
import ItemIconDetails from "./Cocktail/ItemIconDetails";
import ItemTitleDetails from "./Cocktail/ItemTitleDetails";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCategories: true,
      showTitleDetails: false,
      showDetails: false,
      selectedItem: {},
      categories: [
        {
          title: "Alcoholic",
          url: "https://thecocktaildb.com/api/json/v1/1/filter.php?a=",
          items: []
        },
        {
          title: "Non_Alcoholic",
          url: "https://thecocktaildb.com/api/json/v1/1/filter.php?a=",
          items: []
        },
        {
          title: "Ordinary_Drink",
          url: "https://thecocktaildb.com/api/json/v1/1/filter.php?c=",
          items: []
        },
        {
          title: "Cocktail_glass",
          url: "https://thecocktaildb.com/api/json/v1/1/filter.php?g=",
          items: []
        },
        {
          title: "Champagne_flute",
          url: "https://thecocktaildb.com/api/json/v1/1/filter.php?g=",
          items: []
        }
      ]
    };
    this.backToCategories = this.backToCategories.bind(this);
    this.hideTitleDetails = this.hideTitleDetails.bind(this);
  }

  componentDidMount() {
    this.state.categories.forEach(c => this.fetchCategory(c));
  }

  fetchCategory(categ) {
    var linkUrl = categ.url + categ.title;

    axios
      .get(linkUrl)
      .then(response => {
        categ.items = response.data.drinks;
        this.setState({ items: response.data.drinks });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidUpdate() {
    this.render();
  }

  componentWillUnmount() {}

  onShowDetails(item) {
    console.log(this.state.showCategories);
    this.setState(
      {
        showCategories: false,
        showDetails: true,
        showTitleDetails: false,
        selectedItem: item
      },
      () => {
        this.forceUpdate();
      }
    );
  }

  onShowTitleDetails(item) {
    this.setState({ showTitleDetails: true, selectedItem: item });
  }

  hideTitleDetails() {
    this.setState({ showTitleDetails: false }, () => {
      console.log(this.showTitleDetails);
    });
  }

  backToCategories() {
    this.setState({ showCategories: true, showDetails: false });
  }

  render() {
    const headerStyle = {
      backgroundColor: "lightGray",
      height: "65px",
      margin: "0px",
      verticalAlign: "middle",
      lineHeight: "50px"
    };

    const categoriesHeaderStyle = {
      backgroundColor: "lightPink",
      height: "65px"
    };

    const firstCategoryStyle = {
      paddingLeft: "105px",
      float: "left",
      paddingRight: "100px",
      border: "2px solid darkred",
      borderWidth: "2px 0px 2px 2px"
    };

    const categoryStyle = {
      float: "left",
      paddingRight: "80px",
      paddingLeft: "80px",
      border: "2px solid darkred",
      borderWidth: "2px 0px 2px 2px"
    };

    const lastCategoryStyle = {
      float: "left",
      paddingRight: "100px",
      paddingLeft: "100px",
      border: "2px solid darkred",
      borderWidth: "2px 2px 2px 2px"
    };

    let categoriesDetails = this.state.categories.map((categ, index) => {
      //let selectedCateg = this.state.categories[index];

      let itemDetails = categ.items.map((item, index) => {
        return (
          <div style={{ flex: "1 0 21%" }}>
            <div>
              <a onClick={this.onShowDetails.bind(this, item)} href="#">
                <img src={item.strDrinkThumb} style={{ width: "130px" }} />
              </a>
            </div>
            <div>
              <a onClick={this.onShowTitleDetails.bind(this, item)} href="#">
                {item.strDrink}
              </a>
            </div>
          </div>
        );
      });

      return (
        <div>
          <h2>{categ.title}</h2>
          <div style={{ display: "flex", flexWrap: "wrap" }}>{itemDetails}</div>
        </div>
      );
    });

    return (
      <div className="App">
        <h2 style={headerStyle}>Cocktails</h2>

        <div style={categoriesHeaderStyle}>
          <div style={firstCategoryStyle}>
            <AlcoholicDrinks />
          </div>
          <div style={categoryStyle}>
            <NonAlcoholicDrinks />
          </div>
          <div style={categoryStyle}>
            <OrdinaryDrinks />
          </div>
          <div style={categoryStyle}>
            <CocktailGlass />
          </div>
          <div style={lastCategoryStyle}>
            <ChampagneFlute />
          </div>
        </div>
        <div>
          <SearchCocktailByName />
        </div>
        {this.state.showTitleDetails && (
          <ItemTitleDetails
            itemUrl={this.state.selectedItem.strDrinkThumb}
            itemTitle={this.state.selectedItem.strDrink}
            itemId={this.state.selectedItem.idDrink}
            onHideDetails={this.hideTitleDetails}
          />
        )}
        {this.state.showCategories ? (
          categoriesDetails
        ) : (
          <ItemIconDetails
            itemUrl={this.state.selectedItem.strDrinkThumb}
            itemTitle={this.state.selectedItem.strDrink}
            action={this.backToCategories}
          />
        )}
      </div>
    );
  }
}

function AlcoholicDrinks() {
  return <h3>Alcoholic</h3>;
}

function NonAlcoholicDrinks() {
  return <h3>Non Alcoholic</h3>;
}

function OrdinaryDrinks() {
  return <h3>Ordinary drink</h3>;
}

function CocktailGlass() {
  return <h3>Cocktail glass</h3>;
}

function ChampagneFlute() {
  return <h3>Champagne flute</h3>;
}

function SearchCocktailByName() {
  let searchStyle = {
    backgroundColor: "lightPink",
    width: "1000px",
    borderRadius: "15px",
    margin: "15px",
    display: "inline-block",
    height: "50px",
    lineHeight: "50px"
  };
  return (
    <div style={{ textAlign: "center" }}>
      <div style={searchStyle}>Search by name</div>
    </div>
  );
}
export default App;
