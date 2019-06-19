import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Redirect} from 'react-router-dom';
import { Button, Spinner } from 'reactstrap';
import axios from 'axios';

export class Dashboard extends React.Component {   
    state = {
        loggedIn: true,
        user: {},
        commitLoading: false
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
                <h3>Github Token:</h3>
                <p>{this.state.user ? this.state.user.github_token : "Loading"}</p>
                {
                    this.state.commitLoading ? 
                        <React.Fragment>
                            <Button disabled>Commit Now (Manually)</Button>
                            <Spinner type="grow" color="dark" />
                        </React.Fragment>
                    :
                        <Button onClick={this.userManualCommit}>Commit Now (Manually)</Button>
                }
                <Footer />
            </React.Fragment>
            ) : (
            <Redirect push to="/" />
            )
        )
    }
}
