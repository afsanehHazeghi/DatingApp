import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppComponent } from './app.component';
import { AuthService } from './_services/auth.service';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AlertifyService } from './_services/alertify.service';

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      RegisterComponent,
      HomeComponent
   ],
   imports: [
      FormsModule,
      BrowserModule,
      HttpClientModule,
      BsDropdownModule.forRoot()
   ],
   providers: [
      AuthService , ErrorInterceptorProvider, AlertifyService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
