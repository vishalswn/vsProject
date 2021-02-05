import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { AlertService } from 'src/app/_service';
import * as _ from 'lodash';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  logid: any;
  loading = false;
  submitted = false;
  data:any = [];
  constructor(private http: HttpService,
    private alertService: AlertService 
    ) { }

  ngOnInit(): void {
    this.logid = localStorage.getItem("loginid");
    this.http.getprofile(`update_profile/${this.logid}/`).subscribe((response:any) => {
      //console.log(response);
      this.data=response.data; 
     //this.data1 = _.lowerCase(response.data);
    // console.log(this.data1);
    },
    error => {
      this.alertService.error('Error');
      this.loading = false;
    }
    );
  }
  userlist(){
    console.log('ok');
  }

  delete(i){
    console.log('ok you can delete');
    //this.http.splice(i,1);
  }

}
