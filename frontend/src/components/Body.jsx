import React from 'react'
import BodyInfo from '../components/BodyInfo';
import SignupForm from '../components/Forms/SignupForm';

export default class Body extends React.Component {
  render() {
    return (
      <div>
            <BodyInfo />
            <SignupForm />
        </div>
    )
  }
}

const bodyContainer = {
    // display: 'flex',
    // flexDirection: 'row'
}