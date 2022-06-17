
import { fetchWeatherAction, updatePageLength } from "./state";
import { inject } from "../node_modules/aurelia-dependency-injection";
import { Store } from "../node_modules/aurelia-store";

import { PLATFORM } from "aurelia-framework";
@inject(Store)
export class App {

  
  constructor(store) {
    this.heading = "Raw Data"
    this.store = store ; 
    this.store.registerAction('weatherAction', fetchWeatherAction)
    this.store.registerAction('pageNumberAction', updatePageLength)
    this.store.state.pagesLength = this.dispatchPageNumber() 
    this.store.state.weatherItems = this.dispatchDemo(0) 

    
  }
  bind() {
    this.subscription = this.store.state.subscribe(
      (state) => this.state = state
    );
  }

  unbind() {
    this.subscription.unsubscribe();
  }

  dispatchDemo(num) {
    this.store.dispatch(fetchWeatherAction,num );

    // or
    // this.store.dispatch('DemoAction', nextFramework);
  }

  dispatchPageNumber() {
    this.store.dispatch(updatePageLength)
  }

}
