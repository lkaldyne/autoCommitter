import React from 'react'
import { PageContainer } from '../components/PageContainer';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BrowserRouter, Route, Redirect} from 'react-router-dom'

export class HomePage extends React.Component {
  loggedIn = () => {
    // check session/application data
    return true;
  }

  render() {
    return (
        <React.Fragment>
          <BrowserRouter>
            <Route exact path="/" render={() => (
                <React.Fragment>
                  <Header title='AutoCommitter' isHomepage={true}/>
                  <PageContainer />
                  <Footer />
                </React.Fragment>
            )}/>
            <Route exact path="/dashboard" render={() => (
              this.loggedIn ? (
                <React.Fragment>
                  <Header title='AutoCommitter' isHomepage={false}/>
                  {/* <PageContainer /> */}
                  <Footer />
                </React.Fragment>
              ) : (
                <Redirect to="/" />
              )
            )}/>
          </BrowserRouter>
        </React.Fragment>

    )
  }
}