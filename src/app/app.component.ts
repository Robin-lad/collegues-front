import { Component } from '@angular/core';
import { creation } from './mock/collegue.mock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'collegues-front';

  collegueEx = creation()[0];
}
