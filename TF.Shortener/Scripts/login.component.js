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
var router_1 = require("@angular/router");
var registration_1 = require("./registration");
var membership_service_1 = require("./membership.service");
var user_1 = require("./user");
var LoginComponent = (function () {
    function LoginComponent(service, router) {
        this.service = service;
        this.router = router;
        this.login = new user_1.User('', '');
        this.registration = new registration_1.Registration('', '', '');
        this.loginError = false;
        this.registerError = false;
        this.loggedIn = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.loggedIn = false;
        this.user = new user_1.User('', '');
        this.service.clearAuthenticatedUser();
    };
    LoginComponent.prototype.onLogin = function () {
        var _this = this;
        this.service.login(this.login).subscribe(function (result) {
            if (result.Success) {
                _this.loginError = false;
                _this.loggedIn = true;
                _this.user = _this.service.getLoggedInUser();
            }
            else {
                _this.setLoginError(result.Message);
            }
        }, function (error) {
            console.error(error);
            _this.setLoginError(error);
        });
    };
    LoginComponent.prototype.setLoginError = function (value) {
        this.loginError = true;
        this.loginErrorText = value;
    };
    LoginComponent.prototype.onRegister = function () {
        var _this = this;
        this.service.register(this.registration).subscribe(function (result) {
            if (result.Success) {
                _this.registerError = false;
                _this.loggedIn = true;
                _this.user = _this.service.getLoggedInUser();
            }
            else {
                _this.setRegisterError(result.Message);
            }
        }, function (error) {
            console.error(error);
            _this.setRegisterError(error);
        });
    };
    LoginComponent.prototype.setRegisterError = function (value) {
        this.registerError = true;
        this.registerErrorText = value;
    };
    LoginComponent.prototype.logout = function () {
        var _this = this;
        this.service.logout().subscribe(function (response) {
            if (response.Success) {
                _this.user = new user_1.User('', '');
                ;
                _this.loggedIn = false;
            }
        }, function (error) { return console.error(error); });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'my-login',
        templateUrl: './Components/login.html',
    }),
    __metadata("design:paramtypes", [membership_service_1.MembershipService, router_1.Router])
], LoginComponent);
exports.LoginComponent = LoginComponent;
