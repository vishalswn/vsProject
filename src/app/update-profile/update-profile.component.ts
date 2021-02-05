import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
//import { RegisterService } from 'src/app/register.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/_service';
import { first } from 'rxjs/operators';
import { ConfirmedValidator } from 'src/app/confirmed.validator';
import { HttpService } from 'src/app/http.service';
@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  updateform: FormGroup;
  loading = false;
  submitted = false;
  image;
 // data
  data:any = [];
  imgURL: any;
  logid: any;
  public message: string;
  constructor(
    private http: HttpService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    //private readonly registerService: RegisterService,
    private readonly httpService: HttpService,
    private router: Router,
    private alertService: AlertService
  ) { }
  get f() { return this.updateform.controls; }
  ngOnInit(): void {

    this.updateform = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(3)]],
      city: ['', [Validators.required, Validators.minLength(3)]],
      state: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      profile_pic: ['', Validators.required],
      zip_code: ['', Validators.required],
    },
     );
    this.logid = localStorage.getItem("loginid");
    //console.log(this.logid);
    this.httpService.getprofile(`update_profile/${this.logid}/`).subscribe((response: any) => {
      this.alertService.success(response.message, { keepAfterRouteChange: true });
      let data: any = response.data;
      this.imgURL = data.profile_pic;
      console.log(response.data);
      this.updateform.patchValue({
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        mobile_number: data.mobile_number,
        // profile_pic: data.profile_pic,
        state: data.state,
        zip_code: data.zip_code,
        city: data.city,
        address: data.address,
        gender: data.address,
        date_of_birth: data.date_of_birth,
      });
    }, error => {
      this.alertService.error('Error');
      this.loading = false;
    });
  }
  //`/api/abc/getbyID/${abc}`
  onSubmit() {
    this.submitted = true;
    // reset alerts on submit
    this.alertService.clear();
    // stop here if form is invalid
    if (this.updateform.invalid) {
      return;
    }
    this.loading = true;
    this.updateform.value['profile_pic'] = this.image;
    var updateForm = new FormData();
    for (let dd in this.updateform.value) {
      updateForm.append(dd, this.updateform.value[dd]);
    }
    // console.log(this.updateform.value);
    this.httpService.updateprofile(`update_profile/${this.logid}/`, updateForm).subscribe((data: any) => {
      this.alertService.success(data.message, { keepAfterRouteChange: true });
    });
  }

  changeListener($event): void {
    this.image = $event.target.files[0];
    this.readThis($event.target);
    //this.imgURL = $event.target;
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    // this.imgPath = file;
    // myReader.readAsDataURL(file[0]);
    myReader.onloadend = (e) => {
      this.imgURL = myReader.result;  // base64
      //console.log(myReader.result);
    }
    myReader.readAsDataURL(file);
  }


}
