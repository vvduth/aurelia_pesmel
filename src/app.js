    

import { PLATFORM } from "aurelia-framework";
export class App {
  configureRouter(config, router) {
    this.router = router;
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'home'],       name: 'home',       moduleId: PLATFORM.moduleName('home.html') },
      { route: 'weather',            name: 'weater',      moduleId: PLATFORM.moduleName('weather'), nav: true, title: 'Weather' },
      { route: 'avg',            name: 'average',      moduleId: PLATFORM.moduleName('avgTemp'), nav: true, title: 'Average' },
    ]);
  }
}
