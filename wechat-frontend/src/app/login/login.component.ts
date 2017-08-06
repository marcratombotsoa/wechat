import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/service/user.service';

@Component( {
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
} )
export class LoginComponent implements OnInit {

    message: string;

    constructor(private router: Router, private userService: UserService) { }

    ngOnInit() {
    }
    
    connect(username:string) {
        this.clearData();
        if (username === null || username === undefined || username === '') {
            this.message = 'You must enter a username';
            return;
        }
        
        this.userService.login({'id': null, 'username': username})
        .subscribe(
            res => {
                sessionStorage.setItem("user", username);
                this.router.navigate(['home']);
            },
            error => {
                this.message = error._body;
            });
    }
    
    clearData() {
        sessionStorage.removeItem("user");
        this.message = null;
    }

}
