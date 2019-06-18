import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Redirect} from 'react-router-dom'
import axios from 'axios';
import { Button } from 'reactstrap';

export class Dashboard extends React.Component {   
    state = {
        loggedIn: true,
        user: {}
    }

    componentDidMount = () => {
      axios.defaults.withCredentials = true; 
      axios('http://localhost:5000/api/profiles/user', { 
          method: 'get'
        })
        .then((response) => this.setState({ user: response.data.User }))
        .catch((err) => this.setState({loggedIn: false}))
    }

    logout = () => {
      axios.defaults.withCredentials = true; 
      axios('http://localhost:5000/api/profiles/logout', { 
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
                <h3>Github Token:</h3>
                <p>{this.state.user ? this.state.user.github_token : "Loading"}</p>
                <Footer />
            </React.Fragment>
            ) : (
            <Redirect to="/" />
            )
        )
    }
}