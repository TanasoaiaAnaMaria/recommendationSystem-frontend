import React from "react";

import styles from ".//DespreNoi.module.scss";
import Row from "react-bootstrap/Row";
import CardDespreNoi from ".//CardDespreNoi";

import imageUrl from '../../assets/imagini/despreNoi.svg'

const DespreNoi = () => {
  const data = [
    {
      title: "Despre noi",
      description: "We are a company that...",
    },
    {
      title: "Our Services",
      description: "We offer a range of services...",
    },
    {
      title: "Contact Us",
      description: "Get in touch with us...",
    },
    {
      title: "Contact Us",
      description: "Get in touch with us...",
    },
  ];

  return (
    <div className={`${styles.textImageContainer}`}>
      <div className={styles.textImageContainerImage}>
        <img src={imageUrl} alt="Image" />
      </div>
      <Row xs={1} md={2} className="g-4">
        {data.map((item) => (
          <CardDespreNoi className={`${styles.spatiuCards}`}
            key={item.title}
            title={item.title}
            description={item.description}
          />
        ))}
      </Row>
    </div>
  );
};

export default DespreNoi;
