import React, { Component } from 'react';
import './App.css';
import { getData } from "./services/foursquare";
import VenueList from './components/VenueList';
import FilterPanel from './components/FilterPanel';

class App extends Component {

  constructor() {
    super();
    this.state = { data: [], isLoadingData: false, location: '' };
  }

  updateState(err, data) {
    this.setState({ isLoadingData: false });
    if (err) {
      this.setState({ error: err });
    } else {
      this.setState({ data: data, location: data.response.headerFullLocation });
    }
  }

  search(radius) {
    this.setState({ isLoadingData: true });
    getData(radius, this.updateState.bind(this));
  }
  
  componentDidMount() {
    // TODO: set default radius globally
    this.search(2000);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Venue Discovery</h1>
        </header>

        <h2>Discovering new places around {this.state.location}</h2>
        <FilterPanel fnSearch={this.search.bind(this)} isLoadingData={this.state.isLoadingData} />

        {
          this.state.isLoadingData ?
            <img src="../img/loader.gif" alt="" /> :
            <VenueList data={this.state.data} error={this.state.error} />
        }
      </div>
    );
  }
}

export default App;
