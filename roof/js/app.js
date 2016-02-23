/**
 * Created by dmitry on 29.11.15.
 */
//owl init
function owl_init() {
    var checkWidth = $(window).width();
    var demo = $(".owl_carousel");
    if (checkWidth > 979 && demo.data('owlCarousel')) {
        demo.each(function(){
            $(this).data('owlCarousel').destroy();
            $(this).removeClass('owl-carousel');
        });
    } else if (checkWidth < 980) {
        demo.owlCarousel({
            singleItem:true
        });
    }
}
// iDevices
function iOS() {
    var iDevices = [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ];
    while (iDevices.length) {
        if (navigator.platform === iDevices.pop()){ return true; }
    }

    return false;
}
//initialize
function initialize() {
    var myPos = {lat: 55.750689, lng: 37.556494};
    var mapCanvas = document.getElementById('map');
    var mapOptions = {
        center: new google.maps.LatLng(myPos),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        styles: [
            {
                "featureType": "landscape",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "stylers": [
                    {
                        "hue": "#00aaff"
                    },
                    {
                        "saturation": -100
                    },
                    {
                        "gamma": 2.15
                    },
                    {
                        "lightness": 12
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "lightness": 24
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "lightness": 57
                    }
                ]
            }
        ]
    }
    var map = new google.maps.Map(mapCanvas, mapOptions)
    var marker = new google.maps.Marker({
        position: myPos,
        map: map,
        icon: 'images/marker.png'
    });
}
//menu click
function menu_click() {
    $('#menu_click').click(function(e){
        $(this).toggleClass('active');
        $('#mobile_menu').slideToggle();
        e.preventDefault();
    });
}
//tabs
function tabs() {
    var $tab_button = $('.tab_button');
    $tab_button.click(function(e){
        $tab_button.removeClass('active');
        $(this).addClass('active');
        $('.tab_container').removeClass('active');
        $($(this).attr('href')).addClass('active');
        e.preventDefault();
    });
}
function itemsAnimation(elem_parent, elemets, class_name) {
        console.log($(elem_parent).offset().top, $(window).scrollTop());
        if($(window).scrollTop() + 400 >= $(elem_parent).offset().top) {
            var timeOut = 300;
            $(elem_parent).find(elemets).each(function(index){
                $this = $(this);
                console.log($this);
                setTimeout(function(){
                    $this.addClass('animated ' + class_name);
                }, 300 * index);
            });
        }
}

/* set parallax background-position */
function parallaxPosition(e){
    var heightWindow = $(window).height();
    var topWindow = $(window).scrollTop();
    var bottomWindow = topWindow + heightWindow;
    var currentWindow = (topWindow + bottomWindow) / 2;
    $(".parallax").each(function(i){
        var path = $(this);
        var height = path.height();
        var top = path.offset().top;
        var bottom = top + height;
        // only when in range
        if(bottomWindow > top && topWindow < bottom){
            var imgW = path.data("resized-imgW");
            var imgH = path.data("resized-imgH");
            // min when image touch top of window
            var min = 0;
            // max when image touch bottom of window
            var max = - imgH + heightWindow;
            // overflow changes parallax
            var overflowH = height < heightWindow ? imgH - height : imgH - heightWindow; // fix height on overflow
            top = top - overflowH;
            bottom = bottom + overflowH;
            // value with linear interpolation
            var value = min + (max - min) * (currentWindow - top) / (bottom - top);
            // set background-position
            var orizontalPosition = path.attr("data-oriz-pos");
            orizontalPosition = orizontalPosition ? orizontalPosition : "50%";
            $(this).css("background-position", orizontalPosition + " " + value + "px");
        }
    });
}
function countdown( elementName, minutes, seconds )
{
    var element, endTime, hours, mins, msLeft, time;

    function twoDigits( n )
    {
        return (n <= 9 ? "0" + n : n);
    }

    function updateTimer()
    {
        msLeft = endTime - (+new Date);
        if ( msLeft < 1000 ) {
            element.innerHTML = "countdown's over!";
        } else {
            time = new Date( msLeft );
            hours = time.getUTCHours();
            mins = time.getUTCMinutes();
            element.innerHTML = (hours ? hours + ':' + twoDigits( mins ) : mins) + ':' + twoDigits( time.getUTCSeconds() );
            setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
        }
    }

    element = document.getElementById( elementName );
    endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
    console.log(endTime);
}
function soundPlayer() {
    function playNextSound(){
        app.current++;

        while(app.tracks[app.current].duration >= 2*3600*1000) {
            app.current++;
        }
        
        SC.stream('/tracks/'+app.tracks[app.current].id).then(function(player){
            app.player = player;
            fwd();
        });
    }
    function playSound(){
        SC.stream('/tracks/'+app.tracks[app.current].id).then(function(player){
            app.player = player;
        });
    }
    function textSoundPlayer() {
        var title = app.tracks[app.current].title;
        app.track_time = parseInt(app.tracks[app.current].duration / 1000);
        $('#title_player').text(title);
        playerTimer(false);
    }
    function playerTimer(t) {
        t = t || true;
        var hours   = parseInt(app.track_time / 3600);
        var minutes = parseInt((app.track_time - hours*3600) / 60);
        var seconds = parseInt(app.track_time - hours*3600 - minutes*60);

        $('#time').text("—"+hours+":"+minutes+":"+seconds);
        if(t) app.track_time--;
    }
    function fwd(){
        app.player.play();
        textSoundPlayer();
        app.interval = setInterval(playerTimer,1000)
    }
    //soundcloud
    var app = {
        tracks:[],
        player:{},
        current: 1,
        interval: null,
        track_time:0
    };
    var currentTrack;
    var currentNumber = 0;
    SC.initialize({
        client_id: '9ffea0ff27d50ada9c97c24b9cb96f3c'
    });
    SC.get('/users/kryshamira/tracks').then(function(tracks){
       app.tracks = tracks;
       textSoundPlayer();
       playSound();
    });
    $('#play').click(function(e){
        $(this).toggleClass('paused');
        if($(this).hasClass('paused')) {
            app.player.pause();
            clearInterval(app.interval);
        }
        else {
            app.player.play();
            app.interval = setInterval(playerTimer,1000)
        }
        e.preventDefault();
    });
    $('#fwd').click(function(e){
        $('#play').removeClass('paused');
        e.preventDefault();
        clearInterval(app.interval);
        playNextSound();
    });
    // app.interval = setInterval(function(){
    //     console.log(app.player.streamInfo.duration);
    // },1000)
};
$(document).ready(function(){
    //var fiveMinutes = 60 * 5,
    //    display = document.querySelector('#time');
    //startTimer(fiveMinutes, display);
    //sound player
    soundPlayer();
    if($('#map').length) {
        initialize();
    }
    //datepicker
    $('.datepicker').datepicker();
    //
    owl_init();
    $(window).resize(function(){
        owl_init();
    });
    menu_click();
    var press = $('.row.press');
    if(press.length) {
        $(window).scroll(function(){
            if($(window).scrollTop()+400 >= $('.row.press').offset().top ) {
                $('.press_item').each(function(index){
                    var $this = $(this);
                    setTimeout(function(){
                        $this.addClass('animated flipInX')
                    }, 200*index);
                });
            }
        });
    }
    tabs();
    //magnific popup
    $('.lightbox').magnificPopup({
        type: 'image'
        // other options
    });
    //check and init passbook
    if(!iOS()) {
        $('.add_pass').magnificPopup({
            items: {
                src: $('<div class="qr_code_popup"></div>')
            },
            type: 'inline'
        });
    }

    //paralax test
    /* detect touch */
    if("ontouchstart" in window){
        document.documentElement.className = document.documentElement.className + " touch";
    }
    if(!$("html").hasClass("touch")){
        /* background fix */
        $(".parallax").css("background-attachment", "fixed");
    }

    /* fix vertical when not overflow
     call fullscreenFix() if .fullscreen content changes */
    function fullscreenFix(){
        var h = $('body').height();
        // set .fullscreen height
        $(".content-b").each(function(i){
            if($(this).innerHeight() > h){ $(this).closest(".fullscreen").addClass("overflow");
            }
        });
    }
    $(window).resize(fullscreenFix);
    fullscreenFix();

    /* resize background images */
    function backgroundResize(){
        var windowH = $(window).height();
        $(".background").each(function(i){
            var path = $(this);
            // variables
            var contW = path.width();
            var contH = path.height();
            var imgW = path.attr("data-img-width");
            var imgH = path.attr("data-img-height");
            var ratio = imgW / imgH;
            // overflowing difference
            var diff = parseFloat(path.attr("data-diff"));
            diff = diff ? diff : 0;
            // remaining height to have fullscreen image only on parallax
            var remainingH = 0;
            if(path.hasClass("parallax") && !$("html").hasClass("touch")){
                var maxH = contH > windowH ? contH : windowH;
                remainingH = windowH - contH;
            }
            // set img values depending on cont
            imgH = contH + remainingH + diff;
            imgW = imgH * ratio;
            // fix when too large
            if(contW > imgW){
                imgW = contW;
                imgH = imgW / ratio;
            }
            //
            path.data("resized-imgW", imgW);
            path.data("resized-imgH", imgH);
            path.css("background-size", imgW + "px " + imgH + "px");
        });
    }
    $(window).resize(backgroundResize);
    $(window).focus(backgroundResize);
    backgroundResize();
    if(!$("html").hasClass("touch")){
        $(window).resize(parallaxPosition);
        //$(window).focus(parallaxPosition);
        $(window).scroll(parallaxPosition);
        parallaxPosition();
    }


});
$(window).load(function(){
    var first_block = $('#first');
    if(first_block.length) {
        first_block.addClass('animated');
    }
});