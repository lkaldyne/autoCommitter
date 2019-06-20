import React from 'react'
import axios from 'axios'
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Redirect } from 'react-router-dom'

export default class ForgotPasswordForm extends React.Component {
    state = {
        errorMessage: '',
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleClick = (e) => {
    }

    passReset = (e) => {
        e.preventDefault();
        const {username, password, github_token} = this.state;
        axios.post(`/api/profiles/register`, {username, password, github_token})
        .then(res => {
            if (res.status === 200) {
                axios.post(`/api/profiles/login`, {username, password})
                .then(res => {
                    this.setState(() => ({
                        toDashboard: true,
                    }))
                })
            } else {
                this.setState(() => ({
                    errorMessage: 'Unexpected error.'
                }))
            }
        })
        .catch(res => {
            this.setState(() => ({
                errorMessage: 'User already exists.'
            }))
        })
    }

    render() {
        return (
            <div style={signupWrapper}>
                <h4 style={{paddingBottom: '15px'}}>Reset Password</h4>
                <Form onSubmit={this.passReset} method="POST">
                <FormGroup>
                    <Label for="exampleEmail">Old Password</Label>
                    <Input type="password" name="oldPassword" id="oldPassword" placeholder="" onChange={this.handleChange} required/>
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">New Password</Label>
                    <Input type="password" name="password" id="password1" placeholder="" onChange={this.handleChange} required/>
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Repeat New Password</Label>
                    <Input type="password" name="passwordRepeat" id="password2" placeholder="" onChange={this.handleChange} required/>
                </FormGroup>
                <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '15px'}}>
                    <Button>Submit</Button>
                    <p style={{color:'#b50707', margin: '0'}}>{this.state.errorMessage}</p>
                </div>
                </Form>
            </div>
        )
    }
  }

  const signupWrapper = {
      borderBottom: '1px solid #ccc',
      padding: '30px'
  }