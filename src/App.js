import React, { Component } from "react";
import "./App.css";
import { getData } from "./services/foursquare";
import VenueResult from "./components/VenueResult";
import FilterPanel from "./components/FilterPanel";
import { startLoading, stopLoading, listData, error } from "./util/actions";
import { connect } from 'react-redux';
class App extends Component {

  updateState(err, data) {
    this.props.stopLoading();
    if (err) {
      this.props.error(err);
    } else {
      this.props.listData(data);
    }
  }

  search() {
    this.props.startLoading();
    getData(this.props.store.filter, this.updateState.bind(this));
  }

  componentDidMount() {
    this.search();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header bg-primary">
          <h1>Venue Discovery</h1>
        </header>

        <h2>Discovering new places around {this.props.store.location}</h2>
        <FilterPanel fnSearch={this.search.bind(this)} />
        <VenueResult />

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    store: state
  }
}

export default connect(mapStateToProps, {
  startLoading, stopLoading, error, listData
})(App)
