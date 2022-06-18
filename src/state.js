import { async } from "regenerator-runtime";
import axios from "../node_modules/axios/index";
export const initialState = {
  weatherItems: [],
  pagesLength: 0 ,
  currentPage : 0 ,
  tableType: '',
};
const URL =  `http://localhost:8080/api/weather/` ;

// transfering functions 

const fetch = async (endpoint, pageNum) =>{
  const respone = await axios.get (
    `${URL + endpoint + pageNum}`
  );
  return respone.data ;
}

const returnPageLength = async (endpoint) => {
  const respone = await axios.get(`${URL+ endpoint}`);
  console.log(respone.data.length);
  return respone.data.length;
};



// Update state function

export const updatePageLength = async (state) => {
  const totalItems = await returnPageLength('all') ; 
  const newState = {...state};
  newState.pagesLength = Math.ceil(totalItems / 10) ;
  return newState ;
}

export const fetchWeatherAction = async (state, endpoint, pageNum) => {
  const newState = {...state};
  console.log(newState)
  newState.weatherItems = await fetch(endpoint,pageNum);
  newState.currentPage = pageNum ;
  newState.tableType = endpoint ;
  return newState;
};

export const fetchAvgWeatherAction = async (state, endpoint, pageNum) => {
  const newState = {...state};
  console.log(newState)
  const weatherItems = await fetch(endpoint,pageNum);
  weatherItems.forEach(item => {
    item.air_temp = item.air_temp.toFixed(2);
  });
  newState.weatherItems = weatherItems ;
  newState.currentPage = pageNum ;
  newState.tableType = endpoint.split('?')[0] ;
  return newState;
};
