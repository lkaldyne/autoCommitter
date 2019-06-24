import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Redirect} from 'react-router-dom';
import { Button, Spinner, Col, Row, Card, CardHeader, CardBody, Collapse } from 'reactstrap';
import axios from 'axios';
import GithubTokenForm from '../components/Forms/GithubTokenForm';
import PasswordResetForm from '../components/Forms/PasswordResetForm';
import { SettingsAdjustments } from '../components/SettingsAdjustments';

export class Dashboard extends React.Component {   
  state = {}
  
  constructor() {
    super()
    this.initialize();
  }

  initialize = () => {
    this.state = {
      loggedIn: true,
      user: {},
      commitLoading: false
    }
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
    axios('/api/git/commitOneUser', { 
    method: 'post'
    })
    .then((response) => {
    this.setState({commitLoading: false});
    alert("Commit Successful");
    })
    .catch((err) => {
      alert(err);
      this.setState({commitLoading: false});
    })
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

  updateCommitsPerDay = (val) => {
    const { user } = this.state;
    user.commitsPerDay = val
    this.setState({ user })
  }

  updateCommitsPerWeek = (val) => {
    const { user } = this.state;
    user.commitsPerWeek = val
    this.setState({ user })
  }

  render() {
    return (
      this.state.loggedIn ? (
        <React.Fragment>
          <Header
            title='AutoCommitter'
            isHomepage={false}
            userEmail={this.state.user.username}
            stateClear={this.initialize}
            userLogout={this.logout}
          />
          <h3 style={{margin: '2vw 0 3vw 2vw'}}>
            {this.state.user.username ?
              `Welcome Back, ${this.parseUserName(this.state.user.username)}`
              :
              "Welcome Back"
            }
          </h3>
            <Row style={{width:"100%"}}>
              <Col md={8}>
                <Card body style={adjustSettingsStyle}>
                  <CardHeader>Adjust Your Settings</CardHeader>
                  <CardBody>
                    <SettingsAdjustments
                        commitsPerDay={this.state.user.commitsPerDay} 
                        commitsPerWeek={this.state.user.commitsPerWeek}
                        updateCommitsPerDay={this.updateCommitsPerDay}
                        updateCommitsPerWeek={this.updateCommitsPerWeek}
                    />
                    <Row style={{marginTop:'3vw'}}>
                        <Col>
                            <p style={textStyle}>In order to achieve a realistic effect, AutoCommitter will not commit the exact amount of times specified in the sliders above. Instead, AutoCommitter commits <strong><i>up to</i></strong> the amount specified in order to keep it random</p>
                        </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg={4} md={12}>
                <Card style = {adjustSettingsStyle}>
                    <CardHeader><h4>Account Settings and Manual Committing</h4></CardHeader>
                    <CardBody>
                        <Row>
                            <Col style={{textAlign:"center"}} sm={6}>
                                {                        
                                    this.state.commitLoading ?
                                        <React.Fragment>
                                            
                                            <Spinner className="align-middle" type="grow" color="dark" />
                                        </React.Fragment> 
                                        
                                    :
                                        <Button onClick={this.userManualCommit}>Commit Now (Manually)</Button>
                                }
                            </Col>
                            <Col style={{textAlign:"center"}} sm={6}>
                                <Button color="primary" onClick={this.toggleCollapse}>Change Password</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <Collapse isOpen={this.state.passResetCollapse}>
                                    <PasswordResetForm />
                                </Collapse>
                            </Col>
                        </Row>
                        <Row style={{marginTop:'3vw'}}>
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

const textStyle = {
    color : '#000647',
    fontSize: '15px'
}