import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
//import { RegisterService } from 'src/app/register.service';
import { Router, ActivatedRoute } from '@angular/router';
import {  AccountService,AlertService } from 'src/app/_service';
import { HttpService } from 'src/app/http.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginemail:any;
  loginform: FormGroup;
  loading = false;
  submitted = false   
  constructor(
  	private formBuilder: FormBuilder,
  	private router: Router,
    private readonly httpService: HttpService,
    private accountService: AccountService,
    private alertService: AlertService
  	) { }

  ngOnInit(): void {
  	this.loginform = this.formBuilder.group({
	    email: ['', Validators.required],
	    password: ['', Validators.required]
	});
  }
  get f() { return this.loginform.controls; }
  onSubmit() {
  	this.httpService.loginpost('login/', this.loginform.value).pipe(first()).subscribe((data: any) => {
      this.httpService.sendToken(data.auth_token);
      //console.log(data);
      localStorage.setItem("loginid",data.id);
      localStorage.setItem("loginuser",data.email);
      //localStorage.setItem("loginpic",data.profile_pic);
      this.router.navigate(["/home"]);
    }, error => {
      //this.alertService.error("ko");
      alert('email or password may be wrong');
      this.loading = false;
  });
  }
}
