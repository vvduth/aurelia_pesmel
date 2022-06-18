
import { fetchAvgWeatherAction, updatePageLength } from "./state";
import { inject } from "../node_modules/aurelia-dependency-injection";
import { Store } from "../node_modules/aurelia-store";

import { PLATFORM } from "aurelia-framework";
@inject(Store)
export class avgTemp {

  
  constructor(store) {
    this.heading = "Average Temperature"
    this.store = store ; 
    this.store.registerAction('AvgAction', fetchAvgWeatherAction);
    this.store.state.weatherItems = this.dispatchDemo(1) 
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
    this.store.dispatch(fetchAvgWeatherAction,num );

    // or
    // this.store.dispatch('DemoAction', nextFramework);
  }
  

}
