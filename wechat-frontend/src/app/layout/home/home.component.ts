import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Component( {
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
} )
export class HomeComponent implements OnInit {

    private username: string;

    constructor( private router: Router ) {}

    ngOnInit() {
        this.username = sessionStorage.getItem( "user" );
        if ( this.username == null || this.username === '' ) {
            this.router.navigate( ['/'] );
        }
    }

    logout() {
        sessionStorage.removeItem( "user" );
        this.username = null;
        this.router.navigate( ['/'] );
    }
}
