import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../shared/service/user.service';
import { User } from '../../shared/model/user';
import { StompService } from 'ng2-stomp-service';
import { ChannelService } from '../../shared/service/channel.service';
import { settings } from '../../shared/util/settings';
import { Message } from '../../shared/model/message';
import { MdSnackBar } from '@angular/material';
import { MessageService } from "app/shared/service/message.service";

@Component( {
    selector: 'wt-userlist',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.css']
} )
export class UsersListComponent implements OnInit {

    @Input() 
    username: string;
    
    @Output()
    receiverUpdated = new EventEmitter<string>();
    
    users: Array<User> = [];
    channel: string;
    
    constructor(private userService: UserService, private stompService: StompService,
            private channelService: ChannelService, private snackBar: MdSnackBar
            , private messageService: MessageService) {
    }

    ngOnInit() {
        this.userService.findUsers().subscribe(
            res => {
                this.users = res.json();
                this.initUserEvents();
            }
        );
        
        this.channelService.getChannel().subscribe(channel => this.channel = channel);
    }

    startChatWithUser(user) {
        console.log(user);
        const channelId = ChannelService.createChannel(this.username, user.username);
        this.channelService.refreshChannel(channelId);
        this.receiverUpdated.emit(user.username);
    }
    
    getOtherUsers(): Array<User> {
        return this.users.filter(user => user.username !== this.username);
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
                   const channelId = ChannelService.createChannel(this.username, res.username);
                   if (this.channel === channelId) {
                       this.receiverUpdated.emit('');
                       this.channelService.removeChannel();
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
        const channelId = ChannelService.createChannel(this.username, otherUser.username);
        this.stompService.subscribe('/channel/chat/' + channelId, res => {
            this.messageService.pushMessage(res);
            
            if (res.channel !== this.channel) {
                this.showNotification(res);
            }
        });
        
        return channelId;
    }
    
    showNotification(message: Message) {
        let snackBarRef = this.snackBar.open('New message from ' + message.sender, 'Show', {duration: 3000});
        
        snackBarRef.onAction().subscribe(() => {
            this.receiverUpdated.emit(message.sender);
            this.channel = ChannelService.createChannel(this.username, message.sender);
            this.channelService.refreshChannel(this.channel);
          });
    }
}
