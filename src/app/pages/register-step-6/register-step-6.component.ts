import { Component } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { CheckFormComponent } from 'src/app/components/check-form/check-form.component';
import { NextButtonComponent } from 'src/app/components/next-button/next-button.component';

@Component({
  selector: 'app-register-step-6',
  standalone: true,
  templateUrl: './register-step-6.component.html',
  styleUrls: ['./register-step-6.component.scss'],
  imports: [HeaderComponent, CheckFormComponent, NextButtonComponent]
})

export class RegisterStep6Component {
  titleCheckForm = 'Select any of the following you have had in the past 6 months';
  subtitlesCheckForm = ['Leg Pain/Numbness/Tingling', 'Difficulty sleeping from pain', 'Pain from sitting',
   'Changes in bowel/bladder function', 'Dizziness/Nausea/Vertigo', 'Arm Pain/Numbness/Tingling', 'Unexplained change in weight/appetite', 'Problems/Pain from Walking'];
}
