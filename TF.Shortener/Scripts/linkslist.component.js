"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var shortlink_service_1 = require("./shortlink.service");
var membership_service_1 = require("./membership.service");
var LinksListComponent = (function () {
    function LinksListComponent(shortLinkService, membershipService) {
        this.shortLinkService = shortLinkService;
        this.membershipService = membershipService;
        this.error = false;
        this.inProgress = false;
    }
    LinksListComponent.prototype.ngOnInit = function () {
        this.user = this.membershipService.getLoggedInUser();
        this.loadLinks();
    };
    LinksListComponent.prototype.loadLinks = function () {
        this.inProgress = true;
        this.links = this.shortLinkService.getAllLinks();
        this.inProgress = false;
    };
    return LinksListComponent;
}());
LinksListComponent = __decorate([
    core_1.Component({
        selector: 'my-linksList',
        templateUrl: './Components/linkslist.html',
    }),
    __metadata("design:paramtypes", [shortlink_service_1.ShortLinkService, membership_service_1.MembershipService])
], LinksListComponent);
exports.LinksListComponent = LinksListComponent;
