import { Component } from '@angular/core';
import styleString from './app.component.scss';

@Component({
  selector: 'hello-angular',
  template: `<h1>Hello {{name}}</h1>`,
  styles: [ styleString ]
})

export class AppComponent {
  name = 'Angular';
}
