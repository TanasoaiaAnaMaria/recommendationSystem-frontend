import { React, useState, useRef } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
  Select,
} from "@chakra-ui/react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  InfoWindow,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { FaLocationArrow, FaTimes } from "react-icons/fa";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { Dropdown } from "react-bootstrap";
import { FaCar, FaWalking, FaBicycle, FaBus } from "react-icons/fa";
import style from "./MapContainer.module.scss";
import { getNameOfAddress, getPlacesByID } from "../../api/API";
import useAuth from "../../hooks/useAuth";

const MapContainer = (props, { children }) => {
  const {user}=useAuth();
  const [locatieCurentaNume, setLocatieCurentaNume] = useState("");

  const [showMenuAfisareUnObiectiv, setShowMenuAfisareUnObiectiv] =
    useState(false);
  const [
    showMenuAfisareMaiMulteObiective,
    setShowMenuAfisareMaiMulteObiective,
  ] = useState(false);
  const [showMenuCautareSingur, setShowMenuCautareSingur] = useState(false);
  const [titluMiniNav, setTitluMiniNav] = useState(
    "Alege serviciile potrivite pentru tine"
  );
  const [travelMode, setTravelMode] = useState("DRIVING");

  const { width } = useWindowDimensions();
  const center = {
    lat: 47.6468952302915,
    lng: 26.2429388802915,
  };
  // const libraries = ["places"];
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [hoveredPinPosition, setHoveredPinPosition] = useState(null);

  // new
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  async function calculateRoute() {
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    console.log(travelMode)
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode[travelMode],
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destiantionRef.current.value = "";
  }
  // end new

  if (!isLoaded) {
    return "";
  }

  const numeLocatieCurenta = async() =>{
    try {
      const raspuns = await getNameOfAddress(props.currentLocation.lat,props.currentLocation.lng)
      if(raspuns.status === 200)
      {
          console.log(raspuns)
          setLocatieCurentaNume(raspuns.data)
      }
    } catch (error) {
      
    }
  }

  return (
    <Box position="relative" w="100%" h="650px">
      <Box textAlign="center" className="mb-3">
        <Text fontSize="2xl">Viziteaza ceea ce ti se potriveste</Text>
      </Box>
      <Box
        className="mb-3"
        style={{ zIndex: 2, display: "flex", justifyContent: "center" }}
      >
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-services">
            {titluMiniNav}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => {
                setShowMenuAfisareUnObiectiv(true);
                setShowMenuAfisareMaiMulteObiective(false);
                setShowMenuCautareSingur(false);
                setTitluMiniNav(
                  "Descopera cel mai potrivit obiectiv pentru tine"
                );
              props.predict();
              props.currentLocation && (
                numeLocatieCurenta()
              )
              
              }}
            >
              <Tooltip label="In functie de preferintele tale">
                Descopera cel mai potrivit obiectiv pentru tine
              </Tooltip>
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setShowMenuAfisareUnObiectiv(false);
                setShowMenuAfisareMaiMulteObiective(true);
                setShowMenuCautareSingur(false);
                setTitluMiniNav("Descopera toate obiectivele apropiate");
              }}
            >
              <Tooltip label="Ce ti se potrivesc preferintelor tale">
                Descopera toate obiectivele apropiate
              </Tooltip>
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setShowMenuAfisareUnObiectiv(false);
                setShowMenuAfisareMaiMulteObiective(false);
                setShowMenuCautareSingur(true);
                setTitluMiniNav("Cauta propria destinatie");
              }}
            >
              Cauta propria destinatie
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Box>

      {showMenuAfisareUnObiectiv && (
        <Box
        p={width > 550 ? 4 : 1}
        borderRadius="lg"
        m={width > 550 ? 4 : 1}
        bgColor="white"
        shadow="base"
        zIndex="1"
        bg="#abd1c6"
      >
        <HStack
          spacing={width < 550 ? 0 : 6}
          justifyContent="space-between"
          flexDirection={width < 550 ? "column" : "row"}
        >
          <Box flexGrow={1} className={width < 550 && "mt-3 ps-2 pe-2"}>
              <Input
                type="text"
                placeholder="Locatia curenta"
                ref={originRef}
                style={{ paddingRight: "2rem !important" }}
                value={locatieCurentaNume}
                readOnly
              />
          </Box>

          <Box flexGrow={1} className={width < 550 && "mt-3 ps-2 pe-2 mb-3"}>
              <Input
                type="text"
                placeholder="Destinatie"
                ref={destiantionRef}
                value={props.predictLocation}
                readOnly
              />
          </Box>

          <ButtonGroup>
            <Button
              colorScheme="pink"
              type="submit"
              onClick={calculateRoute}
              className={style.closeRoutes}
            >
              Calculeaza ruta
            </Button>
            <IconButton
              aria-label="center back"
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>

        <div className={style.infoRoutes}>
          <Text>Distanta: {distance} </Text>
          <Text>Durata: {duration} </Text>
          <Button
            onClick={() => {
              setShowMenuCautareSingur(false);
              setTitluMiniNav("Alege serviciile potrivite pentru tine");
            }}
          >
            <Text className={style.closeRoutes}>Inchide</Text>
          </Button>
        </div>

        {directionsResponse && (
          <Box className={style.iconInfoRoutes}>
            <IconButton
              aria-label="Driving"
              icon={<FaCar />}
              onClick={() => {
                setTravelMode("DRIVING");
                calculateRoute();
              }}
              sx={{
                "&:hover": {
                  transform: "scale(1.2)",
                },
              }}
              style={{ fontSize: travelMode === "DRIVING" ?  "24px" : "16px" }}
            />
            <IconButton
              aria-label="Walking"
              icon={<FaWalking />}
              onClick={() => {
                setTravelMode("WALKING");
                calculateRoute();
              }}
              sx={{
                "&:hover": {
                  transform: "scale(1.2)",
                },
              }}
              style={{ fontSize: travelMode === "WALKING" ?  "24px" : "16px" }}
            />
            <IconButton
              aria-label="Bicycling"
              icon={<FaBicycle />}
              onClick={() => {
                setTravelMode("BICYCLING");
                calculateRoute();
              }}
              sx={{
                "&:hover": {
                  transform: "scale(1.2)",
                },
              }}
              style={{ fontSize: travelMode === "BICYCLING" ? "24px" : "16px" }}
            />
            <IconButton
              aria-label="Transit"
              icon={<FaBus />}
              onClick={() => {
                setTravelMode("TRANSIT");
                calculateRoute();
              }}
              sx={{
                "&:hover": {
                  transform: "scale(1.2)",
                },
              }}
              style={{ fontSize: travelMode === "TRANSIT" ?  "24px" : "16px" }}
            />
          </Box>
        )}
      </Box>
      )}

      {showMenuAfisareMaiMulteObiective && (
        <Box
          p={width > 550 ? 4 : 1}
          borderRadius="lg"
          m={width > 550 ? 4 : 1}
          bgColor="white"
          shadow="base"
          zIndex="1"
          bg="#abd1c6"
        >
          <Box textAlign="center" className="mb-3">
            <Text fontSize="2xl">
              Cele mai apropiate obiective turistice ce se potrivesc
              preferintelor tale sunt:{" "}
            </Text>
          </Box>
        </Box>
      )}

      {showMenuCautareSingur && (
        <Box
          p={width > 550 ? 4 : 1}
          borderRadius="lg"
          m={width > 550 ? 4 : 1}
          bgColor="white"
          shadow="base"
          zIndex="1"
          bg="#abd1c6"
        >
          <HStack
            spacing={width < 550 ? 0 : 6}
            justifyContent="space-between"
            flexDirection={width < 550 ? "column" : "row"}
          >
            <Box flexGrow={1} className={width < 550 && "mt-3 ps-2 pe-2"}>
              <Autocomplete>
                <Input
                  type="text"
                  placeholder="Locatia curenta"
                  ref={originRef}
                  style={{ paddingRight: "2rem !important" }}
                />
              </Autocomplete>
            </Box>

            <Box flexGrow={1} className={width < 550 && "mt-3 ps-2 pe-2 mb-3"}>
              <Autocomplete>
                <Input
                  type="text"
                  placeholder="Destinatie"
                  ref={destiantionRef}
                />
              </Autocomplete>
            </Box>

            <ButtonGroup>
              <Button
                colorScheme="pink"
                type="submit"
                onClick={calculateRoute}
                className={style.closeRoutes}
              >
                Calculeaza ruta
              </Button>
              <IconButton
                aria-label="center back"
                icon={<FaTimes />}
                onClick={clearRoute}
              />
            </ButtonGroup>
          </HStack>

          <div className={style.infoRoutes}>
            <Text>Distanta: {distance} </Text>
            <Text>Durata: {duration} </Text>
            <Button
              onClick={() => {
                setShowMenuCautareSingur(false);
                setTitluMiniNav("Alege serviciile potrivite pentru tine");
              }}
            >
              <Text className={style.closeRoutes}>Inchide</Text>
            </Button>
          </div>

          {directionsResponse && (
            <Box className={style.iconInfoRoutes}>
              <IconButton
                aria-label="Driving"
                icon={<FaCar />}
                onClick={() => {
                  setTravelMode("DRIVING");
                  calculateRoute();
                }}
                sx={{
                  "&:hover": {
                    transform: "scale(1.2)",
                  },
                }}
                style={{ fontSize: travelMode === "DRIVING" ?  "24px" : "16px" }}
              />
              <IconButton
                aria-label="Walking"
                icon={<FaWalking />}
                onClick={() => {
                  setTravelMode("WALKING");
                  calculateRoute();
                }}
                sx={{
                  "&:hover": {
                    transform: "scale(1.2)",
                  },
                }}
                style={{ fontSize: travelMode === "WALKING" ?  "24px" : "16px" }}
              />
              <IconButton
                aria-label="Bicycling"
                icon={<FaBicycle />}
                onClick={() => {
                  setTravelMode("BICYCLING");
                  calculateRoute();
                }}
                sx={{
                  "&:hover": {
                    transform: "scale(1.2)",
                  },
                }}
                style={{ fontSize: travelMode === "BICYCLING" ? "24px" : "16px" }}
              />
              <IconButton
                aria-label="Transit"
                icon={<FaBus />}
                onClick={() => {
                  setTravelMode("TRANSIT");
                  calculateRoute();
                }}
                sx={{
                  "&:hover": {
                    transform: "scale(1.2)",
                  },
                }}
                style={{ fontSize: travelMode === "TRANSIT" ?  "24px" : "16px" }}
              />
            </Box>
          )}
        </Box>
      )}

      {/* Google Map Box */}
      <GoogleMap
        center={props.center}
        zoom={props.zoom}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={{
          zoomControl: true,
          streetViewControl: true,
          mapTypeControl: false,
          fullscreenControl: true,
        }}
        onLoad={(map) => {
          setMap(map);
          map.setOptions({ disableDefaultUI: true });
        }}
      >
        {props.currentLocation && (
          <>
            <Marker
              position={props.currentLocation}
              onMouseOver={() => setHoveredPinPosition(props.currentLocation)}
              onMouseOut={() => setHoveredPinPosition(null)}
            />
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </>
        )}
        {hoveredPinPosition && (
          <InfoWindow position={hoveredPinPosition}>
            <div>
              Latitude: {hoveredPinPosition.lat.toFixed(6)}
              <br />
              Longitude: {hoveredPinPosition.lng.toFixed(6)}
            </div>
          </InfoWindow>
        )}
        {children}
      </GoogleMap>
    </Box>
  );
};

export default MapContainer;
