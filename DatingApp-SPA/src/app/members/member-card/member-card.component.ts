import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() user: User;

  constructor(private userService: UserService, private alertify: AlertifyService,
    private authService: AuthService) { }

  ngOnInit() {
  }

  like(id: number) {
    this.userService.sendLike(this.authService.decodedToken.nameid , id).subscribe( data => {
      this.alertify.success('you liked user: ' + this.user.knownAs);
    }, error => {
      this.alertify.error(error);
    });
  }
}
