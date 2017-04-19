"use strict";
var ShortLink = (function () {
    function ShortLink() {
    }
    ShortLink.prototype.getShortUriString = function () {
        var location = window.location.protocol + "//" + window.location.host;
        if (!location.endsWith("/")) {
            location += "/";
        }
        return location + this.ShortPath;
    };
    ShortLink.prototype.getLongUriString = function () {
        return this.Uri.toString();
    };
    ShortLink.prototype.deserialize = function (input) {
        this.ShortPath = input.ShortPath;
        this.CreateDate = input.CreateDate;
        this.Count = input.Count;
        this.Uri = input.Uri;
        return this;
    };
    return ShortLink;
}());
exports.ShortLink = ShortLink;
