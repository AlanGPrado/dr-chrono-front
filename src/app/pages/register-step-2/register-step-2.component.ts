import { Component } from '@angular/core';
import { HeaderComponent} from 'src/app/components/header/header.component';
import { InputFormComponent } from 'src/app/components/input-form/input-form.component';
import { InputDFormComponent } from 'src/app/components/input-d-form/input-d-form.component';
import { CheckFormComponent } from 'src/app/components/check-form/check-form.component';
import { NextButtonComponent } from 'src/app/components/next-button/next-button.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-step-2',
  standalone: true,
  templateUrl: './register-step-2.component.html',
  styleUrls: ['./register-step-2.component.scss'],
  imports: [HeaderComponent, InputFormComponent, InputDFormComponent, NextButtonComponent, CheckFormComponent]
})
export class RegisterStep2Component {
  titulos = ['Primary Physician/General Practinioner','Bussiness Employer'];
  titulos2 = ['Referred to this office by', 'Emergency Contact', 'Contact Phone Number', 'Relationship', 'Insurance Provider'];
  tipos = ['text', 'text'];
  tipos2 = ['text', 'text', 'tel', 'text', 'text'];
  patientForm2: FormGroup;
  submitted: any = '';

  constructor(private fb: FormBuilder) {
    this.patientForm2 = this.fb.group({
      primary_physician: ['', Validators.required],
      business_employer: ['', Validators.required],
      full_time_employee: ['', Validators.required],
      referred_by: ['', Validators.required],
      emergency_contact: ['', Validators.required],
      phone_contact: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      relationship_contact: ['', Validators.required],
      insurance_provider: ['', Validators.required],
      member_id: ['', Validators.required],
      group_id: ['', Validators.required],
    });

    const storedForms = JSON.parse(localStorage.getItem('patientForms') || '[]');
    if (storedForms.length > 1 && storedForms[1]) {
      this.patientForm2.setValue(storedForms[1]);
    }
  }

  ngOnInit(): void {
    this.patientForm2.valueChanges.subscribe(values => {
      const existingForms = JSON.parse(localStorage.getItem('patientForms') || '[]');
      existingForms[1] = values;
      localStorage.setItem('patientForms', JSON.stringify(existingForms));
    });
  }

  toggle() {
    this.submitted = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onFormChange(form: FormGroup): void {
    console.log('Form data received from child:', form.value);
  }
}
