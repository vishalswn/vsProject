import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/_service/socket.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Observable, Subject } from "rxjs";
import { HttpService } from 'src/app/http.service';
import {  AlertService } from 'src/app/_service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-chatmessage',
  templateUrl: './chatmessage.component.html',
  styleUrls: ['./chatmessage.component.css']
})
export class ChatmessageComponent implements OnInit {
  
  form = new FormGroup({
    msg: new FormControl(''),
  });
  email:string;
  newMessage: string;
  messageList:any = [];
  getmessageList:any=[];
  userlist:any=[];
  constructor(
    public socketService: SocketService,
    private formBuilder: FormBuilder,
    private readonly httpService: HttpService,
    private alertService: AlertService,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(params => {
      this.email = params.get('id');
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
      this.socketService.sendText(this.form.value.msg);
      //debugger 
      
      this.form.reset();
      
  }

}
