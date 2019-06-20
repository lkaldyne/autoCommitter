import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Redirect} from 'react-router-dom';
import { Button, Spinner, Col, Row, Card, CardHeader, CardBody } from 'reactstrap';
import Slider from '@material-ui/lab/Slider';
import axios from 'axios';

export class Dashboard extends React.Component {   
  state = {
    loggedIn: true,
    user: {},
    commitLoading: false
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
          <Header
            title='AutoCommitter'
            isHomepage={false}
            userEmail={this.state.user.username}
            userLogout={this.logout}
          />
          <h3 style={{margin: '2vw 0 3vw 2vw'}}>
            {this.state.user.username ?
              `Welcome Back, ${this.parseUserName(this.state.user.username)}`
              :
              "Welcome Back"
            }
          </h3>
            <Row>
              <Col md={8}>
                <Card body style={adjustSettingsStyle}>
                  <CardHeader>Adjust Your Settings</CardHeader>
                  <CardBody>
                    <Row>
                      <Col sm={6} md={4}>
                        Maximum Commits Per Day
                      </Col>
                      <Col sm={6} md={8}>
                        <Slider
                          defaultValue={3}
                          max={7}
                          aria-labelledby="discrete-slider-always"
                          valueLabelDisplay="auto"
                          step={1}
                          marks={marks}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={6} md={4}>
                        Maximum Commits Per Week
                      </Col>
                      <Col sm={6} md={8}>
                          <Slider
                            defaultValue={3}
                            max={7}
                            aria-labelledby="discrete-slider-always"
                            valueLabelDisplay="auto"
                            step={1}
                            marks={marks}
                          />
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={12} style={{textAlign:'right'}}>
                        <Button color="secondary">Save Changes</Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col md={4}>
                {this.state.commitLoading ? 
                  <Row>
                    <Col md={8}>
                      <Button disabled >Commit Now (Manually)</Button>
                    </Col>
                    <Col md={4}>
                      <Spinner type="grow" color="dark" />
                    </Col>
                  </Row>
                :
                  <Button onClick={this.userManualCommit}>Commit Now (Manually)</Button>
                }                                    
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
  