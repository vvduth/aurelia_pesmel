import { async } from "regenerator-runtime";
import axios from "../node_modules/axios/index";
export const initialState = {
  weatherItems: [],
  pagesLength: 0 ,
  currentPage : 0 
};
const fetchAllWeather = async (pageNum) => {
  const respone = await axios.get(
    `http://localhost:8080/api/weather/all2?pageSize=12&pageNo=${pageNum}&sortBy=id`
  );
  console.log(respone.data.length);
  return respone.data;
};

const returnPageLength = async () => {
  const respone = await axios.get(`http://localhost:8080/api/weather/all`);
  console.log(respone.data.length);
  return respone.data.length;
};
export const fetchWeatherAction = async (state, pageNum) => {
  const newState = {...state};
  console.log(newState)
  newState.weatherItems = await fetchAllWeather(pageNum);
  newState.currentPage = pageNum ;
  return newState;
};

export const listWeatherWithPagination = async (pageNumber) => {
  const respone = await axios.get(
    `http://localhost:8080/api/weather/all2?pageSize=10&pageNo=${pageNumber}&sortBy=id`
  );
  
  console.log(respone.data);
  return pageNumber ;
};


export const updatePageLength = async (state) => {
  const totalItems = await returnPageLength() ; 
  console.log("action updat total pages");
  const newState = {...state};
  newState.pagesLength = Math.ceil(totalItems / 10) ;
  return newState ;
}