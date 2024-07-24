import { Component } from '@angular/core';
import { HeaderComponent} from 'src/app/components/header/header.component';
import { InputFormComponent } from 'src/app/components/input-form/input-form.component';
import { InputDFormComponent } from 'src/app/components/input-d-form/input-d-form.component';
import { CheckFormComponent } from 'src/app/components/check-form/check-form.component';
import { NextButtonComponent } from 'src/app/components/next-button/next-button.component';

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
  tipos2 = ['text', 'text', 'phone', 'text', 'text'];
}
