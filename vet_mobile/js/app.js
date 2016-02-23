/**
 * Created by dpetrov on 14.08.2015.
 */
$(document).ready(function(){
    //styled wrapper
    var $styledWrapper = $('.styled');
    $styledWrapper.click(function(){
        var selVal = $(this).val();
        $(this).prev().removeClass('inactive').text(selVal);
    });
    $styledWrapper.change(function(){
        var selVal = $(this).val();
        $(this).prev().removeClass('inactive').text(selVal);
    });
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
            var arrUp = $('<span/>', { 'class': 'arr-up', 'role': 'ArrUp' });
            var arrDown = $('<span/>', { 'class': 'arr-down', 'role': 'ArrDown' });

            field.attr('type') == 'number' ? field.wrap('<span class="number-wrap" />').attr('hidden', 'hidden') : '';
            var numberWrap  = field.parents('.number-wrap');
            if (field.val() <= field.data('min')){
                arrDown.addClass('inactive');
            }
            if(field.val() >= field.data('max')) {
                arrUp.addClass('inactive');
            }
            numberWrap.prepend(numbValue);
            numberWrap.prepend(arrUp);
            numberWrap.append(arrDown);
            numbValue.text(field.val());
            arrUp.click(function ()
            {
                if(field.val() >= field.data('max')) {
                    $(this).addClass('inactive')
                }
                else {
                    var is_down = $(this).is('.' + 'arr-down'),
                        val = parseInt(field.val(), 10) || 0;
                    arrDown.removeClass('incative');
                    field.val((val + 1));
                    numbValue.text(field.val());
                    $(this).removeClass('inactive');
                    arrDown.removeClass('inactive');
                }
            });
            arrDown.click(function ()
            {
                var is_down = $(this).is('.' + 'arr-down'),
                    val = parseInt(field.val(), 10) || 0;
                if(field.val() <= field.data('min') + 1){
                    $(this).addClass('inactive');
                    field.val((val - 1));
                    numbValue.text(field.val());
                    if(field.val() < field.data('min')){
                        field.val(val)
                        numbValue.text(field.val());
                    }
                }
                else{
                    $(this).removeClass('inative');
                    field.val((val - 1));
                    numbValue.text(field.val());
                }
            });
        })
    };
    if($('input[type="number"]').length) {
        init_number();
    }
    //tabs
    var $tabsClick = $('.tabs-click');
    var $tabsContent = $('.tabs-content');
    $tabsClick.click(function(){
        $tabsClick.removeClass('active');
        $(this).addClass('active');
        $tabsContent.removeClass('active');
        var $neededTab = $(this).attr('href');
        $($neededTab).addClass('active');
        return false
    });
    //to delete
    var $aButton = $('a.button');
    $aButton.click(function(){
        $aButton.removeClass('active');
        $(this).addClass('active');
    });
    $('#navButton').click(function(){
        $('#nav').toggleClass('opened');
        console.log('ff');
    });
    //ya maps
    if($('#map').length) {
        init_number();
        ymaps.ready(init);
        var myMap;
        function init(){
            myMap = new ymaps.Map("map", {
                center: [55.796825, 37.612165],
                zoom: 12
            });

            myMap.behaviors.disable('scrollZoom');
            myPlacemark = new ymaps.Placemark([55.796825, 37.612165], {
                hintContent: 'Наш офис'
            }, {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                // Размеры метки.
                iconImageSize: [37, 42],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-3, -42]
            });
            myMap.geoObjects.add(myPlacemark);
        }
    }


    /////?????????????????????????????????????????????????????????
    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };
    if(!isMobile.any()) {
        $('body').addClass('mobile_preview');
    }

    var temp_menu = function ()
    {
        var rootMenu = $('<div id="sub" />').appendTo('body');
        var menu = [
            ["index", "главная"],
            ["alphabet", "алафитный указатель"],
            ["articles_news", "новости"],
            ["articles_text", "текстовая"],
            ["card_ordering", "оформление заказа"],
            ["cart", "Корзина"],
            ["category", "категории"],
            ["contacts", "контакты"],
            ["item", "товар"],
            ["lk", "Личный кабинет"]
        ]
        for (var i = 0; i < menu.length; i++)
        {
            var m = $('<a/>', {'href' : menu[i][0] + '.html'}).text(menu[i][1]);
            $('#sub').append(m);
        }

        rootMenu.css({position: 'fixed',top: '1%',right: '0.3%',zIndex: '999'});
        rootMenu.find('a').css({display: 'block',padding: '3px',color: 'white', background: 'black', margin: '0 1px', opacity: .5});
    }
    temp_menu();
});

