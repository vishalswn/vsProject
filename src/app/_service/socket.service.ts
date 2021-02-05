import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  msg:any;
  subject:any;
  webSocket: any;
  key:any;
  constructor(public readonly http: HttpClient) {

    

   }
  
  connectSocket() {
    this.key = localStorage.getItem('key');
     let token = localStorage.getItem("token");    
    // let headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    //const subject = new WebSocket("ws://192.168.0.133:8000/ws/");

   this.webSocket = new WebSocket(`ws://192.168.1.11:8000/socket/?token=${token}`);
    
   //console.log(subject);
   this.webSocket.onopen = (e: any) => {
  		console.log('connnected');
    };

    this.webSocket.onmessage = (e: any) => {
      console.log(JSON.parse(e.data));
    };

    this.webSocket.onerror = (e: any) => {
    	console.log('error');
    };
    
    this.webSocket.onclose = (e: any) => {
    	console.log('close');
    };
  }

  sendText(message: string) {
    // Construct a msg object containing the data the server needs to process the message from the chat client.
    var msg = {
      //type: "receive group message",
      message: message,
    };
    //debugger
    
    // Send the msg object as a JSON-formatted string.
    this.webSocket.send(JSON.stringify(msg));
    localStorage.setItem('key', JSON.stringify(msg));
  }

getMessages = () =>  {
 // return Observable.create((observer) => {
          //this.subject.on('new-message', (message) => {
          //    observer.next(message);
         // });
 // });
this.msg = localStorage.getItem('key');

//console.log();
//debugger

}
}

