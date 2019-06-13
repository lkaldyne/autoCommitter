import React from 'react'
import { PageContainer } from '../components/PageContainer';
import Header from '../components/Header';
import Footer from '../components/Footer';

export class HomePage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header title='AutoCommitter'/>
        <PageContainer>
        </PageContainer>
        <Footer />
      </React.Fragment>
    )
  }
}