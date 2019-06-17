import React from 'react'
import axios from 'axios'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Redirect } from 'react-router-dom'

export default class SignupForm extends React.Component {
    state = {
        username: '',
        password: '',
        github_token: '',
        toDashboard: false,
        errorMessage: ''
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleClick = (e) => {
    }

    register = () => {
        const {username, password, github_token} = this.state;
        axios.post(`http://localhost:5000/api/profiles/register`, {username, password, github_token})
        .then(res => {
            axios.post(`http://localhost:5000/api/profiles/login`, {username, password})
            .then(res => {
                this.setState(() => ({
                        toDashboard: true,
                    }))
            })
        })
        .catch(res => {
            this.setState(() => ({
                errorMessage: 'User already exists.'
            }))
        })
    }

    render() {
        return this.state.toDashboard === false ? 
                <div style={signupWrapper}>
                    <h1 style={{paddingBottom: '15px'}}>Sign Up</h1>
                    <Form onSubmit={this.register} method="POST">
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email" name="username" id="username" placeholder="" onChange={this.handleChange} required/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" name="password" id="password" placeholder="" onChange={this.handleChange} required/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">GitHub Access Token</Label>
                        <Input type="password" name="github_token" id="github_token" placeholder="" onChange={this.handleChange} required/>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                        <Input type="checkbox" required />{' '}
                        I agree to the <a href="https://github.com/lkaldyne/autoCommitter/blob/master/frontend/src/components/PageContainer.jsx" onClick={this.handleClick}>terms & conditions.</a>
                        </Label>
                    </FormGroup>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '15px'}}>
                        <Button>Submit</Button>
                        <p style={{color:'#b50707', margin: '0'}}>{this.state.errorMessage}</p>
                    </div>
                    </Form>
                </div>
            : <Redirect to='/dashboard' />
    }
  }

  const signupWrapper = {
      border: '1px solid #ccc',
      padding: '30px'
  }