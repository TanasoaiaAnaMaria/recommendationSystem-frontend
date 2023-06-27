import React, { useEffect, useState } from "react";
import styles from "./Card.module.scss";
import useAuth from "../../hooks/useAuth";
// import Popup from '../../pagini/PaginaPrincipala/Popup';
import useStateProvider from "../../hooks/useStateProvider";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRight } from "../../assets/icons/arrow-right.svg";
// import { ReactComponent as StiriDefaultImage } from '../../assets/images/Stiri-Default.svg';
import { RiEdit2Fill } from "react-icons/ri";
import { RiDeleteBinFill } from "react-icons/ri";

import Buton from "../Button/Button";
import moment from "moment";
import "moment/locale/ro";
import { Col, Row } from "react-bootstrap";

const Card = ({ onClick, style, data, isHomePage, caruselPopup }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const { user } = useAuth();

  const navigate = useNavigate();

  const { setAlert } = useStateProvider();
  const { fetchStiribyFilter, fetchStiriPublicate } = useStateProvider();

  function stopPropagation(e) {
    e.stopPropagation();
  }
  // //delete announce
  //   const handleDelete = async () => {
  //     try {
  //       const response = await deleteStireById(data?.id);
  //       if (response.status === 200) {
  //         togglePopup();
  //         fetchStiribyFilter();
  //         fetchStiriPublicate();
  //         setAlert({ type: 'success', message: 'Deleted' });
  //       }
  //     } catch (error) {
  //       togglePopup();
  //       setAlert({
  //         type: 'danger',
  //         message: 'Something went wrong',
  //       });
  //     }
  //   };
  //   //popup
  const togglePopup = (props) => {
    setOpenPopup(!openPopup);
  };

  return (
    <div className={styles.cards}>
      <Row className={`${styles.listCardContent}`}>
        <Row className={styles.contentCard}>
          <Col className={styles.cardTitlu}>{data?.descriere}</Col>
        </Row>

        <Row className={styles.imagesDiv}>
          <img
            src={data?.imagine}
            alt="Stiri"
            className={`${styles.ListCardImg}`}
          />
        </Row>

        <Col className={`${styles.listTitluAndLocation} ${styles.col}`}>
          {user?.role && (
            <div onClick={stopPropagation} className={styles.controls}>
              <RiEdit2Fill
                className={styles.edit}
                onClick={() => {
                  console.log(`${data?.id}`);
                }}
              />

              <RiDeleteBinFill
                className={styles.delete}
                onClick={() => togglePopup()}
              />
            </div>
          )}
        </Col>
      </Row>
      {/* POPUP delete */}
      {/* {
        openPopup && (
          <Popup
            caruselPopup={caruselPopup}
            setOpenPopup={setOpenPopup}
            openPopup={openPopup}
            content={
              <div className={styles.popup}>
                <h3 className={styles.titlePopup}>Ștergere știre</h3>
                <p className={styles.descriptionPopup}>
                  Această acțiune este permanentă și nu poate fi anulată.
                </p>
                <div className={styles.butonsPopup}>
                  <button
                    className={styles.deletePopup}
                    onClick={(e) => {
                      handleDelete(e);
                    }
                    }
                  >
                    Șterge
                  </button>
                  <button
                    className={styles.backPopup}
                    onClick={() => setOpenPopup(!openPopup)}
                  >
                    Anulează
                  </button>
                </div>
              </div>
            }
          />
        )
      } */}
    </div>
  );
};

export default Card;
