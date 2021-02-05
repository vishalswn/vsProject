import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/http.service';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {  AlertService } from 'src/app/_service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
    //user: User;
    loginemail:string;
    form: FormGroup;
    loading = false;
    submitted = false;
    image;
    loginuser:string;
    data = [];
  constructor(
  	    //private accountService: AccountService,
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private alertService: AlertService,
        public httpService: HttpService
        
  	) { }
   
  ngOnInit(): void {
  	this.form = this.formBuilder.group({
            content: ['', Validators.required],
            title: ['', Validators.required],
            image: ['', Validators.required],
        });
    this.loginemail = localStorage.getItem("loginuser");  
    
    
        
  }
    
    get f() { return this.form.controls; }
    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        //this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.form.value.image = this.image;
        // this.form.value['Token'] = '1e665104816270e9f3718436c032783d5281fd59';
        // this.data = this.form.value;
        let uploadForm = new FormData();
        uploadForm.append('title', this.form.get('title').value);
        uploadForm.append('image', this.form.value.image);
        uploadForm.append('content', this.form.get('content').value);
        console.log(uploadForm);
        console.log(this.form.value.image);
        
       this.httpService.register('posts/', uploadForm).subscribe((res: any) => {
            this.loading = false;
            this.submitted = true;
            this.alertService.success('Blog added successfully', { keepAfterRouteChange: true });
        }, err =>{

           this.loading = false;
           this.alertService.error('not added');
        });
    }
        changeListener($event): void {
        this.image = $event.target.files[0];
       // debugger
        // this.readThis($event.target);
    }

    readThis(inputValue: any): void {
        var file: File = inputValue.files[0];
        var myReader: FileReader = new FileReader();

        myReader.onloadend = (e) => {
            this.image = myReader.result;
        }
        myReader.readAsDataURL(file);
    }
    logout() {
       // localStorage.removeItem("token");
       // localStorage.removeItem("loginuser");
       // localStorage.removeItem("loginid");
       // localStorage.removeItem("resettoken");
       localStorage.clear();
        this.router.navigate(["register"]);
      }
      
}
