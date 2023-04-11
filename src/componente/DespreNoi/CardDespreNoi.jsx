import React from "react";
import PropTypes from "prop-types";

import Col from 'react-bootstrap/Col';
import Card from "react-bootstrap/Card";

const CardDespreNoi = ({ title, description, imageUrl }) => {
  return (
    <Col>
      <Card>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CardDespreNoi;
