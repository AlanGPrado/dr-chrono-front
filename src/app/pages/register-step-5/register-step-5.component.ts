import { Component } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { CheckFormComponent } from 'src/app/components/check-form/check-form.component';
import { InputFormComponent } from 'src/app/components/input-form/input-form.component';
import { NextButtonComponent } from 'src/app/components/next-button/next-button.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-step-5',
  standalone: true,
  templateUrl: './register-step-5.component.html',
  styleUrls: ['./register-step-5.component.scss'],
  imports: [HeaderComponent, CheckFormComponent, InputFormComponent, NextButtonComponent]
})
export class RegisterStep5Component {
  titleCheckForm = 'Check any of the following medical conditions that you have been diagnosed with';
  subtitlesCheckForm = ['Heart disease', 'Stroke', 'Osteoporosis/\nOsteopenia', 'High blood pressure', 'Cancer',
    'Arthritis', 'Heart murmur', 'Thyroid disorder', 'Psoriasis', 'Pacemaker', 'Diabetes', 'Lyme disease', 'Other'];
  patientForm5: FormGroup;
  storedFormValues: any;

  constructor(private fb: FormBuilder) {
    this.patientForm5 = this.fb.group({
      diagnosed_conditions: ['', Validators.required],
      other_diagnosed_conditions: ['', Validators.required],
      smoking_status: ['', Validators.required],
      smoking_status_frequency: ['', Validators.required],
      drinking_status: ['', Validators.required],
      drinking_status_frequency: ['', Validators.required]
    });

    const storedForms = JSON.parse(localStorage.getItem('patientForms') || '[]');
    if (storedForms.length > 4 && storedForms[4]) {
      this.patientForm5.setValue(storedForms[4]);
    }
  }

  ngOnInit(): void {
    this.patientForm5.valueChanges.subscribe(values => {
      const existingForms = JSON.parse(localStorage.getItem('patientForms') || '[]');
      existingForms[4] = values;
      localStorage.setItem('patientForms', JSON.stringify(existingForms));
    });
  }

  onFormChange(form: FormGroup): void {
    console.log('Form data received from child:', form.value);
  }
}
