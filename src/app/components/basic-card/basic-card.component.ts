import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-basic-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './basic-card.component.html',
  styleUrl: './basic-card.component.css',
})
export class BasicCardComponent {
  @Input() title: string = '';
  @Input() subTitle: string = '';
}
