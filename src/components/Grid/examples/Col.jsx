import { Subtitle } from "../../Text";

import { Container } from "../Container";
import { Row } from "../Row";
import { Col } from "../Col";

export const Reordering = () => (
    <Container className="content_center">
        <Row>
            <Col>First in DOM, no order applied</Col>
            <Col xs={{ size: "", order: 5 }}> Second in DOM, with a larger order</Col>
            <Col xs={{ size: "", order: 1 }}>Third in DOM, with an order of 1</Col>
        </Row>
        <br />
        <Row>
            <Col xs={{ size: "", order: "last" }}>First in DOM, ordered last</Col>
            <Col>Second in DOM, unordered</Col>
            <Col xs={{ size: "", order: "first" }}>Third in DOM, ordered first</Col>
        </Row>
    </Container>
);

export const Offsetting = () => (
    <Container className="content_center">
        <Subtitle>Offset classes</Subtitle>
        <Row>
            <Col md={4}>.col-md-4</Col>
            <Col md={{ size: 4, offset: 4 }}>.col-md-4 .offset-md-4</Col>
        </Row>
        <Row>
            <Col md={{ size: 3, offset: 3 }}>.col-md-3 .offset-md-3</Col>
            <Col md={{ size: 3, offset: 3 }}>.col-md-3 .offset-md-3</Col>
        </Row>
        <Row>
            <Col md={{ size: 6, offset: 3 }}>.col-md-6 .offset-md-3</Col>
        </Row>

        <br />

        <Subtitle>Reset offsets</Subtitle>
        <Row>
            <Col sm={5} md={6}>
                .col-sm-5 .col-md-6
            </Col>
            <Col sm={{ size: 5, offset: 2 }} md={{ size: 6, offset: 0 }}>
                .col-sm-5 .offset-sm-2 .col-md-6 .offset-md-0
            </Col>
        </Row>
        <Row>
            <Col sm={6} md={5} lg={6}>
                .col-sm-6 .col-md-5 .col-lg-6
            </Col>
            <Col sm={6} md={{ size: 5, offset: 2 }} lg={{ size: 6, offset: 0 }}>
                .col-sm-6 .col-md-5 .offset-md-2 .col-lg-6 .offset-lg-0
            </Col>
        </Row>

        <br />

        <Subtitle>No gutters</Subtitle>
        <Row className="no-gutters">
            <Col sm={6} md={8}>
                .col-sm-6 .col-md-8
            </Col>
            <Col xs={6} md={4}>
                .col-6 .col-md-4
            </Col>
        </Row>

        <br />

        <Subtitle>Standalone columns</Subtitle>
        <Col xs={3} className="mb-2">
            .col-3: width of 25%
        </Col>
        <Col sm={9}>.col-sm-9: width of 75% above sm breakpoint</Col>
    </Container>
);
