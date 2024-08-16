import { Component } from '@angular/core';
import { defaultData, row } from './utils/libraries/default-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'laboratorio-estadistica';

  //default data
  defaultData: row[] = defaultData;
  intervalo: number = 0.95;
  significancia: number = 0.05;
}
