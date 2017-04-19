"use strict";
var Registration = (function () {
    function Registration(username, password, confirnation) {
        this.Login = username;
        this.Password = password;
        this.ConfirmPassword = confirnation;
    }
    return Registration;
}());
exports.Registration = Registration;
