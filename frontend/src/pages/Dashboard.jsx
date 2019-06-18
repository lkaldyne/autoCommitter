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

    tempLogout = () => {
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
                <Header title='AutoCommitter' isHomepage={false}/>
                <h1>Email:</h1>
                <h3>{this.state.user ? this.state.user.username : "Loading"}</h3>
                <h1>ID:</h1>
                <h3>{this.state.user ? this.state.user._id : "Loading"}</h3>
                <h1>Github Token:</h1>
                <h3>{this.state.user ? this.state.user.github_token : "Loading"}</h3>
                <Button onClick={this.tempLogout}>Logout</Button>
                <Footer />
            </React.Fragment>
            ) : (
            <Redirect to="/" />
            )
        )
    }
}