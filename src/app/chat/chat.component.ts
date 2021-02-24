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
  public edited = false;

  form = new FormGroup({
    msg: new FormControl(''),
  });
  imgURL: any;
  chatwith:string;
  id:number;
  paramemail:any;
  paramid:any;
  newMessage: string;
  messageList:any = [];
  getmessageList:any=[];
  userlist:any=[];
  msg:any=[];
  sendmsg:any=[];
  msg1:any =[];
  text:string;
  loginid:any;
  soketmsg:any;
  getemail:string;


  constructor(public socketService: SocketService,
    private formBuilder: FormBuilder,
    private readonly httpService: HttpService,
    private alertService: AlertService,
    private actRoute: ActivatedRoute
    ) {
      this.httpService.getuserlist('users/').subscribe((data: any) => {
       this.userlist = data;  
       }, error => {
         this.alertService.error('Error');
      }); 
   }

   ngOnInit(): void {
    this.form = this.formBuilder.group({
	    msg: ['', Validators.required]
	});
    this.actRoute.paramMap.subscribe(params => {
      this.paramid = params.get('id');
      this.paramemail = params.get('email');
      
      //debugger
    });
    this.socketService.getMessages().subscribe((data: any) => {
    this.messageList.push(data);
    //this.newMessage = message;
     //debugger 
     });

     this.loginid = JSON.parse(localStorage.getItem('loginid'));
    //  this.loginid = this.email;

  }

  get f() { return this.form.controls; }

   getMessage(id,email){
      this.getemail = email;
      this.paramid = id;
      this.edited = true;
      //get message from database
      this.chatwith ='Chat with';
      this.imgURL ='https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg';
      this.httpService.getmsg(`messages/?recipient_email=${this.getemail}`).subscribe((data: any) => {
         this.messageList = data;
          debugger
         console.log(this.messageList);
         //  this.messageList.push(data.results);
        }, error => {
           this.alertService.error('Error');
       });
  }

  sendMessage() {
    // stop here if form is invalid
   if (this.form.invalid) {
        return;
    }
   let uploadForm = new FormData();
     uploadForm.append('message', this.form.value.msg);
      //uploadForm.append('receiver', this.email);
      uploadForm.append('receiver', this.paramid);
    this.httpService.sendmsg('send/',uploadForm).subscribe((data: any) => {
    this.sendmsg = data;  
   // this.messageList.push(data);
    //debugger
    }, error => {
     this.alertService.error('Error');
     });
  this.socketService.sendText(this.form.value.msg,this.paramid);
  this.form.reset();
  
}

}
