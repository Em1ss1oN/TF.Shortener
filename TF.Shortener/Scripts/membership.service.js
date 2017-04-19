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
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var user_1 = require("./user");
require("rxjs/add/operator/map");
var MembershipService = (function () {
    function MembershipService(http) {
        this.http = http;
        this.accountRegisterApi = 'api/account/register/';
        this.accountLoginApi = 'api/account/login/';
        this.accountLogoutApi = 'api/account/logoff/';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    MembershipService.prototype.register = function (newUser) {
        var _this = this;
        return this.http.post(this.accountRegisterApi, JSON.stringify(newUser), { 'headers': this.headers })
            .map(function (response) {
            var result = new LoginResponse().deserialize(response.json());
            if (result.Success) {
                _this.setAuthenticatedUser(new user_1.User(newUser.Login, newUser.Password));
            }
            return result;
        });
    };
    MembershipService.prototype.login = function (creds) {
        var _this = this;
        return this.http.post(this.accountLoginApi, JSON.stringify(creds), { 'headers': this.headers })
            .map(function (response) {
            var result = new LoginResponse().deserialize(response.json());
            if (result.Success) {
                _this.setAuthenticatedUser(creds);
            }
            return result;
        });
    };
    MembershipService.prototype.logout = function () {
        var _this = this;
        return this.http.post(this.accountLogoutApi, { 'headers': this.headers })
            .map(function (response) {
            var result = new LoginResponse().deserialize(response.json());
            if (result.Success) {
                _this.clearAuthenticatedUser();
            }
            return result;
        });
    };
    MembershipService.prototype.setAuthenticatedUser = function (user) {
        localStorage.setItem('user', JSON.stringify(user));
    };
    MembershipService.prototype.clearAuthenticatedUser = function () {
        localStorage.removeItem('user');
    };
    MembershipService.prototype.isUserAuthenticated = function () {
        var _user = localStorage.getItem('user');
        if (_user != null)
            return true;
        else
            return false;
    };
    MembershipService.prototype.getLoggedInUser = function () {
        var user;
        if (this.isUserAuthenticated()) {
            var data = localStorage.getItem('user');
            try {
                var userData = JSON.parse(data);
                user = new user_1.User(userData.Login, userData.Password);
            }
            catch (e) {
            }
        }
        return user;
    };
    return MembershipService;
}());
MembershipService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], MembershipService);
exports.MembershipService = MembershipService;
var LoginResponse = (function () {
    function LoginResponse() {
    }
    LoginResponse.prototype.deserialize = function (input) {
        this.Message = input.Message;
        this.Success = input.Success;
        this.User = input.User;
        return this;
    };
    return LoginResponse;
}());
exports.LoginResponse = LoginResponse;
