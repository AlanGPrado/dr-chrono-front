import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { InputFormComponent } from 'src/app/components/input-form/input-form.component';
import { InputDFormComponent } from 'src/app/components/input-d-form/input-d-form.component';
import { NextButtonComponent } from 'src/app/components/next-button/next-button.component';
import { faUser, faEnvelope, faPhone, faCalendar, faHome, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { CheckFormComponent } from 'src/app/components/check-form/check-form.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-step-1',
  standalone: true,
  templateUrl: './register-step-1.component.html',
  styleUrls: ['./register-step-1.component.scss'],
  imports: [HeaderComponent, InputFormComponent, InputDFormComponent, NextButtonComponent, CheckFormComponent]
})

export class RegisterStep1Component {
  iconos = [faUser, faUser, faEnvelope, faPhone, faCalendar, faHome];
  icono = faLocationDot;
  titulos = ['Name', 'Preferred Name', 'Email', 'Phone', 'Date of Birth', 'Address'];
  titulosD = ['Apt #', 'City', 'State', 'Zip Code'];
  tipos = ['text', 'text', 'mail', 'number', 'date'];
  marcadores = ['Name', 'Preferred Name', 'Email', 'Phone', 'Date of Birth', 'Address'];
  subtitulos = [['Male', 'Female', 'Other'], ['Married', 'Single', 'Widowed', 'Divorced']];
  subtitulos2 = []
  patientForm: FormGroup;
  storedFormValues: any;
  submitted: any = '';
  constructor(private fb: FormBuilder) {
    this.patientForm = this.fb.group({
      name: ['', Validators.required],
      preferred_name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      birthday: ['', Validators.required],
      address: ['', Validators.required],
      apartment: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip_code: ['', Validators.required],
      sex: ['', Validators.required],
      marital_status: ['', Validators.required]
    });

    const storedForms = JSON.parse(localStorage.getItem('patientForms') || '[]');
    if (storedForms.length > 0 && storedForms[0]) {
      this.patientForm.setValue(storedForms[0]);
    }
  }

  ngOnInit(): void {
    this.patientForm.valueChanges.subscribe(values => {
      const existingForms = JSON.parse(localStorage.getItem('patientForms') || '[]');
      existingForms[0] = values;
      localStorage.setItem('patientForms', JSON.stringify(existingForms));
    });
  }

  onFormChange(form: FormGroup): void {
    console.log('Form data received from child:', form.value);
  }

  toggle() {
    this.submitted = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onSubmit() {
  }
}
