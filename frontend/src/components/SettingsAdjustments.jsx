import React from 'react'
import { Button, Col, Row } from 'reactstrap';
import Slider from '@material-ui/lab/Slider';
import axios from 'axios';

export class SettingsAdjustments extends React.Component {   
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: true,
            user: {},
            commitLoading: false,
            passResetCollapse: false,
            commitsPerWeek: 0,
            commitsPerDay: 0
        }
    }
   
    
    defaults = {
        commitValue: 3, 
    }

    updateCommitDetails = () => {
        console.log(this.state);
        axios.defaults.withCredentials = true; 
        axios.put('/api/profiles/user', { 
            commitsPerDay: this.state.commitsPerDay,
            commitsPerWeek: this.state.commitsPerWeek,
        })
        .then((response) => alert('Successfully updated your settings'))
        .catch((err) => console.log(err))
    }

    render() {
        return (
            <React.Fragment>        
                <Row style={cardRowStyle}>
                    <Col sm={6} md={4}>
                        Minimum Commits Per Day
                    </Col>
                    <Col sm={6} md={8}>
                        <Slider
                            onChange={(e, value) => this.setState({commitsPerDay: value})}
                            defaultValue={this.props.commitsPerDay}
                            max={7}
                            aria-labelledby="discrete-slider-always"
                            valueLabelDisplay="auto"
                            step={1}
                            marks={marks}
                        />
                    </Col>
                </Row>
                <Row style={cardRowStyle}>
                    <Col sm={6} md={4}>
                        Maximum Commits Per Weak
                    </Col>
                    <Col sm={6} md={8}>
                        <Slider
                            onChange={(e, value) => this.setState({commitsPerWeek: value})}
                            defaultValue={this.props.commitsPerWeek}
                            max={7}
                            aria-labelledby="discrete-slider-always"
                            valueLabelDisplay="auto"
                            step={1}
                            marks={marks}
                        />
                    </Col>
                </Row>
                <Row style={cardRowStyle}>
                    <Col sm={12} style={{textAlign:'right'}}>
                        <Button color="secondary" onClick={this.updateCommitDetails}>Save Changes</Button>
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
  
