    

import { PLATFORM } from "aurelia-framework";
export class App {
  configureRouter(config, router) {
    this.router = router;
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'home'],       name: 'home',       moduleId: PLATFORM.moduleName('home.html') },
      { route: 'weather',            name: 'weater',      moduleId: PLATFORM.moduleName('weather'), nav: true, title: 'Weather' },
      { route: 'avg',            name: 'average',      moduleId: PLATFORM.moduleName('avgTemp'), nav: true, title: 'Average' },
      { route: 'max',            name: 'maximum',      moduleId: PLATFORM.moduleName('maxTemp'), nav: true, title: 'Maximum' },
      { route: 'min',            name: 'minimum',      moduleId: PLATFORM.moduleName('minTemp'), nav: true, title: 'Minimum' },
      { route: 'optional',            name: 'optional',      moduleId: PLATFORM.moduleName('optional'), nav: true, title: 'optional' },
    ]);
  }
}
