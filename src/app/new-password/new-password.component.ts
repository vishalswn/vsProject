import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
//import { RegisterService } from 'src/app/register.service';
import { Router, ActivatedRoute } from '@angular/router';
import {  AlertService } from 'src/app/_service';
import { ConfirmedValidator } from 'src/app/confirmed.validator';
//import 'rxjs/add/operator/filter';
import { HttpService } from 'src/app/http.service';
@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {
  newpassform:FormGroup;
  loading = false;
  submitted = false;
  public token = "";
  constructor(
    private formBuilder: FormBuilder,
    private readonly httpService: HttpService,
    private router: Router,
    private activerouter: ActivatedRoute,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.newpassform = this.formBuilder.group({
      email: ['', [Validators.required]],
	    password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required, Validators.minLength(6)]],
      
  },
  { 
    validator: ConfirmedValidator('password', 'confirm_password')
  }
  
  );
      this.activerouter.queryParams
      .subscribe(params => {
        console.log(params); // { order: "popular" }
        localStorage.setItem("resettoken", params.token);
      }
    );
  }
  
  get f() { return this.newpassform.controls; }
  onSubmit(){
    
    let uploadForm = new FormData();
    let resetpasstoken = localStorage.getItem("resettoken");
    uploadForm.append('password', this.newpassform.value.password);
    uploadForm.append('email', this.newpassform.value.email);
    uploadForm.append('token', resetpasstoken);
    //uploadForm.append('token', this.token.get('resetpasstoken').value);
   // uploadForm.append('confirm_password', this.newpassform.get('confirm_password').value);
    console.log(uploadForm);
    //console.log(this.newpassform.value.image);
      this.httpService.resetnewpass('password_reset/confirm/', uploadForm).subscribe((data:any) => {
      this.alertService.error('Password reset successfully');
    }, error => {
      this.alertService.error('Authentication credentials were not provided.');
      this.loading = false;
  })
  }

}
