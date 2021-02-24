import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ActivateGuard } from './activate.guard';
import { UserService } from './user.service';
import {Routes} from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AlertComponent } from './alert/alert.component';
import { ConfirmPasswordValidatorComponent } from './confirm-password-validator/confirm-password-validator.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserListComponent } from './user-list/user-list.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';
import { LodashComponent } from './lodash/lodash.component';
import { BlogComponent } from './blog/blog.component';
import { UpdateBlogComponent } from './update-blog/update-blog.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { ChatComponent } from './chat/chat.component';
import { ChatmessageComponent } from './chatmessage/chatmessage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    RegisterComponent,
    LoginComponent,
    AdminComponent,
    AlertComponent,
    ConfirmPasswordValidatorComponent,
    ResetPasswordComponent,
    UserListComponent,
    ForgetPasswordComponent,
    NewPasswordComponent,
    UpdateProfileComponent,
    ParentComponent,
    ChildComponent,
    LodashComponent,
    BlogComponent,
    UpdateBlogComponent,
    HomeComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    ChatComponent,
    ChatmessageComponent,
    PageNotFoundComponent,
    ReactiveFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [ActivateGuard,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
