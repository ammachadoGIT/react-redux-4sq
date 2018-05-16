import React, { Component } from 'react';
import { Row, Button, Panel } from 'react-bootstrap';

export default class FilterPanel extends Component {

    constructor() {
        super();
        this.state = { radius: 2000 };
    }
    setRadius(event) {
        this.setState({ radius: event.target.value });
    }

    render() {
        return (
            <Panel className="col-md-12 text-center panel-filter">
                <Panel.Heading>
                    <h3>Filter</h3>
                </Panel.Heading>
                <Panel.Body>
                    <form>
                        <Row>
                            <label htmlFor="radius-slider" >Radius:</label>
                            {
                                this.state.radius ?
                                    <span id="radius-slider-value">{this.state.radius} m</span> : ""
                            }
                        </Row>
                        <Row className="text-center col-md-8 col-md-offset-2">
                            <input id="radius-slider" type="range" min="500" max="5000" maxLength="5" step="500"
                                onChange={this.setRadius.bind(this)} defaultValue={this.state.radius} />
                        </Row>
                    </form>
                </Panel.Body>
                <Panel.Footer>
                    <Row>
                        <Button bsStyle="primary" onClick={this.props.fnSearch.bind(this, this.state.radius)}>Search</Button>
                    </Row>
                </Panel.Footer>
            </Panel>
        );
    }
}