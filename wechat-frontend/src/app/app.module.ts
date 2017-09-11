import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { UserService } from './shared/service/user.service';
import { ChannelService } from './shared/service/channel.service';
import { StompService } from 'ng2-stomp-service';
import { MessageService } from "app/shared/service/message.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [UserService, ChannelService, StompService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
