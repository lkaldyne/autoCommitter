import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Redirect} from 'react-router-dom';
import { Button, Spinner, Col, Row, Card, CardHeader, CardBody, Collapse } from 'reactstrap';
import Slider from '@material-ui/lab/Slider';
import axios from 'axios';
import GithubTokenForm from '../components/Forms/GithubTokenForm';
import ForgotPasswordForm from '../components/Forms/ForgotPasswordForm';

export class Dashboard extends React.Component {   
    state = {
        loggedIn: true,
        user: {},
        commitLoading: false,
        passResetCollapse: false
    }

    toggleCollapse = () => {
        this.setState(state => ({passResetCollapse: !state.passResetCollapse}));
    }

    parseUserName = (email) => {
        return email.split("@")[0];
    }

    userManualCommit = () => {
        this.setState({commitLoading: true});
        axios.defaults.withCredentials = true; 
        axios('/api/profiles/commitOneUser', { 
            method: 'post'
        })
        .then((response) => {
            this.setState({commitLoading: false});
            alert("Commit Successful");
        })
        .catch((err) => alert(err))
    }

    componentDidMount = () => {
      axios.defaults.withCredentials = true; 
      axios('/api/profiles/user', { 
          method: 'get'
        })
        .then((response) => this.setState({ user: response.data.User }))
        .catch((err) => this.setState({loggedIn: false}))
    }

    logout = () => {
      axios.defaults.withCredentials = true; 
      axios('/api/profiles/logout', { 
          method: 'post'
        })
        .then((response) => this.setState({loggedIn: false}))
        .catch((err) => console.log(err))
    }

    render() {
        return (
            this.state.loggedIn ? (
            <React.Fragment>
                <Header title='AutoCommitter' isHomepage={false} userEmail={this.state.user.username} userLogout={this.logout}/>
                <h3 style={{margin: '2vw 0 3vw 2vw'}}>{this.state.user.username ? `Welcome back, ${this.parseUserName(this.state.user.username)}` : "Welcome back"}</h3>
                <Row>
                    <Col md={8}>
                        <Card body style={adjustSettingsStyle}>
                            <CardHeader><h4>Adjust Your Settings</h4></CardHeader>
                            <CardBody>
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
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg={4} md={12}>
                        <Card style={adjustSettingsStyle}>
                            <CardHeader>
                                <Row>
                                    <Col style={{textAlign:"center"}} sm={6}>
                                        {                        
                                            this.state.commitLoading ?
                                                <React.Fragment>
                                                    <Button disabled>Commit Now (Manually)</Button>
                                                    <Spinner className="align-middle" type="grow" color="dark" style={{marginLeft:'1vh'}}/>
                                                </React.Fragment> 
                                                
                                            :
                                                <Button onClick={this.userManualCommit}>Commit Now (Manually)</Button>
                                        }
                                    </Col>
                                    <Col style={{textAlign:"center"}} sm={6}>
                                        <Button color="primary" onClick={this.toggleCollapse}>Forgot Password?</Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs={12}>
                                        <Collapse isOpen={this.state.passResetCollapse}>
                                            <ForgotPasswordForm />
                                        </Collapse>
                                    </Col>
                                </Row>
                                <Row style={cardRowStyle}>
                                    <Col xs={12}>
                                        <GithubTokenForm githubToken={this.state.user.github_token}/>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Footer />
            </React.Fragment>
            ) : (
            <Redirect push to="/" />
            )
        )
    }
}

const adjustSettingsStyle = {
    margin: '0 2vw 0 2vw'
}

const cardRowStyle = {
    marginTop: '2vh'
}

const passResetForm = {
    marginRight: '7vw'
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
  