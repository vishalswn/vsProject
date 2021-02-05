import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { AlertService } from 'src/app/_service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  loading = false;
  data:any = [];
  did:number;
  constructor(
    private http: HttpService,
    private alertService: AlertService 
  ) { }

  ngOnInit(): void {
    //console.log('blog load');
    this.http.getblog(`posts/`).subscribe((response:any) => {
      //console.log(response);
      this.data=response; 
      //this.data1 = _.lowerCase(response.data);
     //console.log(this.data);
    },
    error => {
      this.alertService.error('Error');
      this.loading = false;
    }
    );
   
  }
  deleteRow(id){
    alert('Do you really want to delete');
    localStorage.setItem('deleteid',id);
    //let did = localStorage.getItem('deleteid');
    this.http.deleterow(`posts/${localStorage.getItem('deleteid')}/`).subscribe((response:any) => {
      //console.log(response);
      this.data=response; 
      this.alertService.success(this.data, { keepAfterRouteChange: true });
    },
    error => {
     this.alertService.error('Error');
     this.loading = false;
    }
    );
  }
  updateRow(id){
    localStorage.setItem('editid',id);
  }

}
