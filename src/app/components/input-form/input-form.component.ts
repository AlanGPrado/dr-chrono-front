import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-form',
  standalone: true,
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss'],
  imports: [FontAwesomeModule, CommonModule, ReactiveFormsModule]
})

export class InputFormComponent {
  constructor(private fb: FormBuilder) {}
  @Input() titles: string[] = [];
  @Input() icons?: any[];
  @Input() types: string[] = [];
  @Input() placeholders: string[] = [];
  @Input() XL: boolean[] = [];
  @Input() form: FormGroup = this.fb.group({});
  @Input() position: number = 0;

  @Output() formChange = new EventEmitter<FormGroup>();

  formControlNames: string[] = [];

  ngOnInit(): void {
    this.formControlNames = Object.keys(this.form.value).map((value, i) => {
      const controlName = value.toLowerCase().replace(' ', '_');
      if (!this.form.contains(controlName)) {
        this.form.addControl(controlName, new FormControl('', Validators.required));
      }
      return controlName;
    });

    this.form.valueChanges.subscribe(() => {
      this.formChange.emit(this.form);
    });
  }

  onFormSubmit(): void {
    this.formChange.emit(this.form);
  }
}
