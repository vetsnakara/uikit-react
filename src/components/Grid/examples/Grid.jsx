import { Container } from "../Container";
import { Row } from "../Row";
import { Col } from "../Col";

// $grid-breakpoints: (
//     xs: 0,
//     sm: 576px,
//     md: 768px,
//     lg: 992px,
//     xl: 1200px,
//     xxl: 1400px
//   );

// todo: add links to Bootstrap docs in each example
// todo: add small desc from docs

export const Basic = () => (
    // todo: don't use classes
    <Container className="content_center">
        <Row>
            <Col>Column</Col>
            <Col>Column</Col>
            <Col>Column</Col>
        </Row>
    </Container>
);

export const EqualWidth = () => (
    <Container className="content_center">
        <Row>
            <Col>1 of 2</Col>
            <Col>2 of 2</Col>
        </Row>
        <Row>
            <Col>1 of 3</Col>
            <Col>2 of 3</Col>
            <Col>3 of 3</Col>
        </Row>
    </Container>
);

export const SetOneColumnWidth = () => (
    <Container className="content_center">
        <Row>
            <Col>1 of 3</Col>
            <Col xs={5}>2 of 3 (wider)</Col>
            <Col>3 of 3</Col>
        </Row>
        <Row>
            <Col>1 of 3</Col>
            <Col xs={6}>2 of 3 (wider)</Col>
            <Col>3 of 3</Col>
        </Row>
    </Container>
);

export const VariableWidthContent = () => (
    <Container className="content_center">
        <Row>
            <Col lg={2}>1 of 3</Col>
            <Col md="auto">Variable width content</Col>
            <Col lg={2}>3 of 3</Col>
        </Row>
        <br />
        <Row>
            <Col>1 of 3</Col>
            <Col md="auto">Variable width content</Col>
            <Col lg={2}>3 of 3</Col>
        </Row>
    </Container>
);

export const AllBreakpoints = () => (
    <Container className="content_center">
        <Row>
            <Col>col</Col>
            <Col>col</Col>
            <Col>col</Col>
            <Col>col</Col>
        </Row>
        <br />
        <Row>
            <Col xs={8}>col-8</Col>
            <Col xs={4}>col-4</Col>
        </Row>
    </Container>
);

export const StackedToHorizontal = () => (
    <Container className="content_center">
        <Row>
            <Col sm={8}>col-sm-8</Col>
            <Col sm={4}>col-sm-4</Col>
        </Row>
        <br />
        <Row>
            <Col sm>col-sm</Col>
            <Col sm>col-sm</Col>
            <Col sm>col-sm</Col>
        </Row>
    </Container>
);

export const MixAndMatch = () => (
    <Container className="content_center">
        {/* Stack the columns on mobile by making one full-width and the other half-width  */}
        <Row>
            <Col md={8}>.col-md-8</Col>
            <Col xs={6} md={4}>
                .col-6 .col-md-4
            </Col>
        </Row>
        <br />

        {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}
        <Row>
            <Col xs={6} md={4}>
                .col-6 .col-md-4
            </Col>
            <Col xs={6} md={4}>
                .col-6 .col-md-4
            </Col>
            <Col xs={6} md={4}>
                .col-6 .col-md-4
            </Col>
        </Row>
        <br />

        {/* Columns are always 50% wide, on mobile and desktop */}
        <Row>
            <Col xs={6}>.col-6</Col>
            <Col xs={6}>.col-6</Col>
        </Row>
    </Container>
);

export const Nesting = () => (
    <Container className="content_center">
        <Row>
            <Col sm={3}>Level 1: .col-sm-3</Col>
            <Col sm={9}>
                <Row>
                    <Col xs={8} sm={6}>
                        Level 2: .col-8 .col-sm-6
                    </Col>
                    <Col xs={4} sm={6}>
                        Level 2: .col-4 .col-sm-6
                    </Col>
                </Row>
            </Col>
        </Row>
    </Container>
);

// export const Example = () => {
//     return (
//         <Container>
//             <Row>
//                 <Col>.col</Col>
//             </Row>
//             <Row>
//                 <Col>.col</Col>
//                 <Col>.col</Col>
//                 <Col>.col</Col>
//                 <Col>.col</Col>
//             </Row>
//             <Row>
//                 <Col xs="3">.col-3</Col>
//                 <Col xs="auto">.col-auto - variable width content</Col>
//                 <Col xs="3">.col-3</Col>
//             </Row>
//             <Row>
//                 <Col xs="6">.col-6</Col>
//                 <Col xs="6">.col-6</Col>
//             </Row>
//             <Row>
//                 <Col xs="6" sm="4">
//                     .col-6 .col-sm-4
//                 </Col>
//                 <Col xs="6" sm="4">
//                     .col-6 .col-sm-4
//                 </Col>
//                 <Col sm="4">.col-sm-4</Col>
//             </Row>
//             <Row>
//                 <Col sm={{ size: 6, order: 2, offset: 1 }}>.col-sm-6 .order-sm-2 .offset-sm-1</Col>
//             </Row>
//             <Row>
//                 <Col sm="12" md={{ size: 6, offset: 3 }}>
//                     .col-sm-12 .col-md-6 .offset-md-3
//                 </Col>
//             </Row>
//             <Row>
//                 <Col sm={{ size: "auto", offset: 1 }}>.col-sm-auto .offset-sm-1</Col>
//                 <Col sm={{ size: "auto", offset: 1 }}>.col-sm-auto .offset-sm-1</Col>
//             </Row>
//         </Container>
//     );
// };

// export const LayoutRowCols = () => {
//     return (
//         <Container>
//             <h6>xs=&ldquo;2&ldquo;</h6>
//             <Row xs="2">
//                 <Col>Column</Col>
//                 <Col>Column</Col>
//                 <Col>Column</Col>
//                 <Col>Column</Col>
//             </Row>
//             <h6>xs=&ldquo;3&ldquo;</h6>
//             <Row xs="3">
//                 <Col>Column</Col>
//                 <Col>Column</Col>
//                 <Col>Column</Col>
//                 <Col>Column</Col>
//             </Row>
//             <h6>xs=&ldquo;4&ldquo;</h6>
//             <Row xs="4">
//                 <Col>Column</Col>
//                 <Col>Column</Col>
//                 <Col>Column</Col>
//                 <Col>Column</Col>
//             </Row>
//             <h6>xs=&ldquo;4&ldquo;</h6>
//             <Row xs="4">
//                 <Col>Column</Col>
//                 <Col>Column</Col>
//                 <Col>xs=&ldquo;6&ldquo;</Col>
//                 <Col>Column</Col>
//             </Row>
//             <h6>xs=&ldquo;1&ldquo; sm=&ldquo;2&ldquo; md=&ldquo;4&ldquo;</h6>
//             <Row xs="1" sm="2" md="4">
//                 <Col>Column</Col>
//                 <Col>Column</Col>
//                 <Col>Column</Col>
//                 <Col>Column</Col>
//             </Row>
//         </Container>
//     );
// };
