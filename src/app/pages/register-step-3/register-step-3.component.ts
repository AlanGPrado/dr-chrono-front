import { Component } from '@angular/core';
import { HeaderComponent} from '../../components/header/header.component';
import { InputFormComponent } from 'src/app/components/input-form/input-form.component';
import { CheckFormComponent } from 'src/app/components/check-form/check-form.component';
import { NextButtonComponent } from 'src/app/components/next-button/next-button.component';

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
}
