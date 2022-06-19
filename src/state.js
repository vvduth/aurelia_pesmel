import { async } from "regenerator-runtime";
import axios from "../node_modules/axios/index";
export const initialState = {
  weatherItems: [],
  pagesLength: 0,
  currentPage: 0,
  tableType: "",
  ascending: true,
};
const URL = `http://localhost:8080/api/weather/`;

// transfering functions

const fetch = async (endpoint, pageNum) => {
  const respone = await axios.get(`${URL + endpoint + pageNum}`);
  return respone.data;
};
const fetchOptional = async (type, day, month, year) => {
  let dayQuery;
  let monthQuery;
  let yearQuery;
  dayQuery = `day=${day}`;
    monthQuery = `&month=${month}`;
    yearQuery = `year=${year}`;
  if (day ===  undefined || day === null || day === '') {
    dayQuery = '';
  } 
   if (month === undefined || month === null || month === '') {
    monthQuery = '';
  } 
   if (year === undefined) {
    yearQuery = '';
  } 
  console.log(`${URL + type}/date?${dayQuery}${monthQuery}&${yearQuery}`);
  const respone = await axios.get(`${URL + type}/date?${dayQuery}${monthQuery}&${yearQuery}`);
  console.log(respone.data);
  return respone.data ;
};

const returnPageLength = async (endpoint) => {
  const respone = await axios.get(`${URL + endpoint}`);
  console.log(respone.data.length);
  return respone.data.length;
};

// Update state function

export const sort = (state) => {
  const newState = { ...state };
  newState.weatherItems.sort(function (a, b) {
    if (newState.ascending) {
      return a.air_temp - b.air_temp;
    } else {
      return b.air_temp - a.air_temp;
    }
  });
  newState.ascending = !newState.ascending;
  return newState;
};

export const sortByDay = (state) => {
  const newState = { ...state };
  newState.weatherItems.sort(function (a, b) {
    if (newState.ascending) {
      return a.day - b.day;
    } else {
      return b.day - a.day;
    }
  });
  newState.ascending = !newState.ascending;
  return newState;
};

export const updatePageLength = async (state) => {
  const totalItems = await returnPageLength("all");
  const newState = { ...state };
  newState.pagesLength = Math.ceil(totalItems / 10);
  return newState;
};

export const fetchWeatherAction = async (state, endpoint, pageNum) => {
  const newState = { ...state };
  if (pageNum === undefined) {
    newState.weatherItems = [];
  } else {
    console.log(newState);
    newState.weatherItems = await fetch(endpoint, pageNum);
    newState.currentPage = pageNum;
    newState.tableType = endpoint;
  }

  return newState;
};

export const fetchAvgWeatherAction = async (state, endpoint, pageNum) => {
  const newState = { ...state };
  if (pageNum === undefined) {
    newState.weatherItems = [];
  } else {
    console.log(newState);
    const weatherItems = await fetch(endpoint, pageNum);
    weatherItems.forEach((item) => {
      item.air_temp = item.air_temp.toFixed(2);
    });
    newState.weatherItems = weatherItems;
    newState.currentPage = pageNum;
    newState.tableType = endpoint.split("?")[0];
  }
  return newState;
};

export const fetchOptionalAction = async (state, type, day, month, year) => {
  const newState = { ...state };
  const newItems = await fetchOptional(type,day, month, year);
  if (type === 'avg') {
    newState.weatherItems = [] ;
    newState.weatherItems.push(newItems.toFixed(2));
  } else {
    newState.weatherItems = newItems ;
  }
  newState.tableType = type ;
  console.log(newState)
  return newState ;
}
