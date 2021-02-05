import { NgModule } from '@angular/core';
import {ActivateGuard} from './activate.guard';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserListComponent } from './user-list/user-list.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ChildComponent } from './child/child.component';
import { ParentComponent } from './parent/parent.component';
import { LodashComponent } from './lodash/lodash.component';
import { BlogComponent } from './blog/blog.component';
import { UpdateBlogComponent } from './update-blog/update-blog.component';
import { HomeComponent } from './home/home.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ChatComponent } from './chat/chat.component';
const routes: Routes = [
	{ path: "", redirectTo: "/register", pathMatch: "full" },
    { path: "home", component: FormComponent,canActivate:[ActivateGuard] },
    { path: "register", component: RegisterComponent },
    { path: "login", component: LoginComponent },
    { path: "reset-password", component: ResetPasswordComponent,canActivate:[ActivateGuard] },
    { path: "user-list", component: UserListComponent,canActivate:[ActivateGuard] },
    { path: "forget-password", component: ForgetPasswordComponent },
    { path: "auth/password_reset", component: NewPasswordComponent }, 
    { path: "update-profile", component: UpdateProfileComponent,canActivate:[ActivateGuard] },  
    { path: "childcomponent", component: ChildComponent,canActivate:[ActivateGuard] },
    { path: "parentcomponent", component: ParentComponent,canActivate:[ActivateGuard] },
    { path: "lodash", component: LodashComponent },
    { path:"blog", component:BlogComponent,canActivate:[ActivateGuard]},
    { path:"update-blog", component:UpdateBlogComponent,canActivate:[ActivateGuard]},
    { path:"dashboard", component:HomeComponent,canActivate:[ActivateGuard]},
    { path:"recipe", component:RecipesComponent,canActivate:[ActivateGuard]},
    { path:"chat", component:ChatComponent},
    { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
