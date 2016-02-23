!function(undefined) {
    "use strict";

    var baron = function(root, data) {
        var out = [];

        if (!root[0]) {
            root = [root];
        }
        for (var i = 0 ; i < root.length ; i++) {
            out[i] = new baron.init(root[i], data);
        }

        return out;
    };

    // gData - user defined data, not changed during baron work
    // Constructor!
    baron.init = function (root, gData) {
        var viewPortHeight, // viewable content summary height
            topHeights,
            rTimer,
            selector,
            event,
            dom,
            scroller,
            container,
            bar,
            barTop, // bar position
            drag,
            scrollerY0;

        // Switch on the bar by adding user-defined CSS classname
        function barOn(on) {
            if (on) {
                dom(bar).addClass(gData.barOnCls || '');
            } else {
                dom(bar).removeClass(gData.barOnCls || '');
            }
        }

        function posBar(top, height) {
            var barMinHeight = gData.barMinHeight || 20;

            dom(bar).css('top', top + 'px');
            if (height !== undefined) {
                if (height > 0 && height < barMinHeight) {
                    height = barMinHeight;
                }
                dom(bar).css({height: height + 'px'});
            }
        }

        // Relation of bar top position to container relative top position
        function k() {
            return scroller.clientHeight - bar.offsetHeight - (gData.barTop || 0);
        }

        // Relative container top position to bar top position
        function relToTop(r) {
            return r * k() + (gData.barTop || 0);
        }

        // Bar top position to relative container top position
        function topToRel(t) {
            return (t - (gData.barTop || 0)) / k();
        }

        // Text selection start preventing
        function dontStartSelect() {
            return false;
        }

        // Text selection preventing on drag
        function selection(on) {
            // document.unselectable = on ? 'off' : 'on';
            event(document, "selectstart", dontStartSelect, on ? 'off' : '');
            // dom(document.body).css('MozUserSelect', on ? '' : 'none' ); // Old versions of firefox
        }

        // Viewport (re)calculation
        this.viewport = function () {
            viewPortHeight = scroller.clientHeight;
            topHeights = [];
        };

        // Total positions data update, container height dependences included
        this.updateScrollBar = function () {
            var containerTop, // Container virtual top position
                oldBarHeight, newBarHeight;

            containerTop = -(scroller.pageYOffset || scroller.scrollTop);
            barTop = relToTop(-containerTop / (container.offsetHeight - scroller.clientHeight));
            newBarHeight = scroller.clientHeight * scroller.clientHeight / container.offsetHeight;

            // We dont need no scrollbat -> making bar 0px height
            if (scroller.clientHeight >= container.offsetHeight) {
                newBarHeight = 0;
            }

            // Positioning bar
            if (oldBarHeight !== newBarHeight) {
                posBar(barTop, newBarHeight);
                oldBarHeight = newBarHeight;
            } else {
                posBar(barTop);
            }

        };

        // Engines initialization
        var $ = window.jQuery;
        selector = gData.selector || $;
        if (!selector) {
            // console.error('baron: no query selector engine found');
            return;
        }
        event = gData.event || function (elem, event, func, off) {
            $(elem)[off || 'on'](event, func);
        };
        if (!gData.event && !$) {
            return;
        }
        dom = gData.dom || $;
        if (!dom) {
            // console.error('baron: no DOM utility engine found');
            return;
        }

        // DOM initialization
        scroller = selector(gData.scroller, root)[0];
        container = selector(gData.container, scroller)[0];
        bar = selector(gData.bar, scroller)[0];

        // DOM data
        if (!(scroller && container && bar)) {
            // console.error('baron: no scroller, container or bar dectected');
            return;
        }

        // Initialization. Setting scrollbar width BEFORE all other work
        barOn(scroller.clientHeight < container.offsetHeight);
        dom(scroller).css('width', scroller.parentNode.clientWidth + scroller.offsetWidth - scroller.clientWidth + 'px');

        // Viewport height calculation
        this.viewport();

        // Events initialization
        // onScroll
        event(scroller, 'scroll', this.updateScrollBar);

        // Resize
        var that = this;
        event(window, 'resize', function () {
            // Если новый ресайз произошёл быстро - отменяем предыдущий таймаут
            clearTimeout(rTimer);
            // И навешиваем новый
            rTimer = setTimeout(function () {
                that.viewport();
                that.updateScrollBar();
                barOn(container.offsetHeight > scroller.clientHeight);
            }, 200);
        });

        // Drag
        event(bar, 'mousedown', function (e) {
            e.preventDefault(); // Text selection disabling in Opera... and all other browsers?
            selection(); // Disable text selection in ie8
            drag = 1; // Another one byte
        });

        event(document, 'mouseup blur', function () {
            selection(1); // Enable text selection
            drag = 0;
        });

        event(document, 'mousedown', function (e) { // document, not window, for ie8
            scrollerY0 = e.clientY - barTop;
        });

        event(document, 'mousemove', function (e) { // document, not window, for ie8
            if (drag) {
                scroller.scrollTop = topToRel(e.clientY - scrollerY0) * (container.offsetHeight - scroller.clientHeight);
            }
        });

        // First update to initialize bar look
        this.updateScrollBar();

        return this;
    };

    baron.init.prototype.reinit = function () {
        this.viewport();
        this.updateScrollBar();
    };

    window.baron = baron;
}();