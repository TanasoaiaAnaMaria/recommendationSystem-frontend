import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.headers = {
  // 'Content-Type': 'multipart/form-data',
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
};

// access control axios
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

// ---------------------------- Calls ----------------------------------

export const getPersoanaDupaId = async (id) => {
  try {
    const response = await axios.get("/persoana/get/" + id);
    return response;
  } catch (error) {
    console.error(error);
  }
};

// ---------------------------- USER ----------------------------------
// login  authenticate
export const login = async (email, password) => {
  try {
    const response = await axios.get(
      "/persoana/autentificare?email=" + email + "&parola=" + password
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

// register
export const register = async (data) => {
  try {
    const response = await axios.post(
      "/persoana/inregistrare?nume=" +
        data.nume +
        "&prenume=" +
        data.prenume +
        "&email=" +
        data.email +
        "&parola=" +
        data.parola
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

// updateUser
export const updateUser = async (data,preferinte) => {
  try {
    const response = await axios.put(
      "/persoana/update/" +
        data.id +
        "?nume=" +
        data.nume +
        "&prenume=" +
        data.prenume +
        "&email=" +
        data.email +
        "&parola=" +
        data.parola+
        "&preferinte="+
        preferinte
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

// new

export const getPlacesByID = async (id, lat, lng, radius, params) => {
  try {
    const response = await axios.get("/places/search/" + id + '/' + lat + '/' + lng + '/' + radius + '/' + params );
    return response;
  } catch (error) {
    console.error(error);
  }
};


export const putScoateUnLocDinPreditcie= async (id, params) => {
  try {
    const response = await axios.put("/persoana/schimbaPredictia/" + id + '?cuvant=' + params );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getPredictiePersoanaByID = async (id, lat, lng) => {
  try {
    const response = await axios.get("/persoana/predictie/" + id + '?latitudine=' + lat + '&longitudine=' + lng );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getGeocodingOfAddress = async (address) => {
  try {
    const response = await axios.get("/geocoding/geocode/" + address );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getNameOfAddress = async (lat, lng) => {
  try {
    const response = await axios.get("/location/name/" + lat + "/" + lng );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getImaginiObiectiv = async (nume) => {
  try {
    const response = await axios.get("/placeImages?placeName=" + nume );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getRecomandariAcasa = async () => {
  try {
    const response = await axios.get("/recomandari" );
    return response;
  } catch (error) {
    console.error(error);
  }
};

