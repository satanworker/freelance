System.register(['angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var HighlightDirective;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            HighlightDirective = (function () {
                function HighlightDirective(el) {
                    this.el = el;
                    this._defaultColor = 'red';
                }
                Object.defineProperty(HighlightDirective.prototype, "defaultColor", {
                    set: function (colorName) {
                        this._defaultColor = colorName || this._defaultColor;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(HighlightDirective.prototype, "elementTest", {
                    set: function (testParam) {
                        console.log(testParam);
                    },
                    enumerable: true,
                    configurable: true
                });
                ;
                HighlightDirective.prototype.onSomeClick = function () {
                    this.el.nativeElement.style.color = 'red';
                };
                HighlightDirective.prototype.onMouseEnter = function () {
                    this._highlight(this.highlightColor || this._defaultColor);
                };
                HighlightDirective.prototype.onMouseLeave = function () {
                    this._highlight(null);
                };
                HighlightDirective.prototype._highlight = function (color) {
                    this.el.nativeElement.style.backgroundColor = color;
                };
                __decorate([
                    core_1.Input('myHighlight'), 
                    __metadata('design:type', String)
                ], HighlightDirective.prototype, "highlightColor", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String), 
                    __metadata('design:paramtypes', [String])
                ], HighlightDirective.prototype, "defaultColor", null);
                __decorate([
                    core_1.Input('testVar'), 
                    __metadata('design:type', String), 
                    __metadata('design:paramtypes', [String])
                ], HighlightDirective.prototype, "elementTest", null);
                HighlightDirective = __decorate([
                    core_1.Directive({
                        selector: '[myHighlight]',
                        host: {
                            '(click)': 'onSomeClick()',
                            '(mouseenter)': 'onMouseEnter()',
                            '(mouseleave)': 'onMouseLeave()'
                        }
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], HighlightDirective);
                return HighlightDirective;
            }());
            exports_1("HighlightDirective", HighlightDirective);
        }
    }
});
//# sourceMappingURL=highlight.directive.js.map