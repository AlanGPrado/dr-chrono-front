import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterStep1Component } from './pages/register-step-1/register-step-1.component';
import { RegisterStep2Component } from './pages/register-step-2/register-step-2.component';
import { RegisterStep3Component } from './pages/register-step-3/register-step-3.component';
import { RegisterStep4Component } from './pages/register-step-4/register-step-4.component';
import { RegisterStep5Component } from './pages/register-step-5/register-step-5.component';
import { RegisterStep6Component } from './pages/register-step-6/register-step-6.component';
import { RegisterStep7Component } from './pages/register-step-7/register-step-7.component';

const routes: Routes = [
  { path: '', redirectTo: '/register-step-1', pathMatch: 'full' },
  { path: 'register-step-1', component: RegisterStep1Component},
  { path: 'register-step-2', component: RegisterStep2Component},
  { path: 'register-step-3', component: RegisterStep3Component},
  { path: 'register-step-4', component: RegisterStep4Component},
  { path: 'register-step-5', component: RegisterStep5Component},
  { path: 'register-step-6', component: RegisterStep6Component},
  { path: 'register-step-7', component: RegisterStep7Component},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
