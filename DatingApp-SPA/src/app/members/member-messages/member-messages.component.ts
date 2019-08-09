
import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../_models/message';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service';
import { AlertifyService } from '../../_services/alertify.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})

export class MemberMessagesComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private userService: UserService
  ) {}

  @Input() recipientId: number;
  messages: Message[];
  newMessage: any = {};
  ngOnInit() {
    this.loadMessages();
  }

    loadMessages() {
    const currentUserId = +this.authService.decodedToken.nameid;
    this.userService.getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
    .pipe(
      tap((messages: Message[]) => {
        for (let index = 0; index < messages.length; index++) {
          if ( messages[index].isRead === false && messages[index].recipientId === currentUserId) {
              this.userService.markAsReadMessage(currentUserId , messages[index].id);
          }
        }
      })
    )
   .subscribe((messages: Message[]) => {
        this.messages = messages;
    }, error => {
      this.alertify.error(error);
    });
  }

  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
      this.userService.sendMessage(this.authService.decodedToken.nameid , this.newMessage)
      .subscribe((msg: Message) => {
        // debugger;
        this.messages.unshift(msg);
        this.newMessage.content = '';
      }, error => {
          this.alertify.error(error);
      });
  }
}


// import { Component, OnInit, Input } from '@angular/core';
// import { Message } from '../../_models/message';
// import { UserService } from '../../_services/user.service';
// import { AuthService } from '../../_services/auth.service';
// import { AlertifyService } from '../../_services/alertify.service';


// @Component({
//   selector: 'app-member-messages',
//   templateUrl: './member-messages.component.html',
//   styleUrls: ['./member-messages.component.css']
// })
// export class MemberMessagesComponent implements OnInit {
//   @Input() recipientId: number;
//   messages: Message[];

//   constructor(private userService: UserService, private authService: AuthService,
//       private alertify: AlertifyService) { }

//   ngOnInit() {
//     this.loadMessages();
//   }

//   loadMessages() {
//     const currentUserId = +this.authService.decodedToken.nameid;
//     this.userService.getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
//       .subscribe((messages: Message[]) => {
//         this.messages = messages;
//     }, error => {
//       this.alertify.error(error);
//     });
//   }
// }
