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
var shortlink_1 = require("./shortlink");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var ShortLinkService = (function () {
    function ShortLinkService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.apiUrl = 'api/short';
    }
    ShortLinkService.prototype.shortenLink = function (link) {
        return this.http.post(this.apiUrl, JSON.stringify({ 'Link': link }), { 'headers': this.headers }).map(function (response) {
            var shortLink = new shortlink_1.ShortLink().deserialize(response.json());
            return shortLink.getShortUriString();
        });
    };
    ShortLinkService.prototype.getAllLinks = function () {
        return this.http.get(this.apiUrl, { 'headers': this.headers }).map(function (response) {
            var array = response.json();
            var result = new Array();
            if (array instanceof Array) {
                array.forEach(function (item) {
                    var shortLink = new shortlink_1.ShortLink().deserialize(item);
                    result.push(shortLink);
                });
            }
            return result;
        });
    };
    return ShortLinkService;
}());
ShortLinkService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ShortLinkService);
exports.ShortLinkService = ShortLinkService;
