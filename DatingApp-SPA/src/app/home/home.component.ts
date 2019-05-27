import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  values: any;
  constructor(private http: HttpClient , private auth: AuthService) { }

  ngOnInit() {
    this.getValues();
  }

  getValues() {
    this.http.get(this.auth.baseUrl + 'Values').subscribe((response: any) => {
      this.values = response;
    }, error => console.log(error));
  }
  registerToggle () {
    this.registerMode = true;
  }

  cancelRegister(registerMode: boolean) {
    console.log(registerMode);
    this.registerMode = registerMode;
  }
}
