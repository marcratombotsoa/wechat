import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../shared/service/user.service';
import { User } from '../../shared/model/user';
import { Message } from '../../shared/model/message';
import { StompService } from 'ng2-stomp-service';
import { ChannelUtil } from '../../shared/service/channel-util';
import { settings } from '../../shared/util/settings';
import { MdSnackBar } from '@angular/material';

@Component( {
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
} )
export class HomeComponent implements OnInit {

    private receiver: string;
    private username: string;
    private users: Array<User> = [];
    private messages: Array<Message> = [];
    private filteredMessages: Array<Message> = [];
    private newMessage: string;
    private channel: string;

    constructor( private router: Router, private userService: UserService
            , private stompService: StompService, private snackBar: MdSnackBar ) {
        stompService.configure({
            host: settings.baseUrl + '/wechat',
            queue: {'init': false}
        });
    }
    
    ngOnInit() {
        this.messages = [];
        this.username = sessionStorage.getItem( "user" );
        if ( this.username == null || this.username === '' ) {
            this.router.navigate( ['/'] );
        } else {
            this.userService.findUsers().subscribe(
                res => {
                    this.users = res.json();
                    this.initUserEvents();
                }
            );
        }
    }
    
    initUserEvents() {
        this.stompService.startConnect().then(
            () => {
               this.stompService.done('init');
               this.stompService.subscribe('/channel/login', res => {
                   if (res.username !== this.username) {
                       this.users.push(res);
                       this.subscribeToOtherUser(res);
                   }
               });
               
               this.stompService.subscribe('/channel/logout', res => {
                   this.users = this.users.filter(item => item.username !== res.username);
                   const channelId = ChannelUtil.createChannel(this.username, res.username);
                   if (this.channel === channelId) {
                       this.messages = this.messages.filter(message => message.channel !== channelId);
                       this.filterMessages();
                       this.receiver = null;
                       this.channel = null;
                   }
               });
               
               this.subscribeToOtherUsers(this.users, this.username);
            });
    }
    
    subscribeToOtherUsers(users, username) {
        let filteredUsers:Array<any> = users.filter(user => username !== user.username);
        filteredUsers.forEach(user => this.subscribeToOtherUser(user));
    }
    
    subscribeToOtherUser(otherUser): string {
        const channelId = ChannelUtil.createChannel(this.username, otherUser.username);
        this.stompService.subscribe('/channel/chat/' + channelId, res => {
            this.messages.push(res);
            this.filterMessages();
            
            if (res.channel !== this.channel) {
                this.showNotification(res);
            }
        });
        
        return channelId;
    }
    
    startChatWith(otherUser) {
        this.receiver = otherUser.username;
        this.channel = ChannelUtil.createChannel(this.username, otherUser.username);
        this.filterMessages();
    }
    
    sendMessage() {
        if (this.newMessage) {
            this.stompService.send('/app/messages', {'channel': this.channel
                , 'sender': this.username, 'content': this.newMessage});
            this.newMessage = '';
            
            var msgContainer = document.getElementById("msg-container");
            msgContainer.scrollTop = msgContainer.scrollHeight;
        }
    }

    filterMessages() {
        this.filteredMessages = this.messages.filter(message => this.channel === message.channel);
    }

    logout() {
        this.userService.logout({'id': null, 'username': this.username})
        .subscribe(
            res => {
                sessionStorage.removeItem( "user" );
                this.stompService.disconnect();
                this.username = null;
                this.router.navigate( ['/'] );
            },
            error => {
                console.log(error._body);
            });
    }
    
    getOtherUsers(): Array<User> {
        return this.users.filter(user => user.username !== this.username);
    }
    
    showNotification(message: Message) {
        let snackBarRef = this.snackBar.open('New message from ' + message.sender, 'Show', {duration: 3000});
        
        snackBarRef.onAction().subscribe(() => {
            console.log('start chat with ' + message.sender);
            this.receiver = message.sender;
            this.channel = ChannelUtil.createChannel(this.username, message.sender);
            this.filterMessages();
          });
    }
}
