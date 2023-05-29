import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import Harta from "../../componente/Harta/Harta";
import useAuth from "../../hooks/useAuth";
import styles from "./Descopera.module.scss";
import MapContainer from "../../componente/Harta/MapContainer ";
import MeniuCautare from "../../componente/Harta/MeniuCautare";

const Descopera = () => {
  const center = { lat: 47.63333, lng: 26.25 };
  const { user, userID,isLoggedIn } = useAuth();
  const [currentLocation, setCurrentLocation] = useState({
    lat: 47.6468952302915,
    lng: 26.2429388802915,
  });
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const navigate = useNavigate();
  // how to create an useEffect which will update the latitude and longitude every 5 seconds?

  useEffect(() => {
    setInterval(() => {
      if (user?.preferinte !== null) {
        console.log("This will run after 12 seconds!");

        if (navigator.geolocation) {
          navigator.geolocation.watchPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setCurrentLocation({ lat: latitude, lng: longitude });
              console.log({ lat: latitude, lng: longitude });
            },
            (error) => {
              console.error("Error getting user location:", error);
            }
          );
        } else {
          console.log("Geolocation is not supported by this browser.");
        }
      }
    }, 1000);
    //   return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (user?.preferinte.length < 1) {
      setShowModal1(false);
      setShowModal2(true);
    }
  }, [user?.preferinte]);

  useEffect(() => {
    if (!isLoggedIn()) {
      setShowModal2(false);
      setShowModal1(true);
    }
  }, [userID]);


  const handleCloseModal1 = () => {
    setShowModal1(false);
    navigate("/");
  };
  const handleCloseModal2 = () => {
    setShowModal2(false);
    navigate("/");
  };

  const handleGoToPreferences = () => {
    setShowModal1(false);
    navigate("/profilulMeu/preferinte");
  };
  const login = () => {
    setShowModal2(false);
    navigate("/login");
  };
  const register = () => {
    setShowModal2(false);
    navigate("/register");
  };
  return (
    <div className={styles.descoperaContainer}>
      {user !== null ? (
        <>
          {user?.preferinte.length > 0? (
            <>
            <MapContainer
              center={currentLocation}
              zoom={15}
              currentLocation={currentLocation}
            />
            {/* <MeniuCautare/> */}
            </>
          ) : (
            <>
              <Modal show={showModal2}>
                <Modal.Header
                  closeButton
                  className="d-flex justify-content-center"
                  onHide={handleCloseModal2}
                >
                  <Modal.Title>
                    Selectarea preferintelor este necesara
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>
                    Pentru a putea sa iti recomandam cel mai potrivit loc pentru
                    tine este necesara setarea preferintelor.
                  </p>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                  <Button variant="dark" onClick={handleGoToPreferences}>
                    Seteaza preferinte
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          )}
        </>
      ) : (
        <>
          <Modal show={showModal1}>
            <Modal.Header
              closeButton
              className="d-flex justify-content-center"
              onHide={handleCloseModal1}
            >
              <Modal.Title>Autentificare necesara</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                Pentru a putea sa iti recomandam cel mai potrivit loc pentru
                tine este necesara existenta unui cont.
              </p>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
              <Button variant="outline-success" onClick={login}>
                Autentificare
              </Button>
              <Button variant="dark" onClick={register}>
                Inregistrare
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Descopera;
