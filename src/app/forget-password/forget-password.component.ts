import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/http.service';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
//import { RegisterService } from 'src/app/register.service';
import {  AlertService } from 'src/app/_service';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
    forgetform: FormGroup;
    loading = false;
    submitted = false;
  constructor(
      //private accountService: AccountService,
      private route: ActivatedRoute,
      private router: Router,
      private formBuilder: FormBuilder,
      private readonly httpService: HttpService,
     // public httpService: HttpService,
      private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.forgetform = this.formBuilder.group({
      email: ['', Validators.required],
  });
  }
  get f() { return this.forgetform.controls; }
  onSubmit(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.forgetform.invalid) {
      return;
    }
    this.loading = true;
    this.httpService.forgetpass('password_reset/' ,this.forgetform.value).subscribe((data: any) => {
    alert("you have permission, Now you can change your password.");
     // this.router.navigate(["auth/password_reset"]); 
    }, error => {
      this.alertService.error('Authentication credentials were not provided.');
      this.loading = false;
  });
  }

}
