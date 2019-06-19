import React from 'react'
import { PageContainer } from '../components/PageContainer';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Redirect} from 'react-router-dom'
import axios from 'axios';

export class HomePage extends React.Component {

  state = {
    loggedIn: false
  }

  componentDidMount = () => {
    axios.defaults.withCredentials = true; 
    axios('/api/profiles/user', { 
        method: 'get'
      })
      .then((response) => this.setState({ loggedIn: true }))
      .catch((err) => this.setState({loggedIn: false}))
  }

  render() {
    return (
      this.state.loggedIn ? <Redirect push to="/dashboard" /> 
      : 
      (
        <React.Fragment>
          <Header title='AutoCommitter' isHomepage={true}/>
          <PageContainer />
          <Footer />
        </React.Fragment>
      )
    )
  }
}
