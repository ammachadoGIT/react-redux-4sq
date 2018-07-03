import React, { Component } from "react";
import { Panel, Row, Col } from "react-bootstrap";

export default class VenuePanel extends Component {
    render() {
        const venue = this.props.venue;
        const category = venue.categories[0];
        const linkToFoursquare = `https://foursquare.com/v/${venue.id}`;
        const icon = `${category.icon.prefix}64${category.icon.suffix}`;
        const googleMapsLink = venue.location.lat && venue.location.lng ?
            `http://www.google.com/maps/place/${venue.location.lat},${venue.location.lng}` :
            null;

        return (
            <Col sm={6} md={4} >
                <Panel className="panel-venue panel-primary">
                    <Panel.Heading>
                        <Row>
                            <Col xs="2">
                                <img src={category.icon && icon} alt={category.name} />
                            </Col>

                            <Col md="10" className="venue-name">
                                <span>
                                    <a href={linkToFoursquare} target="_blank">
                                        {venue.name}
                                    </a>
                                </span>
                                <p>{category.name}</p>
                            </Col>
                        </Row>

                    </Panel.Heading>
                    <Panel.Body>

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
            </Col>
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
