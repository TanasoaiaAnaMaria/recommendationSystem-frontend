import { createContext, useState, useEffect } from 'react';
import { getStiriByStatus, getStiriByFilter, getMeciuriByFilter, getPersonalByFilter, getDivizii, getEditii, getCluburiSportive, getPremiiPersonalByFilter } from '../api/API';
import parse from 'date-fns/parse'

const StateContext = createContext({});

export const StateProvider = ({ children }) => {

  // alert
  const [alert, setAlert] = useState(null);
  if (alert) {
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  }

  return <StateContext.Provider
  value={{
    alert,
    setAlert,

  }}
>{children}</StateContext.Provider>;
};

export default StateContext;
