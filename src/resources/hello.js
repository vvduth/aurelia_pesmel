import {bindable, bindingMode} from 'aurelia-framework';

export class Hello {
  constructor() {
    this.firstName = 'John';
    this.lastName = 'Doe';
  }

   sayHello() {
    alert(`Hello ${this.firstName} ${this.lastName}. Nice to meet you.`);
  }
}
