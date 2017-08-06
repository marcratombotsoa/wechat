import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { 
    MdGridListModule,
    MdInputModule,
    MdButtonModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    MdGridListModule,
    MdInputModule,
    MdButtonModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
