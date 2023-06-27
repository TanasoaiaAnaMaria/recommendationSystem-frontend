import React, { useEffect, useState } from "react";
import styles from "./Recomandari.module.scss";
import { getRecomandariAcasa } from "../../api/API";
import { Col, Row } from "react-bootstrap";
import Carusel from "../Carusel/Carusel";

const Recomandari = () => {
  const [recomandari, setRecomandari] = useState(null);

  useEffect(() => {
    fetchRecomandari();
  }, []);

  const fetchRecomandari = async () => {
    try {
      const response = await getRecomandariAcasa();
      if (response.status === 200) {
        setRecomandari(response.data);
        console.log("\n\nrecomandari", response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row className={styles.recomandariContainer}>
      <Col className={styles.headerRecomandariContainer}>
        <Row>
          <h3>Vă recomandăm să vizitați...</h3>
        </Row>
      </Col>
      <Col className={styles.bodyRecomandariContainer}>
        <Carusel data={recomandari} titluCarousel='Obiective turistice' caruselPopup={true} />
      </Col>
    </Row>
  );
};

export default Recomandari;
