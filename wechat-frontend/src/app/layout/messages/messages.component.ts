import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../shared/model/message';
import { StompService } from 'ng2-stomp-service';
import { MessageService } from "app/shared/service/message.service";
import { ChannelService } from "app/shared/service/channel.service";

@Component({
  selector: 'wt-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

    private messages: Array<Message> = [];
    private filteredMessages: Array<Message> = [];
    private newMessage: string;
    private channel: string;
    
    @Input()
    private username: string;

    constructor(private stompService: StompService, private messageService: MessageService
            , private channelService: ChannelService) { }

    ngOnInit() {
      this.messages = [];
      this.channelService.getChannel().subscribe(channel => {
          this.channel = channel;
          this.filterMessages();
      });
      
      this.messageService.getMessages().subscribe(messages => {
          this.filterMessages();
      });
    }

    sendMessage() {
      if (this.newMessage) {
          this.stompService.send('/app/messages', {'channel': this.channel
              , 'sender': this.username, 'content': this.newMessage});
          this.newMessage = '';
          this.scrollToBottom();
      }
    }

    filterMessages() {
      this.filteredMessages = this.messageService.filterMessages(this.channel);
      this.scrollToBottom();
    }
    
    scrollToBottom() {
        var msgContainer = document.getElementById("msg-container");
        msgContainer.scrollTop = msgContainer.scrollHeight;
    }
}
