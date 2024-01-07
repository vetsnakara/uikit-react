import { Container, Row, Col } from "../../../components/Grid";
// import { Provider } from "../context";

export const WithInfoblockLayout = (Story) => (
    // todo: create classess for iblocks (don't use classes directly)
    <Container className="ib-container">
        <Row>
            <Col md={12}>
                <Story />
            </Col>
        </Row>
    </Container>
);

// export const WithData = (data) => (Story) =>
//     (
//         <Provider data={data}>
//             <Story />
//         </Provider>
//     );
