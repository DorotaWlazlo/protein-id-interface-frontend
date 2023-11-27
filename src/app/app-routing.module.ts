import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainFormComponent } from './main-form/main-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { SearchResultComponent } from './search-result/search-result.component';


const routes: Routes = [
  { path: '', redirectTo: 'main-form', pathMatch: 'full' },
  { path: 'main-form', component: MainFormComponent},
  { path: 'log-in', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'result', component: SearchResultComponent }
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }