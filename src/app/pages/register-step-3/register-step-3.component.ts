import { Component, ChangeDetectorRef } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { InputFormComponent } from 'src/app/components/input-form/input-form.component';
import { CheckFormComponent } from 'src/app/components/check-form/check-form.component';
import { NextButtonComponent } from 'src/app/components/next-button/next-button.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-step-3',
  standalone: true,
  templateUrl: './register-step-3.component.html',
  styleUrls: ['./register-step-3.component.scss'],
  imports: [HeaderComponent, InputFormComponent, CheckFormComponent, NextButtonComponent]
})

export class RegisterStep3Component {
  titulos = ['What is the purpose of your appointment?', 'When did this condition begin?'];
  titulos2 = ['If yes, When?', 'Who was the doctor?', 'What type of treatment did you receive?', 'What were the results?'];
  tipos = ['text', 'text'];
  patientForm3: FormGroup;
  submitted: any = '';

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.patientForm3 = this.fb.group({
      purpose_appointment: ['', Validators.required],
      condition_begin: ['', Validators.required],
      prior_doctor: ['', Validators.required],
      date_prior_doctor: ['', Validators.required],
      name_prior_doctor: ['', Validators.required],
      past_treatment: ['', Validators.required],
      prior_results: ['', Validators.required],
      imaging: ['', Validators.required],
      imaging_place: ['', Validators.required],
    });

    const storedForms = JSON.parse(localStorage.getItem('patientForms') || '[]');
    if (storedForms.length > 2 && storedForms[2]) {
      this.patientForm3.patchValue(storedForms[2]);
    }
  }

  ngOnInit(): void {
    this.patientForm3.valueChanges.subscribe(values => {
      const existingForms = JSON.parse(localStorage.getItem('patientForms') || '[]');
      existingForms[2] = values;
      localStorage.setItem('patientForms', JSON.stringify(existingForms));
    });

    this.patientForm3.get('prior_doctor')?.valueChanges.subscribe(value => {
      this.setupValidators(value, 3, 7);
    });
    this.patientForm3.get('imaging')?.valueChanges.subscribe(value => {
      this.setupValidators(value, 8, 9);
    });

    this.setupValidators(this.patientForm3.get('prior_doctor')?.value, 3, 7);
    this.setupValidators(this.patientForm3.get('imaging')?.value, 8, 9);
  }

  toggle() {
    this.submitted = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  setupValidators(value: string, pos1: number, pos2: number) {
    if (value === 'No') {
      Object.keys(this.patientForm3.value).slice(pos1, pos2).forEach(controlName => {
        this.patientForm3.get(controlName)?.clearValidators();
        this.patientForm3.get(controlName)?.updateValueAndValidity({ onlySelf: true });
      });
    } else if (value === 'Yes' || value === '') {
      Object.keys(this.patientForm3.value).slice(pos1, pos2).forEach(controlName => {
        this.patientForm3.get(controlName)?.setValidators(Validators.required);
        this.patientForm3.get(controlName)?.updateValueAndValidity({ onlySelf: true });
      });
    }
    this.cdr.detectChanges();
  }

  onFormChange(form: FormGroup): void {
    console.log('Form data received from child:', form.value);
  }
}
