import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RegisterService } from 'src/app/register.service';
import { Router, ActivatedRoute } from '@angular/router';
import {  AlertService } from 'src/app/_service';
import { first } from 'rxjs/operators';
import { ConfirmedValidator } from 'src/app/confirmed.validator';
import { HttpService } from 'src/app/http.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetpassform: FormGroup;
  loading = false;
  submitted = false;
  constructor(
    private route: ActivatedRoute,
  	private formBuilder: FormBuilder,
  	private readonly httpService: HttpService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.resetpassform = this.formBuilder.group({
	    old_password: ['', [Validators.required, Validators.minLength(6)]],
      new_password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required, Validators.minLength(6)]],
  },
  { 
    validator: ConfirmedValidator('new_password', 'confirm_password')
  }
  ); 
  }
  get f() { return this.resetpassform.controls; }
  onSubmit() {
  	this.httpService.reset('change-password/' ,this.resetpassform.value).subscribe((data: any) => {
      console.log(data);
      //this.registerService.sendToken(data.auth_token);
      //this.registerService.sendToken(data.auth_token);
    // debugger
    this.alertService.success('password change successfully', { keepAfterRouteChange: true });
    }, error => {
      this.alertService.error('Authentication credentials were not provided.');
      this.loading = false;
  });
  }
}
