import { Injectable } from '@angular/core';
import { Message } from "app/shared/model/message";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

@Injectable()
export class MessageService {
    
    private messages: Array<Message> = [];
    private msgs = new Subject<Array<Message>>();

    pushMessage(message: Message) {
        this.messages.push(message);
        this.msgs.next(this.messages);
    }
    
    filterMessages(channel: string): Array<Message> {
        return this.messages.filter(message => channel === message.channel);
    }
    
    getMessages(): Observable<any> {
        return this.msgs.asObservable();
    }
}