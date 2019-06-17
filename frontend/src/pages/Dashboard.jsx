import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Redirect} from 'react-router-dom'
import axios from 'axios';

export class Dashboard extends React.Component {   
    state = {
        loggedIn: true
    }

    componentDidMount = () => {
        axios.get(`http://localhost:5000/api/profiles/user`)
            .then(res => {
                console.log(res);
            })
            .catch(res => {
                console.log("failed");
                this.setState({loggedIn: false});
            })
    }


    render() {
        return (
            this.state.loggedIn ? (
            <React.Fragment>
                <Header title='AutoCommitter' isHomepage={false}/>
                {/* <PageContainer /> */}
                <Footer />
            </React.Fragment>
            ) : (
            <Redirect to="/" />
            )
        )
    }
}