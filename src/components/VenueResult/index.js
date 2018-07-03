import React, { Component } from "react";
import VenueList from "../VenueList/index";
import { connect } from "react-redux";
import "./style.css"

class VenueResult extends Component {
  render() {
    return <div className="venue-result" > {
      this.props.isLoadingData ?
        <img src="../img/loader.gif" alt="" /> :
        <VenueList />
    }
    </div >
  }
}

const mapStateToProps = (state) => {
  return {
    isLoadingData: state.isLoadingData
  }
}


export default connect(mapStateToProps)(VenueResult)