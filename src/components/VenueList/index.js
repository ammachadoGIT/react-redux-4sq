import React, { Component } from "react";
import VenuePanel from "../VenuePanel/index";
import { Alert } from "react-bootstrap";
import { sortByDistance } from "../../util/sorting";
import { connect } from "react-redux";

class VenueList extends Component {
  render() {
    let venues = this.props.venues;

    const errorAPI = (venues &&
      venues.meta &&
      venues.meta.code !== 200);

    const errorProp = this.props.error;

    const warning = venues &&
      venues.response &&
      venues.response.warning &&
      venues.response.warning.text;
    return (
      <div className="venue-list">
        {
          warning ?
            <Alert bsStyle="warning">
              {venues.response.warning.text}
            </Alert>
            : ""
        }

        {
          errorAPI || errorProp ?
            <Alert bsStyle="danger">
              {
                errorAPI ? venues.meta.errorDetail : ""
              }
              {
                errorProp ? this.props.error.message : ""
              }
            </Alert> :

            venues &&
            venues.response &&
            venues.response.groups[0].items
              .sort(sortByDistance)
              .map(d =>
                <VenuePanel venue={d.venue} key={d.venue.id} />
              )
        }

      </div>)
  }
}

const mapStateToProps = (state) => {
  return {
    venues: state.venues,
    error: state.error
  }
}

export default connect(mapStateToProps)(VenueList)