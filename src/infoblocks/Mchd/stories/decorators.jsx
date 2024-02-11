import { Provider } from "../context";

import { Col, Container, Row } from "@/components";

export const WithInfoblockLayout = (Story) => (
    // todo: create components for ib-... classes
    <Container className="ib-container">
        <Row>
            <Col md={12}>
                <Story />
            </Col>
        </Row>
    </Container>
);

export const WithData = (data) => (Story) => (
    <Provider data={data}>
        <Story />
    </Provider>
);
