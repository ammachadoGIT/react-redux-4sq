import React, { Component } from 'react';
import VenuePanel from './VenuePanel';
import { Alert } from 'react-bootstrap';
import { sortByDistance } from '../util/sorting';

export default class VenueList extends Component {
  render() {
    const errorAPI = (this.props.data &&
      this.props.data.meta &&
      this.props.data.meta.code !== 200);

    const errorProp = this.props.error;

    const warning = this.props.data &&
      this.props.data.response &&
      this.props.data.response.warning &&
      this.props.data.response.warning.text;
    return (
      <div>
        {
          warning ?
            <Alert bsStyle="warning">
              {this.props.data.response.warning.text}
            </Alert>
            : ""
        }

        {
          errorAPI || errorProp ?
            <Alert bsStyle="danger">
              {
                errorAPI ? this.props.data.meta.errorDetail : ''
              }
              {
                errorProp ? this.props.error.message : ''
              }
            </Alert> :

            this.props.data &&
            this.props.data.response &&
            this.props.data.response.groups[0].items
              .sort(sortByDistance)
              .map(d =>
                <VenuePanel venue={d.venue} key={d.venue.id} />
              )
        }

      </div>)
  }
}