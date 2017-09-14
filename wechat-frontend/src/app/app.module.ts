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

import { SocialLoginModule, AuthServiceConfig
    , GoogleLoginProvider, FacebookLoginProvider
    } from "angular4-social-login";
 
let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("823898676621-427jhcjug96ijmbt9il0h9chd8norbdk.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("131571760819154")
  }
]);

export function socialConfig() {
    return config;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SocialLoginModule
  ],
  providers: [UserService, ChannelService, StompService, MessageService
              , {
      provide: AuthServiceConfig,
      useFactory: socialConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
