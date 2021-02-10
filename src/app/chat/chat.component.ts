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
  email:any;
  newMessage: string;
  messageList:any = [];
  getmessageList:any=[];
  userlist:any=[];
  msg:any=[];
  msg1:any =[];
  constructor(public socketService: SocketService,
    private formBuilder: FormBuilder,
    private readonly httpService: HttpService,
    private alertService: AlertService,
    private actRoute: ActivatedRoute
    ) {

      this.httpService.getuserlist('user/').subscribe((data: any) => {
        this.userlist = data;
        
        }, error => {
          this.alertService.error('Error');
      });
    
   }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(params => {
      this.email = params.get('id');
    });
    this.socketService.getMessages().subscribe((message: string) => {
      this.messageList.push(message);
      
      //this.msg = message;
      this.msg1 = {
        message,
        recipient:this.email
      }; 
     // alert(JSON.stringify(this.msg1));
      //debugger
      //alert(this.msg1.message.message);

     });
  }
  get f() { return this.form.controls; }

  sendMessage() {
    // stop here if form is invalid
   if (this.form.invalid) {
        return;
    }
   // this.loading = true;
  // console.log(this.form.value);
  //this.messageList = this.form.value;
  this.socketService.sendText(this.form.value.msg,this.email);
  //debugger  
  this.form.reset();
  
}
}
