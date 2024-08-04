import { Component } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { CheckFormComponent } from 'src/app/components/check-form/check-form.component';
import { NextButtonComponent } from 'src/app/components/next-button/next-button.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputFormComponent } from 'src/app/components/input-form/input-form.component';

@Component({
  selector: 'app-register-step-6',
  standalone: true,
  templateUrl: './register-step-6.component.html',
  styleUrls: ['./register-step-6.component.scss'],
  imports: [HeaderComponent, CheckFormComponent, NextButtonComponent, InputFormComponent]
})

export class RegisterStep6Component {
  titleCheckForm = 'Select any of the following you have had in the past 6 months';
  subtitlesCheckForm = ['Leg Pain/Numbness/Tingling', 'Difficulty sleeping from pain', 'Pain from sitting',
    'Changes in bowel/bladder function', 'Dizziness/Nausea/Vertigo', 'Arm Pain/Numbness/Tingling',
    'Unexplained change in weight/appetite', 'Problems/Pain from Walking'];
  patientForm6: FormGroup;
  storedFormValues: any;
  constructor(private fb: FormBuilder) {
    this.patientForm6 = this.fb.group({
      six_month_condition: ['', Validators.required]
    });

    const storedForms = JSON.parse(localStorage.getItem('patientForms') || '[]');
    if (storedForms.length > 5  && storedForms[5]) {
      this.patientForm6.setValue(storedForms[5]);
    }
  }

  ngOnInit(): void {
    this.patientForm6.valueChanges.subscribe(values => {
      const existingForms = JSON.parse(localStorage.getItem('patientForms') || '[]');
      existingForms[5] = values;
      localStorage.setItem('patientForms', JSON.stringify(existingForms));
    });
  }

  onFormChange(form: FormGroup): void {
    console.log('Form data received from child:', form.value);
  }
}
