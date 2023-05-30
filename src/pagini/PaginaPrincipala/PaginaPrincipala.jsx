import React from "react";

import Banner from "../../componente/Banner/Banner.jsx";
import DespreNoi from "../../componente/DespreNoi/DespreNoi.jsx";
import MapContainer from "../../componente/Harta/MapContainer .jsx";

import styles from './PaginaPrincipala.module.scss';

const PaginaPrincipala = () => {

  const center = { lat: 47.63333, lng: 26.25}

  return (
    <div className={styles.bodyContainer}>
      <Banner />
      <DespreNoi />
      {/* <MapContainer center={center} zoom={4.5}></MapContainer> */}
    </div>
  );
};

export default PaginaPrincipala;
