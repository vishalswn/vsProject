import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {
  //form:FormGroup
  data:any=[];
  name = 'Angular';
  name1:any;
  email1:any;
  form = new FormGroup({
   name: new FormControl('', [Validators.required, Validators.minLength(3)]),
   email: new FormControl('', [Validators.required, Validators.email]),
   name1: new FormControl('', [Validators.required, Validators.minLength(3)]),
   email1: new FormControl('', [Validators.required, Validators.email]),
 });

  constructor() { }

  ngOnInit(): void {
    this.name='vishal';
  }

  submit(){
    console.log(this.form.valid);
  
    if(this.form.valid){
      console.log(this.form.value);
    }
  }
  shippingCheckboxHandler(event){
   this.data =  this.form.value;
    this.form.setValue({
      name:this.data.name,
      email:this.data.email,
      name1:this.data.name,
      email1:this.data.email,
    });   
  }

}
