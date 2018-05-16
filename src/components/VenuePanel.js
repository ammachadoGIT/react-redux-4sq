import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

export default class VenuePanel extends Component {
    render() {
        const venue = this.props.venue;
        const category = venue.categories[0];
        const linkToFoursquare = `https://foursquare.com/v/${venue.id}`;
        const icon = `${category.icon.prefix}bg_64${category.icon.suffix}`;
        const googleMapsLink = venue.location.lat && venue.location.lng ?
            `http://www.google.com/maps/place/${venue.location.lat},${venue.location.lng}` :
            null;

        return (
            <div className="col-sm-6 col-md-4 ">
                <Panel className="panel-venue">
                    <Panel.Heading>
                        <img src={category.icon && icon} alt={category.name} />

                        <h4>
                            <a href={linkToFoursquare} target="_blank">
                                {venue.name}
                            </a>
                        </h4>

                    </Panel.Heading>
                    <Panel.Body>
                        <p>{category.name}</p>
                        <VenueAddress location={venue.location} />
                    </Panel.Body>
                    <Panel.Footer>
                        {
                            googleMapsLink ?
                                <a href={googleMapsLink} target="_blank">
                                    View on Google Maps
                                </a>
                                : ""
                        }</Panel.Footer>

                </Panel>
            </div>
        )
    }
}

class VenueAddress extends Component {
    render() {
        return (
            <div>
                <p>Address: {
                    this.props.location.address || "N/A"
                }</p>
                <p>{
                    this.props.location.city ?
                        this.props.location.city + ", " + this.props.location.state :
                        ""
                }</p>
                <p>Distance: {this.props.location.distance} m</p>
            </div>
        )
    }
}
