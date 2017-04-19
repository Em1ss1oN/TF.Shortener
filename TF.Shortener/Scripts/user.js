"use strict";
var User = (function () {
    function User(username, password) {
        this.Login = username;
        this.Password = password;
        this.RememberMe = true;
    }
    return User;
}());
exports.User = User;
