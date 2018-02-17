import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Message } from 'app/shared/model/message';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { settings } from '../util/settings';

@Injectable()
export class MessageService {

    private messages: Array<Message> = [];
    private msgs = new Subject<Array<Message>>();

    constructor(private http: Http) {}

    pushMessage(message: Message) {
        this.messages.push(message);
        this.msgs.next(this.messages);
    }

//    pushMessages(messages: Array<any>) {
//        this.messages.push(message);
//        this.msgs.next(this.messages);
//    }

    filterMessages(channel: string): Array<Message> {
        return this.messages.filter(message => channel === message.channel)
            .sort((m1, m2) => {
                if (m1.timestamp > m2.timestamp) {
                    return 1;
                }

                return -1;
            });
    }

    sendReadReceipt(channelId: string, username: string) {
        this.http.post(settings.baseUrl + '/messages/', {
            channel: channelId,
            username: username
        });
    }

    getMessages(): Observable<any> {
        return this.msgs.asObservable();
    }

//    initMessages(channel: string): any {
//        return this.http.get(settings.baseUrl + '/messages/' + channel).subscribe(res => {
//            this.pushMessages(res.data);
//        });
//    }
}
