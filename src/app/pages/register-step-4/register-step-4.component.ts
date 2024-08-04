import { Component } from '@angular/core';
import { HeaderComponent} from '../../components/header/header.component';
import { InputFormComponent } from 'src/app/components/input-form/input-form.component';
import { NextButtonComponent } from 'src/app/components/next-button/next-button.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-step-4',
  standalone: true,
  templateUrl: './register-step-4.component.html',
  styleUrls: ['./register-step-4.component.scss'],
  imports: [HeaderComponent, InputFormComponent, NextButtonComponent]
})
export class RegisterStep4Component {
  titulos = ['Allergies', 'Medications', 'Hospitalizations/Surgeries (include dates)'];
  patientForm4: FormGroup;

  constructor(private fb: FormBuilder) {
    this.patientForm4 = this.fb.group({
      allergies: ['', Validators.required],
      medications: ['', Validators.required],
      hospitalizations: ['', Validators.required]
    });

    const storedForms = JSON.parse(localStorage.getItem('patientForms') || '[]');
    if (storedForms.length > 3 && storedForms[3]) {
      this.patientForm4.setValue(storedForms[3]);
    }
  }

  ngOnInit(): void {
    this.patientForm4.valueChanges.subscribe(values => {
      const existingForms = JSON.parse(localStorage.getItem('patientForms') || '[]');
      existingForms[3] = values;
      localStorage.setItem('patientForms', JSON.stringify(existingForms));
    });
  }

  onFormChange(form: FormGroup): void {
    console.log('Form data received from child:', form.value);
  }
}
