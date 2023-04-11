import { createContext, useState, useEffect } from 'react';
import { getStiriByStatus, getStiriByFilter, getMeciuriByFilter, getPersonalByFilter, getDivizii, getEditii, getCluburiSportive, getPremiiPersonalByFilter } from '../api/API';
import parse from 'date-fns/parse'

const StateContext = createContext({});

export const StateProvider = ({ children }) => {



  return 
};

export default StateContext;
