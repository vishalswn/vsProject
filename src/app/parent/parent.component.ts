import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
  messageToSendP: string = '';
  receivedChildMessage: string;
  constructor() { }

  ngOnInit(): void {
  }
  //receivedChildMessage: string;
  getMessage(message: string) {
    this.receivedChildMessage = message;
  }
  sendToChild(message: string) {
    this.messageToSendP = message;
  }
  

}
