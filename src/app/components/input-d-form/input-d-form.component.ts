import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-input-d-form',
  standalone: true,
  templateUrl: './input-d-form.component.html',
  styleUrls: ['./input-d-form.component.scss'],
  imports: [CommonModule, FontAwesomeModule]

})
export class InputDFormComponent {
  @Input() icons?: any;
  @Input() titles: string[] = [];
  @Input() placeholders: string[] = [];
}
