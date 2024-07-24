import { Component } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { CheckFormComponent } from 'src/app/components/check-form/check-form.component';
import { InputFormComponent } from 'src/app/components/input-form/input-form.component';
import { NextButtonComponent } from 'src/app/components/next-button/next-button.component';

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
}
