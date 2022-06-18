import { async } from "regenerator-runtime";
import axios from "../node_modules/axios/index";
export const initialState = {
  weatherItems: [],
  pagesLength: 0 ,
  currentPage : 0 
};

// transfering functions 
const fetchAllWeather = async (pageNum) => {
  const respone = await axios.get(
    `http://localhost:8080/api/weather/all2?pageSize=12&pageNo=${pageNum}&sortBy=id`
  );
  console.log(respone.data.length);
  return respone.data;
};

const fetchAvgWeatherBasedOnDay = async (pageNum) => {
  const respone = await axios.get(
    `http://localhost:8080/api/weather/list/avg/day?page=${pageNum}`
  );
  console.log(respone.data.length);
  return respone.data;
};

const returnPageLength = async () => {
  const respone = await axios.get(`http://localhost:8080/api/weather/all`);
  console.log(respone.data.length);
  return respone.data.length;
};



// Update state function

export const updatePageLength = async (state) => {
  const totalItems = await returnPageLength() ; 
  const newState = {...state};
  newState.pagesLength = Math.ceil(totalItems / 10) ;
  return newState ;
}

export const fetchWeatherAction = async (state, pageNum) => {
  const newState = {...state};
  console.log(newState)
  newState.weatherItems = await fetchAllWeather(pageNum);
  newState.currentPage = pageNum ;
  return newState;
};

export const fetchAvgWeatherAction = async (state, pageNum) => {
  const newState = {...state};
  console.log(newState)
  const weatherItems = await fetchAvgWeatherBasedOnDay(pageNum);
  weatherItems.forEach(item => {
    item.air_temp = item.air_temp.toFixed(2);
  });
  newState.weatherItems = weatherItems ;
  newState.currentPage = pageNum ;
  return newState;
};
