import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';

import { AppComponent } from './app.component';

const appRoutes: Routes = [
  { path: '**', redirectTo: '/' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule,
    FlashMessagesModule,
    FlexLayoutModule
  ],
  providers: [
    Title
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
