import React from 'react'
import axios from 'axios'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Redirect } from 'react-router-dom'

export default class LoginForm extends React.Component {
    state = {
        username: '',
        password: '',
        errorMessage: '',
        toDashboard: false
    }

    login = (e) => {
        e.preventDefault();
        const {username, password} = this.state;
        axios.post(`http://localhost:5000/api/profiles/login`, {username, password})
        .then(res => {
            this.setState(() => ({
                    toDashboard: true,
                }))
        })
        .catch(res => {
            this.setState(() => ({
                errorMessage: 'Invalid credentials'
            }))
        })
    }

    handleChange = (e) => {
        this.setState({[e.target.name] : e.target.value})
    }

    render() {
        return this.state.toDashboard === false ? 
            <Form inline onSubmit={this.login} method="POST">
                <p style={{color:'red', margin: '0', marginRight: '20px'}}>{this.state.errorMessage}</p>
                <FormGroup style={formStyle}>
                    <Label for="exampleEmail" hidden>Email</Label>
                    <Input type="email" name="username" id="username" placeholder="Email" onChange={this.handleChange} required/>
                </FormGroup>
                {' '}
                <FormGroup style={formStyle}>
                    <Label for="examplePassword" hidden>Password</Label>
                    <Input type="password" name="password" id="password" placeholder="Password" onChange={this.handleChange} required/>
                </FormGroup>
                {' '}
                <Button>Login</Button>
            </Form> : <Redirect to='/dashboard' />
    }
  }

  const formStyle = {
      marginRight: '10px'
  }