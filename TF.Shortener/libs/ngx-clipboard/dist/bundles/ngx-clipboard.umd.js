(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core'], factory) :
	(factory((global.ngx = global.ngx || {}, global.ngx.clipboard = global.ngx.clipboard || {}),global.ng.core));
}(this, (function (exports,_angular_core) { 'use strict';

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
        return Reflect.metadata(k, v);
};
exports.ClipboardDirective = (function () {
    /**
     * @param {?} elmRef
     */
    function ClipboardDirective(elmRef) {
        this.elmRef = elmRef;
        this.cbOnSuccess = new _angular_core.EventEmitter();
        this.cbOnError = new _angular_core.EventEmitter();
    }
    /**
     * @return {?}
     */
    ClipboardDirective.prototype.ngOnInit = function () {
        var _this = this;
        var /** @type {?} */ option;
        option = !!this.targetElm ? { target: function () { return (_this.targetElm); } } : { text: function () { return _this.cbContent; } };
        this.clipboard = new Clipboard(this.elmRef.nativeElement, option);
        this.clipboard.on('success', function () { return _this.cbOnSuccess.emit(true); });
        this.clipboard.on('error', function () { return _this.cbOnError.emit(true); });
    };
    /**
     * @return {?}
     */
    ClipboardDirective.prototype.ngOnDestroy = function () {
        if (this.clipboard) {
            this.clipboard.destroy();
        }
    };
    return ClipboardDirective;
}());
__decorate$1([
    _angular_core.Input('ngxClipboard'),
    __metadata("design:type", _angular_core.ElementRef)
], exports.ClipboardDirective.prototype, "targetElm", void 0);
__decorate$1([
    _angular_core.Input(),
    __metadata("design:type", String)
], exports.ClipboardDirective.prototype, "cbContent", void 0);
__decorate$1([
    _angular_core.Output(),
    __metadata("design:type", _angular_core.EventEmitter)
], exports.ClipboardDirective.prototype, "cbOnSuccess", void 0);
__decorate$1([
    _angular_core.Output(),
    __metadata("design:type", _angular_core.EventEmitter)
], exports.ClipboardDirective.prototype, "cbOnError", void 0);
exports.ClipboardDirective = __decorate$1([
    _angular_core.Directive({
        selector: '[ngxClipboard]'
    }),
    __metadata("design:paramtypes", [_angular_core.ElementRef])
], exports.ClipboardDirective);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.ClipboardModule = (function () {
    function ClipboardModule() {
    }
    return ClipboardModule;
}());
exports.ClipboardModule = __decorate([
    _angular_core.NgModule({
        declarations: [exports.ClipboardDirective],
        exports: [exports.ClipboardDirective]
    })
], exports.ClipboardModule);

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-clipboard.umd.js.map
