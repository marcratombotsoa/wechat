import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../shared/service/user.service';
import { User } from '../../shared/model/user';

@Component( {
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
} )
export class HomeComponent implements OnInit {

    private username: string;

    private users: Array<User> = [];
    private messages: Array<string> = ["Hi", "how are you?", "good", "and you?","Fine"];

    constructor( private router: Router, private userService: UserService ) {}

    ngOnInit() {
        this.username = sessionStorage.getItem( "user" );
        if ( this.username == null || this.username === '' ) {
            this.router.navigate( ['/'] );
        } else {
            this.userService.findUsers().subscribe(
                res => {
                    this.users = res.json();
                }
            );
        }
    }

    logout() {
        this.userService.logout({'id': null, 'username': this.username})
        .subscribe(
            res => {
                sessionStorage.removeItem( "user" );
                this.username = null;
                this.router.navigate( ['/'] );
            },
            error => {
                console.log(error._body);
            });
    }
}
