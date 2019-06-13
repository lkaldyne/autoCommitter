import React from 'react'
// import { PageContainer } from '../components/PageContainer';
// import Form from '../components/Form'
import LoginForm from '../components/Forms/LoginForm';
// import { Row, Col, Button } from 'reactstrap'
import PropTypes from 'prop-types';


export default class Header extends React.Component {
  render() {
    return (
        <div style={headerDiv}>
            <div style={{margin: '15px'}}>
                <h1 style={title}>{this.props.title}</h1>
            </div>
            <div style={{margin: '15px'}}>
                <LoginForm />
            </div>
        </div>
    )
  }
}

const headerDiv = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '5rem',
    backgroundColor: '#2C3E50'
}

const title = {
    fontFamily: 'Montserrat, source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
    fontWeight: '5em',
    fontSize: '2.3rem',
    color: 'white'
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}