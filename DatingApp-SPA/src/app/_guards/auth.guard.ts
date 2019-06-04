import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router, private aletify: AlertifyService) {}

  canActivate(): boolean {
    if (this.auth.loggedIn()) {
      return true;
    } else {
      this.aletify.error('you have not enaugh privilledge to access this route!!!');
      this.router.navigate(['/home']);
      return false;
    }
  }
}
