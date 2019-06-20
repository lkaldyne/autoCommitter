import React from 'react'
import { Button, Spinner, Col, Row, Card, CardHeader, CardBody, Collapse } from 'reactstrap';
import Slider from '@material-ui/lab/Slider';
import axios from 'axios';

export class SettingsAdjustments extends React.Component {   
    state = {
        loggedIn: true,
        user: {},
        commitLoading: false,
        passResetCollapse: false
    }

    render() {
        return (
            <React.Fragment>        
                <Row style={cardRowStyle}>
                    <Col sm={6} md={4}>
                        Maximum Commits Per Day
                    </Col>
                    <Col sm={6} md={8}>
                    <Slider
                        defaultValue={3}
                        max={7}
                        //getAriaValueText={valuetext}
                        aria-labelledby="discrete-slider-always"
                        valueLabelDisplay="auto"
                        step={1}
                        marks={marks}
                    />
                    </Col>
                </Row>
                <Row style={cardRowStyle}>
                    <Col sm={6} md={4}>
                        Maximum Commits Per Week
                    </Col>
                    <Col sm={6} md={8}>
                        <Slider
                            defaultValue={3}
                            max={7}
                            //getAriaValueText={valuetext}
                            aria-labelledby="discrete-slider-always"
                            valueLabelDisplay="auto"
                            step={1}
                            marks={marks}
                        />
                    </Col>
                </Row>
                <Row style={cardRowStyle}>
                    <Col sm={12} style={{textAlign:'right'}}>
                        <Button color="secondary">Save Changes</Button>
                    </Col>
                </Row>
            </React.Fragment>    
        )
    }
}

const cardRowStyle = {
    marginTop: '2vh'
}

const marks = [
    {
        value: 0,
        label: '0',
    },
    {
        value: 1,
        label: '1',
    },
    {
        value: 2,
        label: '2',
    },
    {
        value: 3,
        label: '3',
    },
    {
        value: 4,
        label: '4',
    },
    {
        value: 5,
        label: '5',
    },
    {
        value: 6,
        label: '6',
    },
    {
        value: 7,
        label: '7',
    },
  ];
  