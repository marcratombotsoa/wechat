import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../shared/service/user.service';
import { User } from '../../shared/model/user';
import { Message } from '../../shared/model/message';
import { StompService } from 'ng2-stomp-service';
import { ChannelService } from '../../shared/service/channel.service';
import { settings } from '../../shared/util/settings';
import { AuthService } from "angular4-social-login";

@Component( {
    selector: 'wt-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
} )
export class HomeComponent implements OnInit {

    private receiver: string;
    private username: string;

    constructor( private router: Router, private userService: UserService
            , private stompService: StompService, private authService: AuthService ) {
        stompService.configure({
            host: settings.baseUrl + '/wechat',
            queue: {'init': false}
        });
    }
    
    ngOnInit() {
        this.username = sessionStorage.getItem( "user" );
        if ( this.username == null || this.username === '' ) {
            this.router.navigate( ['/'] );
        }
    }
    
    onReceiverChange(event) {
        this.receiver = event;
    }
    
    logout() {
        this.userService.logout({'id': null, 'username': this.username})
        .subscribe(
            res => {
                this.logoutSocial();
            },
            error => {
                console.log(error._body);
            });
    }
    
    logoutSocial() {
        this.authService.signOut().then(() => {
            this.clearSession();
        },
        error => {
            this.clearSession();
        });
    }
    
    clearSession() {
        sessionStorage.removeItem( "user" );
        this.stompService.disconnect();
        this.username = null;
        this.router.navigate( ['/'] );
    }
}