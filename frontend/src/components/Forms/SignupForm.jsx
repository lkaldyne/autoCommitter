import React from 'react'
import axios from 'axios'
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Redirect } from 'react-router-dom'

export default class SignupForm extends React.Component {
    state = {
        username: '',
        password: '',
        github_token: '',
        toDashboard: false,
        errorMessage: '',
        termsConditionsModal: false
    }

    toggle = () => {
        this.setState(prevState => ({
            termsConditionsModal: !prevState.termsConditionsModal
        }));
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleClick = (e) => {
    }

    register = (e) => {
        e.preventDefault();
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
                    <Modal isOpen={this.state.termsConditionsModal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>AutoCommitter Terms and Conditions</ModalHeader>
                        <ModalBody>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </ModalBody>
                    </Modal>
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
                        <Label for="examplePassword">GitHub Access Token <a style={{fontSize: '12px'}} href='https://medium.com/@katekimani/accessing-github-https-repos-without-typing-credentials-everytime-d0e4657de9dc' target="__blank">What's this?</a></Label>
                        <Input type="password" name="github_token" id="github_token" placeholder="" onChange={this.handleChange} required/>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                        <Input type="checkbox" required />{' '}
                        I agree to the <a href='#' onClick={this.toggle}>terms and conditions.</a>
                        </Label>
                    </FormGroup>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '15px'}}>
                        <Button>Submit</Button>
                        <p style={{color:'#b50707', margin: '0'}}>{this.state.errorMessage}</p>
                    </div>
                    </Form>
                </div>
            : <Redirect push to='/dashboard' />
    }
  }

  const signupWrapper = {
      border: '1px solid #ccc',
      padding: '30px'
  }