import {Routes} from '@angular/router';
import {ActivateGuard} from './activate.guard';
import {FormComponent} from './form/form.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
export const Approutes:Routes=
[
    {path:'', component: RegisterComponent},
    { path: "home", component: FormComponent,canActivate:[ActivateGuard] },
    { path: "register", component: RegisterComponent },
    { path: "login", component: LoginComponent },
    { path: '**', redirectTo: '' }
]