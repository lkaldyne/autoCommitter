import React from 'react'
import axios from 'axios'
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';

export default class PasswordResetForm extends React.Component {
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
        axios.defaults.withCredentials = true; 
        let oldPassword = document.getElementById('oldPassword').value
        let password1 = document.getElementById('password1').value
        let password2 = document.getElementById('password2').value
        axios.put(`/api/profiles/userNewPass`, {oldPassword, password1, password2})
        .then(res => {
            if (res.status === 200) {
                this.setState(() => ({
                    errorMessage: ''
                }))
                document.getElementById('oldPassword').value = ''
                document.getElementById('password1').value = ''
                document.getElementById('password2').value = ''
                alert('Password Has Been Changed');
            } else {
                this.setState(() => ({
                    errorMessage: res.data.description
                }))
                
            }
        })
        .catch(res => { 
            alert("Unexpected Error Occurred. Try Again Later");    
        })
    }

    render() {
        return (
            <div style={signupWrapper}>
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
                    <Label for="examplePassword">Confirm New Password</Label>
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