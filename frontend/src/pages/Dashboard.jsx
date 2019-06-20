import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Redirect} from 'react-router-dom';
import { Button, Spinner, Col, Row, Card, CardHeader, CardBody, Collapse } from 'reactstrap';
import Slider from '@material-ui/lab/Slider';
import axios from 'axios';
import GithubTokenForm from '../components/Forms/GithubTokenForm';
import ForgotPasswordForm from '../components/Forms/ForgotPasswordForm';
import { SettingsAdjustments } from '../components/SettingsAdjustments';

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
                <Row style = {{width:'100%'}}>
                    <Col lg={8} md={12}>
                        <Card body style={adjustSettingsStyle}>
                            <CardHeader><h4>Adjust Your Settings</h4></CardHeader>
                            <CardBody>
                                <SettingsAdjustments />
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg={4} md={12}>
                        <Card style = {adjustSettingsStyle}>
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
    margin: '0 2vw 2vw 2vw'
}

const cardRowStyle = {
    marginTop: '2vh'
}