///<reference path="./../typings/globals/core-js/index.d.ts"/>
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var ngx_clipboard_1 = require("ngx-clipboard");
var router_1 = require("@angular/router");
var app_component_1 = require("./app.component");
var uri_component_1 = require("./uri.component");
var linkslist_component_1 = require("./linkslist.component");
var login_component_1 = require("./login.component");
var shortlink_service_1 = require("./shortlink.service");
var membership_service_1 = require("./membership.service");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, ngx_clipboard_1.ClipboardModule, http_1.HttpModule,
            router_1.RouterModule.forRoot([
                { path: 'uri', component: uri_component_1.UriComponent },
                { path: 'linkslist', component: linkslist_component_1.LinksListComponent },
                { path: '', redirectTo: '/uri', pathMatch: 'full' }
            ])],
        declarations: [app_component_1.AppComponent, uri_component_1.UriComponent, linkslist_component_1.LinksListComponent, login_component_1.LoginComponent],
        providers: [shortlink_service_1.ShortLinkService, membership_service_1.MembershipService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
