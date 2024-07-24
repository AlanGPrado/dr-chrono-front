import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-check-form',
  standalone: true,
  templateUrl: './check-form.component.html',
  styleUrls: ['./check-form.component.scss'],
  imports: [CommonModule]

})
export class CheckFormComponent {
  @Input() title_c: string = '';
  @Input() subtitles: string[] = [];
  @Input() align_t?: boolean;
  @Input() align_c: number = 3;

  isOnlyChildInRow(index: number): boolean {
    return this.subtitles.length % this.align_c === 1 && index === this.subtitles.length - 1;
  }
}
