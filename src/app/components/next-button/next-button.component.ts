import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-next-button',
  standalone: true,
  templateUrl: './next-button.component.html',
  styleUrls: ['./next-button.component.scss'],
  imports: [CommonModule, RouterModule]
})
export class NextButtonComponent {
  @Input() router: string = '';
  @Input() disable: boolean = false;
  @Output() valueChanged = new EventEmitter<any>();

  emitValue(value: any) {
    this.valueChanged.emit(value);
  }
}
