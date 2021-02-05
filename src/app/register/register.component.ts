import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
//import { RegisterService } from 'src/app/register.service';
import { Router, ActivatedRoute } from '@angular/router';
import {  AlertService } from 'src/app/_service';
import { first } from 'rxjs/operators';
import { ConfirmedValidator } from 'src/app/confirmed.validator';
import { HttpService } from 'src/app/http.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  image;
  response:any;
  b:any;
  data = [];
  public imgPath;
  imgURL: any = "assets/download.png";
  public message: string;
 
  constructor(
    private route: ActivatedRoute,
  	private formBuilder: FormBuilder,
    //private readonly registerService: RegisterService,
    private readonly httpService:HttpService,
    private router: Router,
    private alertService: AlertService
  	) { }

  ngOnInit(): void {
    
  	this.registerForm = this.formBuilder.group({
	    first_name: ['', Validators.required],
	    last_name: ['', Validators.required],
	    email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required, Validators.minLength(6)]],
	    gender: ['', Validators.required],
	    date_of_birth: ['', Validators.required],
	    profile_pic: ['',Validators.required]
  },
  { 
    validator: ConfirmedValidator('password', 'confirm_password')
  }
  );
  }
  
  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;
     // reset alerts on submit
     this.alertService.clear();
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    this.loading = true;
  	this.registerForm.value['profile_pic'] = this.image;
  	var uploadForm = new FormData();
  	for (let dd in this.registerForm.value) {
    uploadForm.append(dd, this.registerForm.value[dd]);
  	}
  	this.httpService.loadPost('register/', uploadForm).subscribe(data => {
      this.loading = false;
      this.submitted = true;
      this.response = data;
      this.alertService.success(this.response, { keepAfterRouteChange: true });
      this.router.navigate(["login"]);
    },
    error => {
      //this.alertService.error('A user with that email address already exists.');
      alert(this.response);
      this.loading = false;
  });
  }

   changeListener($event) : void {
    this.image = $event.target.files[0];
    this.readThis($event.target);
     //this.imgURL = $event.target;
    console.log(this.imgURL);
   }

  readThis(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();
    // this.imgPath = file;
    // myReader.readAsDataURL(file[0]);
    myReader.onloadend = (e) => { 
      this.imgURL = myReader.result;  // base64
      //console.log(myReader.result);
    }
    myReader.readAsDataURL(file);
  }
  
    
	
} 
