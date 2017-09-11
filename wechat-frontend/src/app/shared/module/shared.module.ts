import { NgModule } from '@angular/core';
import {
    MdGridListModule,
    MdInputModule,
    MdButtonModule,
    MdListModule,
    MdIconModule,
    MdSnackBarModule
} from '@angular/material';

@NgModule( {
    imports: [
        MdGridListModule,
        MdInputModule,
        MdButtonModule,
        MdListModule,
        MdIconModule,
        MdSnackBarModule
    ],
    declarations: [],
    exports: [
        MdGridListModule,
        MdInputModule,
        MdButtonModule,
        MdListModule,
        MdIconModule,
        MdSnackBarModule
    ]
} )
export class SharedModule {

}