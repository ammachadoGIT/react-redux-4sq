import React, { Component } from "react";
import { Row, Button, Panel, Col } from "react-bootstrap";
import { setFilter } from "../util/actions";
import { connect } from "react-redux";

class FilterPanel extends Component {

    setRadius(event) {
        let newFilter = Object.assign(this.props.filter, { radius: event.target.value });
        this.props.setFilter(newFilter);
    }

    setSection(event) {
        let newFilter = Object.assign(this.props.filter, { section: event.target.value });
        this.props.setFilter(newFilter);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.fnSearch.bind(this);
    }

    render() {
        let radius = this.props.filter.radius;
        let section = this.props.filter.section;
        let sections = ["food", "drinks", "coffee", "shops", "arts",
            "outdoors", "sights", "trending", "topPicks"];

        return (
            <Panel className="col-md-12 text-center panel-filter">
                <Panel.Heading>
                    <h3>Filter</h3>
                </Panel.Heading>
                <Panel.Body>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <Row>
                            <Col md={6}>
                                <label htmlFor="radius-slider" >Radius:</label>
                                <span id="radius-slider-value">{radius} m</span>
                                <input id="radius-slider" type="range" min="500" max="5000" maxLength="5" step="500"
                                    onChange={this.setRadius.bind(this)} defaultValue={radius} />
                            </Col>
                            <Col md={6}>
                                <label htmlFor="section" >Section:</label>

                                <select id="section" type="text" defaultValue={section} onChange={this.setSection.bind(this)} >
                                    <option value="" key="">Select...</option>
                                    {sections.map(s => <option value={s} key={s}>{s}</option>)}
                                </select>

                            </Col>
                        </Row>
                    </form>
                </Panel.Body>
                <Panel.Footer>
                    <Row>
                        <Button bsStyle="primary" onClick={this.props.fnSearch.bind(this)}>Search</Button>
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