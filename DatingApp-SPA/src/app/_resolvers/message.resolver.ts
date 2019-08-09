// import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router  } from '@angular/router';
// import { Message } from '../_models/message';
// import { Observable, of } from 'rxjs';
// import { AuthService } from '../_services/auth.service';
// import { AlertifyService } from '../_services/alertify.service';
// import { UserService } from '../_services/user.service';
// import { catchError } from 'rxjs/operators';
// import { Injectable } from '@angular/core';

// @Injectable()

// export class MessageResolver implements Resolve<Message[]> {
//     constructor(private authService: AuthService, private alertify: AlertifyService,
//         private router: Router, private userService: UserService) { }
//        page = 1;
//        itemsPerPage = 5;
//        messageContainer = 'Unread';

//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
//      Message[] | Observable<Message[]> | Promise<Message[]> {
//         return this.userService.getMessages(this.authService.decodedToken.nameid, this.page , this.itemsPerPage, this.messageContainer)
//         .pipe(
//             catchError(error => {
//                 this.alertify.error(error);
//                 this.router.navigate(['/home']);
//                 return of(null);
//             })
//         );
//     }
// }

import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Message } from '../_models/message';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MessageResolver implements Resolve<Message[]> {
    pageNumber = 1;
    pageSize = 5;
    messageContainer = 'Unread';

    constructor(private userService: UserService, private router: Router,
        private alertify: AlertifyService, private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
        return this.userService.getMessages(this.authService.decodedToken.nameid,
              this.pageNumber, this.pageSize, this.messageContainer).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving messages');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
