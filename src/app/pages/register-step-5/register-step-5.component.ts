import { AfterContentInit, ChangeDetectorRef, Component } from '@angular/core';
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
  submitted: any = '';

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
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
      this.patientForm5.patchValue(storedForms[4]);
    }
  }

  ngOnInit(): void {
    this.patientForm5.valueChanges.subscribe(values => {
      const existingForms = JSON.parse(localStorage.getItem('patientForms') || '[]');
      existingForms[4] = values;
      localStorage.setItem('patientForms', JSON.stringify(existingForms));
    });

    this.patientForm5.get('diagnosed_conditions')?.valueChanges.subscribe(() => {
      this.setupValidators('diagnosed_conditions', 1, 2);
    });

    this.patientForm5.get('smoking_status')?.valueChanges.subscribe(() => {
      this.setupValidators('smoking_status', 3, 4);
    });

    this.patientForm5.get('drinking_status')?.valueChanges.subscribe(() => {
      this.setupValidators('drinking_status', 5, 6);
    });

    this.setupValidators('diagnosed_conditions', 1, 2);
    this.setupValidators('smoking_status', 3, 4);
    this.setupValidators('drinking_status', 5, 6);
  }

  toggle() {
    this.submitted = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  setupValidators(value: string, pos1: number, pos2: number) {
    const options = ['Other', 'Yes'];
    if (options.some(option => this.patientForm5.get(value)?.value.includes(option)) === false) {
      Object.keys(this.patientForm5.value).slice(pos1, pos2).forEach(controlName => {
        this.patientForm5.get(controlName)?.clearValidators();
        this.patientForm5.get(controlName)?.updateValueAndValidity({ onlySelf: true });
      });
    } else if (options.some(option => this.patientForm5.get(value)?.value.includes(option))) {
      Object.keys(this.patientForm5.value).slice(pos1, pos2).forEach(controlName => {
        this.patientForm5.get(controlName)?.setValidators(Validators.required);
        this.patientForm5.get(controlName)?.updateValueAndValidity({ onlySelf: true });
      });
    }
    this.patientForm5.updateValueAndValidity({ onlySelf: true });
    this.cdr.detectChanges();
  }

  onFormChange(form: FormGroup): void {
    // console.log('Form data received from child:', form.value);
  }
}
