import React, { Component } from "react";
import "./App.css";
import { getData } from "./services/foursquare";
import VenueResult from "./components/VenueResult";
import FilterPanel from "./components/FilterPanel";
import { Provider } from "react-redux";
import createStore from "./util/redux";
import { setLocation, startLoading, stopLoading, listData, error } from "./util/actions";

let store = createStore();

class App extends Component {

  updateState(err, data) {

    store.dispatch(stopLoading(data));
    if (err) {
      store.dispatch(error(err));
    } else {
      store.dispatch(listData(data));
      store.dispatch(setLocation(data.response.headerFullLocation));
    }
  }

  search() {
    let radius = store.getState().filter.radius;

    store.dispatch(startLoading());
    getData(radius, this.updateState.bind(this));
  }

  componentDidMount() {
    // TODO: check if needed
    store.subscribe(() => this.forceUpdate());

    this.search(2000);
  }

  render() {
    return (
      <Provider store={store} >
        <div className="App">
          <header className="App-header">
            <h1>Venue Discovery</h1>
          </header>

          <h2>Discovering new places around {store.getState().location}</h2>
          <FilterPanel fnSearch={this.search.bind(this)} />
          <VenueResult />

        </div>
      </Provider>
    );
  }
}

export default App;
