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
var UriComponent = (function () {
    function UriComponent(shortLinkService) {
        this.shortLinkService = shortLinkService;
        this.generated = false;
        this.error = false;
        this.inProgress = false;
    }
    UriComponent.prototype.onSubmit = function () {
        var _this = this;
        this.error = false;
        this.inProgress = true;
        this.shortLinkService.shortenLink(this.link).subscribe(function (data) {
            _this.link = data;
            _this.inProgress = false;
            _this.generated = true;
            _this.input.nativeElement.focus();
            _this.input.nativeElement.select();
        }, function (error) {
            _this.error = true;
            _this.inProgress = false;
            var data = JSON.parse(error.text());
            var text = data.Message;
            if (text !== undefined) {
                _this.errorText = text;
            }
            else {
                _this.errorText = error;
            }
        });
    };
    UriComponent.prototype.ngAfterViewInit = function () {
        console.log(this.input.nativeElement);
    };
    return UriComponent;
}());
__decorate([
    core_1.ViewChild('inputLink'),
    __metadata("design:type", core_1.ElementRef)
], UriComponent.prototype, "input", void 0);
UriComponent = __decorate([
    core_1.Component({
        selector: 'my-uri',
        templateUrl: './Components/uri.html',
    }),
    __metadata("design:paramtypes", [shortlink_service_1.ShortLinkService])
], UriComponent);
exports.UriComponent = UriComponent;
