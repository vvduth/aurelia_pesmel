import { HttpClient } from "aurelia-fetch-client";
import axios from "../../node_modules/axios/index";

export class weather {

  constructor(id, air_temp, year, month, day, time) {
    this.id = id ;
    this.air_temp = air_temp ;
    this.year = year ; 
    this.month = month ; 
    this.year = year ; 
    this.day = day ;
    this.time = time ; 
  }
  async fetchAllWeather() {

   const respone = await axios.get(`http://localhost:8080/api/weather/all2?pageSize=5&pageNo=100&sortBy=id`);
   console.log(respone.data);
  }
}
