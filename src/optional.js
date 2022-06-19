

import { fetchAvgWeatherAction, fetchOptionalAction } from "./state";
import { inject } from "../node_modules/aurelia-dependency-injection";
import { Store } from "../node_modules/aurelia-store";

import { PLATFORM } from "aurelia-framework";
@inject(Store)
export class optional {

  day = null ;
  month = null ; 
  year = null ; 

  max = "max";
  min = "min";
  avg = "avg";

  selectedType=[];
  

  constructor(store) {
    this.heading = "optional Temperature"
    this.store = store ; 
    this.store.registerAction('optionalAction', fetchAvgWeatherAction);
    this.store.registerAction('fetchoptionalAction', fetchOptionalAction);
    this.store.state.weatherItems = this.dispatchDemo('list/min/day?page=' ,) 
  }
  bind() {
    this.subscription = this.store.state.subscribe(
      (state) => this.state = state
    );
  }

  unbind() {
    this.subscription.unsubscribe();
  }

  dispatchDemo(endpoint, num) {
    this.store.dispatch(fetchAvgWeatherAction,endpoint, num );

    // or
    // this.store.dispatch('DemoAction', nextFramework);
  }
  
  submitHandler () {
    this.store.dispatch(fetchOptionalAction, this.selectedType[0], this.day, this.month, this.year)
  }

}
