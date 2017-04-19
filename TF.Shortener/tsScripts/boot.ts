///<reference path="./../typings/globals/core-js/index.d.ts"/>
"use strict";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { ClipboardModule } from "ngx-clipboard";
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { UriComponent } from './uri.component';
import { LinksListComponent } from './linkslist.component';
import { LoginComponent } from './login.component';
import { ShortLinkService } from './shortlink.service';
import { MembershipService } from './membership.service';

@NgModule({
    imports: [BrowserModule, FormsModule, ClipboardModule, HttpModule,
        RouterModule.forRoot([
            { path: 'uri', component: UriComponent },
            { path: 'linkslist', component: LinksListComponent },
            { path: '', redirectTo: '/uri', pathMatch: 'full' }
        ])],
    declarations: [AppComponent, UriComponent, LinksListComponent, LoginComponent],
    providers: [ShortLinkService, MembershipService],
    bootstrap: [AppComponent]
})
export class AppModule { }