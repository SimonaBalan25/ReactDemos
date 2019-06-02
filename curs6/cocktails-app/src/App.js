import React, { Fragment } from "react";
import "./App.css";
import axios from "axios";
import ItemIconDetails from "./Cocktail/ItemIconDetails";
import ItemTitleDetails from "./Cocktail/ItemTitleDetails";
import { Router, Route, Link, Switch } from "react-router-dom";
import AddCocktailForm from "./Cocktail/AddCocktailForm";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Cocktails from "./Categories/Cocktails";
import history from "./history";
import createBrowserHistory from "history/createBrowserHistory";
const history2 = createBrowserHistory();

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentDidUpdate() {
    console.log("did update");
    this.render();
  }

  childHandler = dataFromChild => {
    console.log("Updated Parent State:", dataFromChild);
  };

  componentWillUnmount() {}

  render() {
    return (
      <div className="App">
        <h2 class="App-header">Cocktails</h2>

        <Router history={history}>
          <div class="Categories-header">
            <div class="First-category">
              <Link to="/alcoholic-drinks" onClick={() => {}}>
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
              path="/alcoholic-drinks"
              key="A"
              render={props => (
                <Cocktails
                  {...props}
                  category="AlcoholicDrinks"
                  history={history}
                />
              )}
            />
            <Route path="/item-details" component={ItemIconDetails} />
            <Route path="/add-cocktail" component={AddCocktailForm} />
            <Route
              path="/non-alcoholic-drinks"
              render={() => (
                <Cocktails category="NonAlcoholicDrinks" history={history} />
              )}
              onChange={() => {
                this.setState({ showCategories: false });
              }}
              key="NA"
            />
            <Route
              path="/ordinary-drinks"
              key="O"
              render={() => (
                <Cocktails category="OrdinaryDrinks" history={history} />
              )}
            />
            <Route
              path="/cocktail-glass"
              key="CG"
              render={() => (
                <Cocktails category="CocktailGlass" history={history} />
              )}
            />
            <Route
              path="/champagne-flute"
              key="CF"
              render={() => (
                <Cocktails category="ChampagneFlute" history={history} />
              )}
            />
          </Switch>
        </Router>
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
