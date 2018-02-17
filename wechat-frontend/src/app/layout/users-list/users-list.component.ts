import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { UserService } from '../../shared/service/user.service';
import { User } from '../../shared/model/user';
import { StompService } from 'ng2-stomp-service';
import { ChannelService } from '../../shared/service/channel.service';
import { Message } from '../../shared/model/message';
import { MatSnackBar } from '@angular/material';
import { MessageService } from 'app/shared/service/message.service';

@Component( {
    selector: 'wt-userlist',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.css']
} )
export class UsersListComponent implements OnInit {

    NEW_USER_LIFETIME: number = 1000 * 5;

    @Input()
    username: string;

    @Output()
    receiverUpdated = new EventEmitter<string>();

    users: Array<User> = [];
    highlightedUsers: Array<string> = [];
    newConnectedUsers: Array<string> = [];
    channel: string;
    receiver: string;

    constructor(private userService: UserService, private stompService: StompService,
            private channelService: ChannelService, private snackBar: MatSnackBar
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

    @HostListener('window:focus', [])
    sendReadReceipt() {
        if (this.channel != null && this.receiver != null) {
            this.messageService.sendReadReceipt(this.channel, this.receiver);
        }
    }

    startChatWithUser(user) {
        const channelId = ChannelService.createChannel(this.username, user.username);
        this.channelService.refreshChannel(channelId);
        this.receiver = user.username;
        this.highlightedUsers = this.highlightedUsers.filter(u => u !== user.username);
        this.receiverUpdated.emit(user.username);
        this.messageService.sendReadReceipt(channelId, user.username);
    }

    getOtherUsers(): Array<User> {
        return this.users.filter(user => user.username !== this.username);
    }

    getUserItemClass(user): string {
        let classes: string = 'user-item';
        if (user.username === this.receiver) {
            classes += ' current-chat-user ';
        }

        if (this.highlightedUsers.indexOf(user.username) >= 0) {
            classes += ' new-message';
        }

        if (this.newConnectedUsers.indexOf(user.username) >= 0) {
            classes += ' new-user';
        }

        if (!user.connected) {
            classes += ' disconnected-user';
        }

        return classes;
    }

    initUserEvents() {
        this.stompService.startConnect().then(
            () => {
               this.stompService.done('init');
               this.stompService.subscribe('/channel/login', res => {
                   if (res.username !== this.username) {
                       this.newConnectedUsers.push(res.username);
                       setTimeout((
                               function() {
                                   this.removeNewUserBackground(res.username);
                               }
                       ).bind(this), this.NEW_USER_LIFETIME);
                       this.users = this.users.filter(item => item.username !== res.username);
                       this.users.push(res);
                       this.subscribeToOtherUser(res);
                   }
               });

               this.stompService.subscribe('/channel/logout', res => {
                   this.users = this.users.filter(item => item.username !== res.username);
                   this.users.push(res);
                   const channelId = ChannelService.createChannel(this.username, res.username);
                   if (this.channel === channelId) {
                       this.receiverUpdated.emit('');
                       this.channelService.removeChannel();
                   }
               });

               this.subscribeToOtherUsers(this.users, this.username);
            });
    }

    removeNewUserBackground(username) {
        this.newConnectedUsers = this.newConnectedUsers.filter(u => u !== username);
    }

    subscribeToOtherUsers(users, username) {
        const filteredUsers: Array<any> = users.filter(user => username !== user.username);
        filteredUsers.forEach(user => this.subscribeToOtherUser(user));
    }

    subscribeToOtherUser(otherUser): string {
        const channelId = ChannelService.createChannel(this.username, otherUser.username);
        this.stompService.subscribe('/channel/chat/' + channelId, res => {
            this.messageService.pushMessage(res);

            if (res.channel !== this.channel) {
                this.showNotification(res);
            } else {
                // send read receipt for the channel
                this.messageService.sendReadReceipt(this.channel, otherUser.username);
            }
        });

        return channelId;
    }

    showNotification(message: Message) {
        const snackBarRef = this.snackBar.open('New message from ' + message.sender, 'Show', {duration: 3000});
        this.highlightedUsers.push(message.sender);
        snackBarRef.onAction().subscribe(() => {
            this.receiver = message.sender;
            this.receiverUpdated.emit(message.sender);
            this.channel = ChannelService.createChannel(this.username, message.sender);
            this.channelService.refreshChannel(this.channel);
          });
    }
}
