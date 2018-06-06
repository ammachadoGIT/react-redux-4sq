import React, { Component } from "react";
import VenueList from "./VenueList";
import { connect } from "react-redux";

class VenueResult extends Component {
  render() {
    return this.props.isLoadingData ?
      <img src="../img/loader.gif" alt="" /> :
      <VenueList />
  }
}

const mapStateToProps = (state) => {
  return {
    isLoadingData: state.isLoadingData
  }
}


export default connect(mapStateToProps)(VenueResult)