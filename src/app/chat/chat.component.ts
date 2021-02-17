import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/_service/socket.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Observable, Subject } from "rxjs";
import { HttpService } from 'src/app/http.service';
import {  AlertService } from 'src/app/_service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  form = new FormGroup({
    msg: new FormControl(''),
  });
  id:number;
  email:any;
  paramid:any;
  newMessage: string;
  messageList = [];
  getmessageList:any=[];
  userlist:any=[];
  msg:any=[];
  sendmsg:any=[];
  msg1:any =[];
  text:string;
  loginid:any;
  constructor(public socketService: SocketService,
    private formBuilder: FormBuilder,
    private readonly httpService: HttpService,
    private alertService: AlertService,
    private actRoute: ActivatedRoute
    ) {
      this.httpService.getuserlist('userlist/').subscribe((data: any) => {
       this.userlist = data;  
       }, error => {
         this.alertService.error('Error');
      }); 
   }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(params => {
      this.paramid = params.get('id');
      this.email = params.get('email');
      //debugger
    });
    this.socketService.getMessages().subscribe((message: string) => {
      this.messageList.push(message);
      console.log(message);
     });

     this.loginid = JSON.parse(localStorage.getItem('loginid'));
    //  this.loginid = this.email;

  }
  get f() { return this.form.controls; }
  sendMessage() {
    // stop here if form is invalid
   if (this.form.invalid) {
        return;
    }
   let uploadForm = new FormData();
     uploadForm.append('message', this.form.value.msg);
      //uploadForm.append('receiver', this.email);
      uploadForm.append('receiver', this.paramid);
    // this.httpService.sendmsg('send/',uploadForm).subscribe((data: any) => {
    //  this.sendmsg = data;  
    //  this.messageList.push(data);
   //  }, error => {
   //     this.alertService.error('Error');
   //  });
  this.socketService.sendText(this.form.value.msg,this.paramid);
  this.form.reset();
  
}
 getMessage(){
      //get message from database
     // console.log('ok');
      this.httpService.getmsg('inbox/?limit=10').subscribe((data: any) => {
          this.messageList = data.results;
         //debugger
        }, error => {
           this.alertService.error('Error');
            });
  }
}
