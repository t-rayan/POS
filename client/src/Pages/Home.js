import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Cart, Transaction, ProductItems } from "../component";

const Home = () => {
  return (
    <Container>
      <Row>
        <Col xs="12" sm="7" lg="5" className="mt-3 border">
          <Cart />
          <Transaction />
        </Col>
        <Col xs="12" sm="5" lg="7" className="mt-3 border">
          <ProductItems />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
