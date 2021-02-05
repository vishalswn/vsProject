import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: SocketService) { }

  public sendMessage(messageList: any) {
    
  }
}
