import React from 'react';
import { Container, Row, Col} from 'reactstrap';
import BodyInfo from './BodyInfo';
import SignupForm from './Forms/SignupForm';

export function HomePageBody(props) {
  return (
    <Container style={containerStyle}>
      <Row style={{margin:'2.5rem 1.5rem'}}>
        <Col xs={12} md={8}>
          <BodyInfo/>
        </Col>
        <Col xs={6} md={4}>
          <SignupForm/>
        </Col>
      </Row>
    </Container>
  );
}

const containerStyle = {
  border: 'none',
  padding: '0',
  maxWidth: 'initial',
  margin: '0px'
}