import { Component } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { CheckFormComponent } from 'src/app/components/check-form/check-form.component';
import { NextButtonComponent } from 'src/app/components/next-button/next-button.component';
import { InputFormComponent } from 'src/app/components/input-form/input-form.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-step-7',
  standalone: true,
  templateUrl: './register-step-7.component.html',
  styleUrls: ['./register-step-7.component.scss'],
  imports: [HeaderComponent, CheckFormComponent, NextButtonComponent, InputFormComponent]
})


export class RegisterStep7Component {
  subtitlesCheckForm = ['Difficulty Sleeping', 'Fatigue', 'Fever/Chills', 'Headaches', 'Recent unexplained change in appetite/weight'];
  subtitlesCheckForm2 = ['Seizure', 'Dizziness', 'Confusion', 'Numbness/Tingling', 'Vertigo', 'Forgetfulness', 'Fainting', 'Balance Issues'];
  subtitlesCheckForm3 = ['Chest Pain', 'Shortness of breath', 'Difficulty Breathing', 'Cough', 'Wheezing', 'Rapid/Irregular heartbeat',
    'Swelling in legs/ankles', 'Varicose veins', 'Chronic or past disease'];
  subtitlesCheckForm4 = ['Heartburn', 'Abdominal Pain', 'Nausea/vomiting', 'Diarrhea', 'Constipation', 'Blood in stool', 'Abdominal distention',
  'Vomiting blood'];
  subtitlesCheckForm5 = ['Increased urgency', 'Increased frequency', 'Blood in urine', 'Burning with urination',
    'Incontinence', 'Chronic or past disease'];
  subtitlesCheckForm6 = ['Double Vision', 'Recent change in vision', 'Ear pain/discharge', 'Ringing in ears', 'Loss of taste/smell',
    'Hoarseness', 'Difficult/painful swallowing'];
  subtitlesCheckForm7 = ['Menstrual irregularity', 'Breast pain/mass', 'Chronic/past disease (cancer, endometriosis, etc.)'];
  subtitlesCheckForm8 = ['Erectile dysfunction', 'Chronic/past disease (cancer/BPH, etc.)'];
  patientForm7: FormGroup;
  submitted: any = '';

  constructor(private fb: FormBuilder) {
    this.patientForm7 = this.fb.group({
      general_conditions: [''],
      neurological_conditions: [''],
      cardiovascular_pulmonary_conditions: [''],
      gastrointestinal_conditions: [''],
      genito_urinary_conditions: [''],
      eent_conditions: [''],
      women_conditions: [''],
      other_women_conditions: [''],
      pregnant_condition: [''],
      last_menstrual_period: [''],
      men_conditions: [''],
      other_men_conditions: [''],
    });

    const storedForms = JSON.parse(localStorage.getItem('patientForms') || '[]');
    if (storedForms.length > 6  && storedForms[6]) {
      this.patientForm7.setValue(storedForms[6]);
    }
  }

  ngOnInit(): void {
    this.patientForm7.valueChanges.subscribe(values => {
      const existingForms = JSON.parse(localStorage.getItem('patientForms') || '[]');
      existingForms[6] = values;
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
