import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/_service/socket.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Observable, Subject } from "rxjs";
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  form = new FormGroup({
    msg: new FormControl(''),
  });
  newMessage: string;
  messageList:any = [];
  getmessageList:any=[];
 // msg:any;
  constructor(public socketService: SocketService,
    private formBuilder: FormBuilder
    ) {
    
   }

  ngOnInit(): void {
    this.socketService.connectSocket();
    this.socketService
      .getMessages()
      //.subscribe((message: string) => {
       this.getmessageList = this.getmessageList.push('msg');
       //this.getmessageList = localStorage.getItem(JSON.parse('key'));
      // debugger
    // }
    // );
  }
  get f() { return this.form.controls; }

  sendMessage() {
        // stop here if form is invalid
       if (this.form.invalid) {
            return;
        }
       // this.loading = true;
      // console.log(this.form.value);
      this.messageList = this.form.value;
      this.socketService.sendText(this.form.value.msg);
      //debugger 
      
      this.form.reset();
      
  }
}
