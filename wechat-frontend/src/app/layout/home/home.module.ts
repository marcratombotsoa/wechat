import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule } from '@angular/forms';
import { 
    MdGridListModule,
    MdInputModule,
    MdButtonModule,
    MdListModule,
    MdIconModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    MdGridListModule,
    MdInputModule,
    MdButtonModule,
    MdListModule,
    MdIconModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
