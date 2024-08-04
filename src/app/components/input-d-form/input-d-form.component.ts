import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-d-form',
  standalone: true,
  templateUrl: './input-d-form.component.html',
  styleUrls: ['./input-d-form.component.scss'],
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule]
})

export class InputDFormComponent {
  constructor(private fb: FormBuilder) {}
  @Input() icons?: any;
  @Input() titles: string[] = [];
  @Input() placeholders: string[] = [];
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
