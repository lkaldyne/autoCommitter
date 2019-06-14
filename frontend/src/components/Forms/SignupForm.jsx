import React from 'react'
import axios from 'axios'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';

export default class SignupForm extends React.Component {
    state = {
        username: '',
        password: '',
        github_token: ''
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleClick = (e) => {
    }

    register = (e) => {
        const {username, password, github_token} = this.state;

        axios.post(`http://localhost:5000/api/profiles/register`, {username, password, github_token})
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
    }

    render() {
      return (
        <div style={signupWrapper}>
            <h1 style={{paddingBottom: '15px'}}>Sign Up</h1>
            <Form onSubmit={this.register}>
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
            <Button style={{marginTop: '15px'}}>Submit</Button>
            </Form>
        </div>
      );
    }
  }

  const signupWrapper = {
      border: '1px solid #ccc',
      padding: '30px'
  }

SignupForm.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    github_token: PropTypes.string.isRequired
}