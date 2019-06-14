import React from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class LoginForm extends React.Component {
    render() {
      return (
        <Form inline>
          <FormGroup style={formStyle}>
            <Label for="exampleEmail" hidden>Email</Label>
            <Input type="email" name="username" id="username"  required placeholder="Email" />
          </FormGroup>
          {' '}
          <FormGroup style={formStyle}>
            <Label for="examplePassword" hidden>Password</Label>
            <Input type="password" name="password" id="password" required placeholder="Password" />
          </FormGroup>
          {' '}
          <Button>Login</Button>
        </Form>
      );
    }
  }

  const formStyle = {
      marginRight: '10px'
  }