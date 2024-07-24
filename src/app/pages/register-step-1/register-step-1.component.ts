import { Component } from '@angular/core';
import { HeaderComponent} from '../../components/header/header.component';
import { InputFormComponent } from 'src/app/components/input-form/input-form.component';
import { InputDFormComponent } from 'src/app/components/input-d-form/input-d-form.component';
import { NextButtonComponent } from 'src/app/components/next-button/next-button.component';
import { faUser, faEnvelope, faPhone, faCalendar, faHome, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { CheckFormComponent } from 'src/app/components/check-form/check-form.component';


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
  titulos = ['Name','Preferred Name', 'Email', 'Phone', 'Date of Birth', 'Address'];
  titulosD = ['Apt #', 'City', 'State', 'Zip Code'];
  tipos = ['text', 'text', 'mail', 'number', 'date'];
  marcadores = ['Name','Preferred Name', 'Email', 'Phone', 'Date of Birth', 'Address'];
  subtitulos = ['Male', 'Female', 'Other'];
  subtitulos2 = ['Married', 'Single', 'Widowed', 'Divorced'];
}
