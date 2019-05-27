import { Injectable } from '@angular/core';
// import * as alertify from '../../../node_modules/alertifyjs/alertifyjsDownload/alertify.min.js';
import * as alertify from 'node_modules/alertifyjs/alertifyjsDownload/alertify.min.js';
// declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {
  constructor() {}

  confirm(message: string, okCallback: () => any) {
    alertify.confirm(message, function(e) {
      if (e) {
        okCallback();
      } else {}
    });
  }

  success(message: string) {
    alertify.success(message);
  }

  error(message: string) {
    alertify.error(message);
  }

  warning(message: string) {
    alertify.warning(message);
  }

  message(message: string) {
    alertify.message(message);
  }
}
