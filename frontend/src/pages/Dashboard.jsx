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
        // axios.defaults.withCredentials = true; 
        // axios.get(`http://localhost:5000/api/profiles/user`)
        //     .then(res => {
        //         console.log(res);
        //     })
        //     .catch(res => {
        //         console.log("failed");
        //         this.setState({loggedIn: false});
        //     })
        // const transport = axios.create({
        //     withCredentials: true,
        //     baseURL: 'http://localhost:5000',
        //   })
          
        //   transport
        //     .get('/api/profiles/user')
        //     .then(res => console.log(res))
        //     .catch(err => { console.log(err) })
    
        // fetch('http://localhost:5000/api/profiles/user', {credentials: "same-origin"})
        // .then(res => console.log(res))
        // .catch(err => console.log(err));

        axios('http://localhost:5000/api/profiles/user', { 
            method: 'get',
            withCredentials: true 
          })
          .then((response) => {
            if (response.status === 200) {
              console.log(response); 
            } else {
              return false;
            }
          });

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