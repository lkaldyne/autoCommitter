import React from 'react'
import LoginForm from '../components/Forms/LoginForm';
import PropTypes from 'prop-types';

export default function Header(props) {
    return props.isHomepage ? (
        <div style={headerDiv}>
            <div style={{margin: '15px'}}>
                <a href='/' style={{textDecoration: 'none'}}><h1 style={title}>{props.title}</h1></a>
            </div>
            <div style={{margin: '15px'}}>
                <LoginForm />
            </div>
        </div>
    ) : (
        <div style={headerDiv}>
            <div style={{margin: '15px'}}>
                <a href='/' style={{textDecoration: 'none'}}><h1 style={title}>{props.title}</h1></a>
            </div>
        </div>
    );
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