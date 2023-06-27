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
  
  const [listaPreferintePrioritizate, setListaPreferintePrioritizate] = useState(null);

  
  const [preferinteUserProfil, setPreferinteUserProfil] = useState({
    atractiiNaturale: {
      park: {
        label: "Parcuri",
        value: "park",
        checked: "0",
      },
      garden: {
        label: "Gradini",
        value: "garden",
        checked: "0",
      },
      campground: {
        label: "Camping",
        value: "campground",
        checked: "0",
      },
      zoo: {
        label: "Zoo",
        value: "zoo",
        checked: "0",
      },
    },
    cultura: {
      library: {
        label: "Librarii",
        value: "library",
        checked: "0",
      },
      university: {
        label: "Universitati",
        value: "university",
        checked: "0",
      },
      theater: {
        label: "Teatre",
        value: "theater",
        checked: "0",
      },
      museum: {
        label: "Muzee",
        value: "museum",
        checked: "0",
      },
      art_galery: {
        label: "Galerii de arta",
        value: "art_galery",
        checked: "0",
      },
      church: {
        label: "Biserici",
        value: "church",
        checked: "0",
      },
    },

    gastronomie: {
      bakery: {
        label: "Brutarii / Patiserii",
        value: "bakery",
        checked: "0",
      }, // nu bakery?
      restaurant: {
        label: "Restaurante",
        value: "restaurant",
        // value: "restaurants",
        checked: "0",
      },
    },

    divertisment: {
      amusement_park: {
        label: "Parcuri de distractie",
        value: "amusement_park",
        checked: "0",
      },
      bar: {
        label: "Pub / Bar",
        value: "bar",
        checked: "0",
      },
      casino: {
        label: "Casino",
        value: "casino",
        checked: "0",
      },
      movie: {
        label: "Cinema",
        value: "movie",
        checked: "0",
      },
    },
  });


  return <StateContext.Provider
  value={{
    alert,
    setAlert,
    listaPreferintePrioritizate,
    setListaPreferintePrioritizate,
    preferinteUserProfil,
    setPreferinteUserProfil,
  }}
>{children}</StateContext.Provider>;
};

export default StateContext;
