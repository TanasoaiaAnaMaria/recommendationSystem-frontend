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

const MapContainer = (props, { children }) => {
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
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
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

  return (
    <Box position="relative" w="100%" h="700px">
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

      <Box
        p={4}
        borderRadius="lg"
        m={4}
        bgColor="white"
        shadow="base"
        minW="container.md"
        zIndex="1"
      >
        <HStack spacing={2} justifyContent="space-between">
          <Box flexGrow={1}>
            <Autocomplete>
              <Input type="text" placeholder="Origin" ref={originRef} />
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input
                type="text"
                placeholder="Destination"
                ref={destiantionRef}
              />
            </Autocomplete>
          </Box>

          <ButtonGroup>
            <Button colorScheme="pink" type="submit" onClick={calculateRoute}>
              Calculate Route
            </Button>
            <IconButton
              aria-label="center back"
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent="space-between">
          <Text>Distance: {distance} </Text>
          <Text>Duration: {duration} </Text>
          <IconButton
            aria-label="center back"
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.panTo(center);
              map.setZoom(15);
            }}
          />
        </HStack>
      </Box>
    </Box>
  );
};

export default MapContainer;
