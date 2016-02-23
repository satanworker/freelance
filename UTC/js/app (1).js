$(function ()
{
    $("body").keydown(function(e) {
        var t = $(this);
        e.keyCode == 220 ? t.toggleClass("color-debug") :""
    });

    temp_menu();
    Navigator();
    browser_detect();
    init_number();
});

var temp_menu = function ()
{
    var rootMenu = $('<div id="sub" />').appendTo('body');
    var menu = [
        ["index", "главная"],
        ["category", "категории"],
        ["item-card", "карточка товара"],
        ["category-fast-view", "быстрый просмотр"],
        ["cart", "корзина"]
    ]
    for (var i = 0; i < menu.length; i++)
    {
        var m = $('<a/>', {'href' : menu[i][0] + '.html'}).text(menu[i][1]);
        $('#sub').append(m);
    }

    rootMenu.css({position: 'fixed',top: '1%',right: '0.3%',zIndex: '999'});
    rootMenu.find('a').css({display: 'block',padding: '3px',color: 'white', background: 'black', margin: '0 1px', opacity: .5});
}

function browser_detect() {
    navigator.sayswho = (function () {
        var navi = navigator.appName,
            ua = navigator.userAgent,
            tem,
            re_match = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);

        if (re_match && (tem = ua.match(/version\/([\.\d]+)/i)) != null) {
            re_match[2] = tem[1];
        }

        if (re_match) {
            re_match = [re_match[1], re_match[2]];
        } else {
            re_match = [navi, '-?'];
        }

        // short code for ie8 detection
        var bversion = re_match[1],
            compClass = bversion.split('.', 1),
            cC = compClass.toString();

        $('body').addClass(re_match[0]).addClass(cC);
    })();
}

function Navigator() {
    if (!!navigator.platform.match(/linux/i)) {
        $('body').addClass('linux');
    } else if (!!navigator.platform.match(/win/i)) {
        $('body').addClass('windows');
    } else if (!!navigator.platform.match(/iphone/i)) {
        $('body').addClass('iphone ios');
    } else if (!!navigator.platform.match(/ipad/i)) {
        $('body').addClass('ipad ios');
    } else if (!!navigator.platform.match(/macIntel/i)) {
        $('body').addClass('mac');
    }

    var windowWidth = parseInt($(window).width(), 10);
    if (windowWidth > 1000) {
        $('body').addClass('desktop');
    } else if (windowWidth > 758) {
        $('body').addClass('tablet');
    } else {
        $('body').addClass('phone');
    }
}

function init_number ()
/**
 * worked prototype for input[type="number"]
 *
 * Copyright (c) 2011 Vladimir Axyonov - sketch43@gmail.com
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 *
 * author of this "implementation" method - Tabasov.K
 */
{
    $('input').each(function(){

        var field = $(this);
        //console.log(field)
        var numbValue = $('<span/>', { 'class': 'numb-value' });
        var arrUp = $('<span/>', { 'class': 'arr-up', 'role': 'ArrUp', text: "+" });
        var arrDown = $('<span/>', { 'class': 'arr-down', 'role': 'ArrDown', text: "-" });

        field.attr('type') == 'number' ? field.wrap('<span class="number-wrap" />').attr('hidden', 'hidden') : '';

        var numberWrap  = field.parents('.number-wrap');

        numberWrap.prepend(numbValue);
        numberWrap.append(arrUp);
        numberWrap.prepend(arrDown);
        numbValue.text(field.val())

        arrUp.add(arrDown).click(function ()
        {
            var is_down = $(this).is('.' + 'arr-down'),
                val = parseInt(field.val(), 10) || 0;
            field.val(is_down ? (val - 1) : (val + 1));
            numbValue.text(field.val())
        });

        arrUp.add(arrDown).bind('mousedown', function ()
        {
            var is_down = $(this).is('.' + 'arr-down'),
                val = parseInt(field.val(), 10) || 0;
            press_interval = setInterval(function ()
            {
                field.val(is_down ? (val--) : (val++));
                numbValue.text(field.val())
            }, 100);
        });

        arrUp.add(arrDown).bind('mouseup', function ()
        {
            clearInterval(press_interval);
        });
    })
};