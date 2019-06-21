import React from 'react'
import axios from 'axios'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class GithubTokenForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            errorMessage: '',
            newGithubToken: '',
        }
    }

    changeGHKey = (e) => {
        e.preventDefault();
        axios.defaults.withCredentials = true; 
        axios.put('/api/profiles/userToken', {
            newGithubToken: this.state.newGithubToken
        })
        .then((response) => {
            alert('Successfully updated your Github Token')
            document.getElementById("githubToken").value = "";   
        })
        .catch((err) => alert(err))
    }

    handleChange = (e) => {
        this.setState({[e.target.name] : e.target.value});
        this.setState({newGithubToken: e.target.value});
    }

    render() {
        return (
            <Form inline onSubmit={this.changeGHKey} method="POST">
                <p style={{color:'red', margin: '0', marginRight: '20px'}}>{this.state.errorMessage}</p>
                <FormGroup style={formStyle}>
                    <Label style={formStyle} for="githubToken">My Github Token:</Label>
                    <Input type="text" name="GHKey" id="githubToken" placeholder={this.props.githubToken} onChange={this.handleChange} required/>
                </FormGroup>
                <Button>Change Key</Button>
            </Form>
        ) 
    }
  }

  const formStyle = {
      marginRight: '10px',
  }