import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-form',
  standalone: true,
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss'],
  imports: [FontAwesomeModule, CommonModule]
})
export class InputFormComponent {
  @Input() titles: string[] = [];
  @Input() icons?: any[];
  @Input() types: string[] = [];
  @Input() placeholders: string[] = [];
  @Input() XL: boolean[] = [];
}
