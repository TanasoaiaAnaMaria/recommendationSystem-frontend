import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Geolocation from "react-native-geolocation-service";

import Harta from "../../componente/Harta/Harta";
import useAuth from "../../hooks/useAuth";
import styles from "./Descopera.module.scss";
import MapContainer from "../../componente/Harta/MapContainer";
import MeniuCautare from "../../componente/Harta/MeniuCautare";
import {
  getGeocodingOfAddress,
  getPlacesByID,
  getPredictiePersoanaByID,
  putScoateUnLocDinPreditcie,
} from "../../api/API";
import useStateProvider from "../../hooks/useStateProvider";

const Descopera = () => {
  const center = { lat: 47.63333, lng: 26.25 };
  const { user, userID, isLoggedIn } = useAuth();
  const { listaPreferintePrioritizate, setListaPreferintePrioritizate} = useStateProvider();
  const [currentLocation, setCurrentLocation] = useState({
    lat: 47.64592192553534,
    lng: 26.241071867666925,
  });
  const [predictLocation, setPredictLocation] = useState("");
  const [predictLocationPoze, setPredictLocationPoze] = useState("");

  const [predictieIgnorata, setPredictieIgnorata] = useState("");

  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const navigate = useNavigate();

  // how to create an useEffect which will update the latitude and longitude every 5 seconds?

  // const fetch = require('node-fetch');
  const apiKey = "AIzaSyDyOZeonUAedGzg_bJDtDWZX0gK3nd5E88";
  useEffect(() => {
    setInterval(() => {

      // Geolocation.getCurrentPosition(
      //   (position) => {
      //     const { latitude, longitude } = position.coords;
      //     setCurrentLocation({ lat: latitude, lng: longitude });
      //     console.log({ lat: latitude, lng: longitude });
      //   },
      //   (error) => {
      //     console.error("Error getting current location:", error);
      //   },
      //   { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      // );

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setCurrentLocation({ lat:position.coords.latitude, lng:position.coords.longitude });
          console.log(position.coords);
        });
      }

    }, 5000);
    //   return () => clearInterval(timer);
  }, []);

  // useEffect(() => {
  //   setInterval(() => {
  //     if (user?.preferinte !== null) {
  //       console.log("This will run after 10 seconds!");

  //       if (navigator.geolocation) {
  //         const positionOptions = {
  //           enableHighAccuracy: true,
  //           timeout: 10000,
  //           maximumAge: 0,
  //           travelMode: 'walking'
  //         };

  //         navigator.geolocation.watchPosition(
  //           (position) => {
  //             const { latitude, longitude } = position.coords;
  //             setCurrentLocation({ lat: latitude, lng: longitude });
  //             console.log({ lat: latitude, lng: longitude });
  //           },
  //           (error) => {
  //             console.error("Error getting user location:", error);
  //           },
  //           positionOptions
  //         );
  //       } else {
  //         console.log("Geolocation is not supported by this browser.");
  //       }
  //     }
  //   }, 10000);
  //   //   return () => clearInterval(timer);
  // }, []);

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
  const handleCloseModal3 = () => {
    setShowModal3(false);
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

  const predict = async () => {
    try {
      let string = "";
      if(listaPreferintePrioritizate!==null){
        listaPreferintePrioritizate.map((ls)=>
        string=string+ls+" "
        )
      }
      console.log(string);
      const resp1 = await getPlacesByID(
        user.id,
        currentLocation.lat,
        currentLocation.lng,
        1000,
        listaPreferintePrioritizate !== null ? string : user.preferinte
      );
      if (resp1.status === 200) {
        // console.log(resp1);
        try {
          const resp2 = await getPredictiePersoanaByID(
            user.id,
            currentLocation.lat,
            currentLocation.lng
            );
            console.log(resp2);
          if (resp2.status === 200) {
            setPredictLocationPoze(resp2.data);
            setPredictieIgnorata(resp2.data);
            try {
              const resp3 = await getGeocodingOfAddress(
                resp2.data + "Suceava Romania"
              );
              if (resp3.status === 200) {
                console.log(resp3);
                // setPredictLocation(resp3.data[0].geometry.location)
                setPredictLocation(
                  resp2.data + " " + resp3.data.results[0].formatted_address
                );
                // console.log(resp3.data.results[0].formatted_address)
              }
            } catch (error) {}
          }
        } catch (error) {}
      }
    } catch (error) {}
  };

  const repredict = async () => {
    try {
      const resp1 = await putScoateUnLocDinPreditcie(
        user.id,
        predictieIgnorata
      );
      if (resp1.status === 200) {
        console.log(resp1);
        try {
          const resp2 = await getPredictiePersoanaByID(
            user.id,
            currentLocation.lat,
            currentLocation.lng
          );
          if (resp2.status === 200) {
            console.log(resp2);
            if (resp2.data === "") {
              setShowModal3(true)
            } else {
              try {
                const resp3 = await getGeocodingOfAddress(
                  resp2.data + " Suceava Romania"
                );
                setPredictLocationPoze(resp2.data);
                setPredictieIgnorata(resp2.data);
                if (resp3.status === 200) {
                  console.log(resp3);
                  // setPredictLocation(resp3.data[0].geometry.location)
                  setPredictLocation(
                    resp2.data + " " + resp3.data.results[0].formatted_address
                  );
                  console.log(resp3.data.results[0].formatted_address);
                }
              } catch (error) {}
            }
          }
        } catch (error) {}
      }
    } catch (error) {}
  };

  const predictListaApropiere = async () => {
    try {
      const resp1 = await getPlacesByID(
        user.id,
        currentLocation.lat,
        currentLocation.lng,
        1000,
        user.preferinte
      );
      if (resp1.status === 200) {
        console.log(resp1);
      }
    } catch (error) {}
  };

  

  return (
    <div className={styles.descoperaContainer}>
      {user !== null ? (
        <>
          {user?.preferinte.length > 0 ? (
            <>
            {/* {console.log('LOCATIE \n\n\n',currentLocation)} */}
              <MapContainer
                center={currentLocation}
                zoom={15}
                currentLocation={currentLocation}
                predict={predict}
                repredict={repredict}
                predictLocation={predictLocation}
                predictLocationPoze={predictLocationPoze}
                predictListaApropiere={predictListaApropiere}
              />
                <Modal show={showModal3}>
                <Modal.Header
                  closeButton
                  className="d-flex justify-content-center"
                  onHide={handleCloseModal3}
                >
                  <Modal.Title>
                    Aceasta a fost ultimul obiectiv conform recomandarii noastre
                  </Modal.Title>
                </Modal.Header>
                <Modal.Footer className="d-flex justify-content-center">
                  <Button variant="dark"
                  onClick={() => 
                    {predict();
                    setShowModal3(false)}}>
                    Repredict
                  </Button>
                </Modal.Footer>
              </Modal>
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
