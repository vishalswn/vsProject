import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from "rxjs";
import { HttpService } from 'src/app/http.service';
import {  AlertService } from 'src/app/_service';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  email:string;
  msg:any;
  subject:any;
  webSocket: any;
  key:any;
  sendmsg:any;
  constructor(public readonly http: HttpClient,private actRoute: ActivatedRoute) {
    
   }
   ngOnInit(): void {
    
  }
  
  connectSocket() {
    this.key = localStorage.getItem('key');
     let token = localStorage.getItem("token");    
    // let headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    //const subject = new WebSocket("ws://192.168.0.133:8000/ws/");

   this.webSocket = new WebSocket(`ws://192.168.1.15:8000/socket/?token=${token}`);
    
   //console.log(subject);
   this.webSocket.onopen = (e: any) => {
  		console.log('connnected');
    };

    //this.webSocket.onmessage = (e: any) => {
    //  console.log('messages ->', JSON.parse(e.data));
   // };

    this.webSocket.onerror = (e: any) => {
    	console.log('error');
    };
    
    this.webSocket.onclose = (e: any) => {
    	console.log('close');
    };
  }


  public getMessages = () => {
    return Observable.create((observer) => {
      this.webSocket.onmessage = (e: any) => {
        console.log('messages ->', JSON.parse(e.data));
        observer.next(JSON.parse(e.data));
      
      };
    });
  }


  sendText(message: string,email: string) {
    // Construct a msg object containing the data the server needs to process the message from the chat client.
    var msg = {
      //type: "receive group message",
      body: message,
      recipient:email
    }; 
    // Send the msg object as a JSON-formatted string.
    this.webSocket.send(JSON.stringify(msg));
  }


}

