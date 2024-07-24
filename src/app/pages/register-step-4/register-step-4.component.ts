import { Component } from '@angular/core';
import { HeaderComponent} from '../../components/header/header.component';
import { InputFormComponent } from 'src/app/components/input-form/input-form.component';
import { NextButtonComponent } from 'src/app/components/next-button/next-button.component';

@Component({
  selector: 'app-register-step-4',
  standalone: true,
  templateUrl: './register-step-4.component.html',
  styleUrls: ['./register-step-4.component.scss'],
  imports: [HeaderComponent, InputFormComponent, NextButtonComponent]
})
export class RegisterStep4Component {
  titulos = ['Allergies', 'Medications', 'Hospitalizations/Surgeries (include dates)']
}
