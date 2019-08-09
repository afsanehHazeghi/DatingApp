import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../_models/message';
import { Pagination, PaginatedResult } from '../_models/pagination';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
    private userService: UserService, private authService: AuthService) { }
  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';

  ngOnInit() {
    this.route.data.subscribe( dt => {
          this.messages = dt['messages'].result;
          this.pagination = dt['messages'].pagination;
      });
  }

  loadMessages() {
    this.userService.getMessages(this.authService.decodedToken.nameid, this.pagination.currentPage,
      this.pagination.itemsPerPage, this.messageContainer)
      .subscribe((res: PaginatedResult<Message[]>) => {
        this.messages = res.result;
         this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }

  pageChanged(event: any): void {
   this.pagination.currentPage = event.page;
    this.loadMessages();
  }

  deleteMessage(id: number) {
    this.userService.deleteMessage(this.authService.decodedToken.nameid , id).subscribe(() => {
      this.alertify.confirm('Are you sure you want to delete this message??', () => {
        this.messages.splice(this.messages.findIndex(x => x.id === id) , 1);
        this.alertify.success('message deleted successfully!');
      });
    } , error => {
      this.alertify.error('couldn`t delete message!!');
    });
  }
}
