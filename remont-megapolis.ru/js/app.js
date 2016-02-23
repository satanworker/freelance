$(function(){
    //for popup
    $('a.button').click(function(){
        $('#popup').addClass('opened');
        return false
    });
    $('a.frame').click(function(){
        var hrefFrame = $(this).attr('href');
        var frame = $('<iframe src=' + hrefFrame + '> ' + '</iframe>');
        if($('#popup-div').contents().length) {
            return false
        }
        else{
            $('#popup-div').addClass('opened');
            frame.appendTo('#popup-div');
            return false
        }
    });
    $('#background, #callback-cross').click(function(){
        $('#popup').removeClass('opened');
        return false;
    });
    $('#background-div').click(function(){
        $('#popup-div').removeClass('opened').contents().remove();
    });

    //scroll spy
    var menuOffsetTop = $('#menu').outerHeight();
    var offsetT = $('#menu').outerHeight() + 20;
    $(window).scroll(function(){
        var scTop = $(window).scrollTop();
        var items = $('#menu a');
        var ar = [];
        var fired = 1;
        if ($(window).scrollTop() >= 107){
            $('#menu').addClass('fixed');
            items.map(function(){
                var item = $($(this).attr('href'));
                if(item.length >= 1) {
                    var itemOff = item.offset().top;
                }
                var tryy = $('#contacts').offset().top;
                if(scTop - (itemOff - offsetT) >= 0) {
                    ar.push(this);
                    if(ar.length) {
                        $('.menu a').removeClass('active');
                        $(ar[(ar.length - 1)]).addClass('active');
                    }
                }
            });
        }
        else {
            $('#menu').removeClass('fixed');
        }
    });

    //for menu animate scroll
    $('#menu a').click(function(e){
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top-offsetT + 25;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 300);
        e.preventDefault();
    });

    //for sert links need to remove
    $('a.sert, a.carousel-link').click(function(){
        var carouselInner = $('#carousel-example-generic').children('.carousel-inner');
        carouselInner.contents().remove();
        var linkClass = $(this).prop("class");
        var sisters = $(this).parents('.container').find('a.carousel-link');
        var hrefV = $(this).attr('href');
        var absoluteTop = $(window).scrollTop() + 60;
        var carouselMine = $('#carousel-example-generic');
        var thiattr = $(this).children().attr('src');
        $(sisters).each(function(){
            var hrefC = $(this).attr('href');
            $("<div class='item'>" + "<img src=" + hrefC + " alt='' /> </div>").prependTo(carouselInner);
        });
        var ActiveELement = $('img[src="' + hrefV + '"]').parent();
        ActiveELement.addClass('active');
        carouselMine.addClass('opened');
        //init carousel
        carouselMine.carousel({
            interval : false
        });
        //serts carousel
        if($(this).hasClass('sert')) {
            carouselMine.addClass('sert');
        }
        else {
            carouselMine.removeClass('sert');
        }

        return false
    });
    $('#carousel-background, .carousel-inner, #popup-cross').click(function(){
        $('#carousel-example-generic').removeClass('opened');
    });
    //list show done_end
    $('#watch').unbind('click').click(function(){
        var time = 100;
        $(this).fadeOut(time);
        setTimeout(function(){
            $('#watch').next().show();
        }, time);
        return false
    });
    $('#thanks-back').click(function(){
        $('#thanks').removeClass('opened');
    });
    $('input[type="text"]').mask("+7(999) 999-9999", {placeholder:"*"});
    $('input[type="submit"]').click(function() {
        var numberVal = $(this).siblings('input[type="text"]');
        if(numberVal.val().length !== 16) {
            numberVal.addClass('error');
            return false
        }
    });
    //for escape
    $(document).keydown(function(e) {
        if (e.keyCode == 27) {
            $('#popup, #carousel-example-generic').removeClass('opened');
            $('#popup-div').removeClass('opened').contents().remove();
        }
    });
    //for mousemove scroll
    $('.scroll').mousemove(function(event) {
        var x = event.pageX - $(this).offset().left;
        var elemWidth = $(this).width() / 100;
        var neededWidth = 9.6;
        var percentage = x / neededWidth;
        var elementLeft = elemWidth * percentage;
        var bottomElement = $(this).children('.bottom').first();
        console.log(x, elemWidth);
        if(bottomElement.children().length > 6 && percentage > 1 && percentage < 99) {
            bottomElement.css('left',-elementLeft);
        }
    });
    //for mousemove preview
    $('a.preview-link').click(function(){
        var container = $(this).parents('.container');
        var bigPreview = container.find('.preview-big');
        var hrefs = $(this).attr('href');
        bigPreview.addClass('disappeared');
        setTimeout(function(){
            bigPreview.attr('src', hrefs);
        }, 300);
        if(bigPreview.attr('src') == hrefs) {
            bigPreview.removeClass('disappeared');
        }
        else {
            $(bigPreview).load(function(){
                bigPreview.removeClass('disappeared');
            });
        }
        return false
    });
    //ymaps
    ymaps.ready(init);
    var myMap;
    function init(){
        myMap = new ymaps.Map("map", {
            center: [55.756508, 37.711051],
            zoom: 12
        });

        myMap.behaviors.disable('scrollZoom');
        myPlacemark = new ymaps.Placemark([55.78398, 37.659084], {
            hintContent: 'Наш офис'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: 'images/mark.png',
            // Размеры метки.
            iconImageSize: [59, 82],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-3, -42]
        });
        myPlacemark1 = new ymaps.Placemark([55.721305, 37.770978], {
            hintContent: 'Наш офис'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: 'images/mark.png',
            // Размеры метки.
            iconImageSize: [59, 82],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-8, -42]
        });
        myMap.geoObjects.add(myPlacemark1).add(myPlacemark);
    }
});