import React from 'react'
import { PageContainer } from '../components/PageContainer';
import { Row, Col, Button } from 'reactstrap'


export class HomePage extends React.Component {
  render() {
    return (
      <PageContainer
        title="Home"
        subTitle="Just to start off"
      >
        <Row>
          <Col sm={3} />
          <Col sm={6}>
            <Button color="danger">Please enter your password and social security number, it will be stored in plain text (CLICK ME)</Button>
          </Col>
        </Row>
      </PageContainer>
    )
  }
}