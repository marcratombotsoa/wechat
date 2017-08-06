import { Injectable } from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';

@Injectable()
export class ChannelUtil {

    public static createChannel(user1: string, user2: string): string {
        let combined: string = '';
        
        if (user1 < user2) {
            combined = user1 + user2;
        } else {
            combined = user2 + user1;
        }
        
        return Md5.hashStr(combined).toString();
    }
}