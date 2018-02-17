import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from '../model/user';
import { settings } from '../util/settings';

@Injectable()
export class UserService {

    constructor(private http: Http) {}

    login(user: User): any {
        return this.http.post(settings.baseUrl + '/login', user, null);
    }

    logout(user: User): any {
        console.log('Loging out');
        return this.http.post(settings.baseUrl + '/logout', user, null);
    }

    findUsers() {
        return this.http.get(settings.baseUrl + '/listUsers');
    }
}
