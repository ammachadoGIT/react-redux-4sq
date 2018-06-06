import React, { Component } from 'react';
import { Row, Button, Panel } from 'react-bootstrap';
import { setFilter } from '../util/actions';
import { connect } from 'react-redux';

class FilterPanel extends Component {

    constructor() {
        super();
    }
    setRadius(event) {
        this.props.setFilter({ radius: event.target.value });
    }

    render() {
        let radius = this.props.filter.radius;

        return (
            <Panel className="col-md-12 text-center panel-filter">
                <Panel.Heading>
                    <h3>Filter</h3>
                </Panel.Heading>
                <Panel.Body>
                    <form>
                        <Row>
                            <label htmlFor="radius-slider" >Radius:</label>
                            <span id="radius-slider-value">{radius} m</span>
                        </Row>
                        <Row className="text-center col-md-8 col-md-offset-2">
                            <input id="radius-slider" type="range" min="500" max="5000" maxLength="5" step="500"
                                onChange={this.setRadius.bind(this)} defaultValue={radius} />
                        </Row>
                    </form>
                </Panel.Body>
                <Panel.Footer>
                    <Row>
                        <Button bsStyle="primary" onClick={this.props.fnSearch.bind(this, radius)}>Search</Button>
                    </Row>
                </Panel.Footer>
            </Panel>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        store: state,
        filter: state.filter
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setFilter: (filter) => {
            dispatch(setFilter(filter));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterPanel)