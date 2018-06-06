import React, { Component } from "react";
import "./App.css";
import { getData } from "./services/foursquare";
import VenueResult from "./components/VenueResult";
import FilterPanel from "./components/FilterPanel";
import { Provider } from "react-redux";
import createStore from "./util/redux";
import { startLoading, stopLoading, listData, error } from "./util/actions";

let store = createStore();

class App extends Component {

  updateState(err, data) {

    store.dispatch(stopLoading(data));
    if (err) {
      store.dispatch(error(err));
    } else {
      store.dispatch(listData(data));
    }
  }

  search() {
    store.dispatch(startLoading());

    getData(store.getState().filter, this.updateState.bind(this));
  }

  componentDidMount() {
    // TODO: check if needed
    store.subscribe(() => this.forceUpdate());
    this.search();
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
