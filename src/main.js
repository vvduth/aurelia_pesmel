import environment from '../config/environment.json';
import {PLATFORM} from 'aurelia-pal';
import { initialState } from './state';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'));

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia.use
    .plugin(PLATFORM.moduleName('aurelia-plugins-pagination'), config => {
      config.options({
        of: 'of' // the translation of the word 'OF', you can also use aurelia-i18n here
      });
    });
  aurelia.use
    .plugin(PLATFORM.moduleName('au-table'))
    .feature('resources');

  aurelia.use.plugin(PLATFORM.moduleName('aurelia-store'), {initialState});
  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
