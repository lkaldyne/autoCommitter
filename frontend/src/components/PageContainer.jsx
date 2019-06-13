import React from 'react';
import { Container, Card, Row, Col, FormText } from 'reactstrap';
import PropTypes from 'prop-types';

export function PageContainer(props) {
    const subtitle = (props.subTitle) ? <FormText>{props.subTitle}</FormText> : undefined;
    return (
        <Container style={{marginTop:'5px'}}>
            <Card body>
                <Row>
                    <Col xs={12}>
                        <h3>{props.title}</h3>
                        {subtitle}
                    </Col>
                </Row>
                <br/>
                {props.children}
            </Card>
        </Container>
    );
}

PageContainer.propTypes = {
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string,
    excludeBackButton: PropTypes.bool,
}