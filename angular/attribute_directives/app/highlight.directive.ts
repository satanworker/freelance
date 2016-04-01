import {Directive, ElementRef, Input} from 'angular2/core';

@Directive({
    selector: '[myHighlight]',
    host: {
        '(click)': 'onSomeClick()',
        '(mouseenter)': 'onMouseEnter()',
        '(mouseleave)': 'onMouseLeave()'
    }
})

export class HighlightDirective {

    @Input('myHighlight') highlightColor: string;

    @Input() set defaultColor(colorName:string) {
        this._defaultColor = colorName || this._defaultColor;
    }

    @Input('testVar') set elementTest (testParam:string) {
        console.log(testParam);
    };

    private _defaultColor = 'red';

    constructor(private el: ElementRef) {}

    onSomeClick() {
        this.el.nativeElement.style.color = 'red';
    }

    onMouseEnter() {
        this._highlight(this.highlightColor || this._defaultColor);
    }
    onMouseLeave() {
        this._highlight(null);
    }
    private _highlight( color:string ) {
        this.el.nativeElement.style.backgroundColor = color;
    }
}