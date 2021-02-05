import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { AlertService } from 'src/app/_service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
//import { RegisterService } from 'src/app/register.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-update-blog',
  templateUrl: './update-blog.component.html',
  styleUrls: ['./update-blog.component.css']
})
export class UpdateBlogComponent implements OnInit {
    updateblogform: FormGroup;
    loading = false;
    submitted = false;
    image;
    data:any=[];
    logid: any;
  constructor(
    private http: HttpService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    //private readonly registerService: RegisterService,
    private readonly httpService: HttpService,
    private router: Router,
    private alertService: AlertService 
  ) { }

  ngOnInit(): void {
    this.updateblogform = this.formBuilder.group({
      content: ['', Validators.required],
      title: ['', Validators.required],
      image: ['', Validators.required],
  });

  this.http.getblog(`posts/${localStorage.getItem('editid')}/`).subscribe((response:any) => {
     console.log(response);
     console.log(response.title);
     this.updateblogform.patchValue({
       title:response.title,
       content:response.content,
       image:response.image,
     });
  },
  error => {
    this.alertService.error('Error');
    this.loading = false;
  }
  );

  }
  get f() { return this.updateblogform.controls; }
  

  onSubmit(){
    this.submitted = true;
        // stop here if form is invalid
        if (this.updateblogform.invalid) {
            return;
        }
        this.loading = true;
        this.updateblogform.value.image = this.image;
        let uploadForm = new FormData();
        uploadForm.append('title', this.updateblogform.get('title').value);
        uploadForm.append('image', this.updateblogform.value.image);
        uploadForm.append('content', this.updateblogform.get('content').value);
        console.log(uploadForm);
        //console.log(this.updateblogform.value.image);
        this.httpService.updateblog(`posts/${localStorage.getItem('editid')}/`, uploadForm).subscribe((data: any) => {
          this.alertService.success(data.message, { keepAfterRouteChange: true });
          this.loading = false;
            this.submitted = true;
          this.alertService.success('blog updated successfully', { keepAfterRouteChange: true });  
        },
        error => {
          this.alertService.error('Error');
          this.loading = false;
        }
        );
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

}
