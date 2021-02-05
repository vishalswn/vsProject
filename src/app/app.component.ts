import { Component } from '@angular/core';
import { User } from './_models';
import { AccountService } from './_service';
import { SocketService } from 'src/app/_service/socket.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crud-by-api';
  user: User;
  constructor(private accountService: AccountService,
    public socketService: SocketService
    ) {
      this.accountService.user.subscribe(x => this.user = x);
  }
  ngOnInit(){
  	this.socketService.connectSocket();
  }
}
