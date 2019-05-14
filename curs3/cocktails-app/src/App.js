import React, { Fragment } from "react";
import "./App.css";
import axios from "axios";
import ItemIconDetails from "./Cocktail/ItemIconDetails";
import ItemTitleDetails from "./Cocktail/ItemTitleDetails";
import { Router, Route, Link, Switch } from "react-router-dom";
import AlcoholicDrinks from "./Categories/AlcoholicDrinks";
import NonAlcoholicDrinks from "./Categories/NonAlcoholicDrinks";
import OrdinaryDrinks from "./Categories/OrdinaryDrinks";
import CocktailGlass from "./Categories/CocktailGlass";
import ChampagneFlute from "./Categories/ChampagneFlute";
import AddCocktailForm from "./Cocktail/AddCocktailForm";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import history from "./history";
import createBrowserHistory from "history/createBrowserHistory";
const history2 = createBrowserHistory();

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
    this.handleSet = this.handleSet.bind(this);
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
    console.log("did update");
    this.render();
  }

  childHandler = dataFromChild => {
    console.log("Updated Parent State:", dataFromChild);
  };

  componentWillUnmount() {}

  onShowDetails(item) {
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

  handleSet() {
    this.setState({ showCategories: false }, () => {
      this.forceUpdate();
    });
    console.log("yes");
  }

  render() {
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

    console.log(this.state.showCategories);

    return (
      <div className="App">
        <h2 class="App-header">Cocktails</h2>

        <Router history={history}>
          <div class="Categories-header">
            <div class="First-category">
              <Link
                to="/alcoholic-drinks"
                onClick={() => {
                  console.log(history);
                  this.setState({ showCategories: false });
                }}
              >
                AlcoholicDrinks
              </Link>
            </div>
            <div class="Category">
              <Link
                to="/non-alcoholic-drinks"
                onClick={() => this.setState({ showCategories: false })}
              >
                NonAlcoholicDrinks
              </Link>
            </div>
            <div class="Category">
              <Link
                to="/ordinary-drinks"
                onClick={() => this.setState({ showCategories: false })}
              >
                OrdinaryDrinks
              </Link>
            </div>
            <div class="Category">
              <Link
                to="/cocktail-glass"
                onClick={() => this.setState({ showCategories: false })}
              >
                Cocktail Glass
              </Link>
            </div>
            <div class="Last-category">
              <Link
                to="/champagne-flute"
                onClick={() => this.setState({ showCategories: false })}
              >
                ChampagneFlute
              </Link>
            </div>
          </div>

          <Switch>
            <Route
              exact
              path="/alcoholic-drinks"
              render={props => <AlcoholicDrinks {...props} history={history} />}
            />
            <Route path="/item-details" component={ItemIconDetails} />
            <Route path="/add-cocktail" component={AddCocktailForm} />
            <Route
              path="/non-alcoholic-drinks"
              component={NonAlcoholicDrinks}
              onChange={() => {
                this.setState({ showCategories: false });
              }}
            />
            <Route path="/ordinary-drinks" component={OrdinaryDrinks} />
            <Route path="/cocktail-glass" component={CocktailGlass} />
            <Route path="/champagne-flute" component={ChampagneFlute} />
          </Switch>
        </Router>

        {this.state.showCategories ? (
          <div>
            <div>
              <SearchCocktailByName />
            </div>
            <AlcoholicDrinks />
            <NonAlcoholicDrinks />
            <OrdinaryDrinks />
            <CocktailGlass />
            <ChampagneFlute />
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

/* function AlcoholicDrinks() {
  return <h3>Alcoholic Drinks</h3>;
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
}*/

function SearchCocktailByName() {
  return (
    <div style={{ textAlign: "center" }}>
      <div class="Search">Search by name</div>
    </div>
  );
}

export default App;
