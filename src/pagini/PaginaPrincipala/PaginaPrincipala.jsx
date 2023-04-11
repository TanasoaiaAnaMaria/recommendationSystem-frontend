import React from "react";

import Banner from "../../componente/Banner/Banner.jsx";
import DespreNoi from "../../componente/DespreNoi/DespreNoi.jsx";

import styles from './PaginaPrincipala.module.scss';

const PaginaPrincipala = () => {
  return (
    <div className={styles.bodyContainer}>
      <Banner />
      <DespreNoi />
    </div>
  );
};

export default PaginaPrincipala;
