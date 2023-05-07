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
    const response = await axios.get("/persoana/" + id);
    return response;
  } catch (error) {
    console.error(error);
  }
};

// ---------------------------- USER ----------------------------------
// login  authenticate
export const login = async (email, password) => {
  try {
    const response = await axios.get("/persoana/autentificare?email="+email+"&parola="+password);
    return response;
  } catch (error) {
    console.log(error);
  }
};


// register
export const register = async (data) => {
  try {
    const response = await axios.post("/persoana/inregistrare?nume="+data.nume+"&prenume="+data.prenume+"&email=" + data.email + "&parola=" + data.parola
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};