"use strict";
/**
 * Created by dmitry on 20.12.15.
 */
function autoHeightAnimate(element, time){
    var curHeight = element.height(), // Get Default Height
        autoHeight = element.css('height', 'auto').height(); // Get Auto Height
    element.height(curHeight); // Reset to Default Height
    element.stop().animate({ height: autoHeight, marginTop: 20 }, parseInt(time)); // Animate to Auto Height
}

function faqClick($heightElement, questionElement, time) {
    if(questionElement.hasClass('opened')) {
            questionElement.removeClass('opened');
            $heightElement.stop().animate({height: '0', marginTop: 0}, parseInt(time));
    }
    else {
        questionElement.addClass('opened');
        autoHeightAnimate($heightElement, time);
    }
}
//initialize
function initialize() {
    var myPos = {lat: 55.68264, lng: 37.61793};
    var mapCanvas = document.getElementById('map');
    var mapOptions = {
        center: new google.maps.LatLng(myPos),
        zoom: 17,
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
    };
    var map = new google.maps.Map(mapCanvas, mapOptions);
    var marker = new google.maps.Marker({
        position: myPos,
        map: map,
        icon: 'images/marker.png'
    });
}
//initialie
var form_interval = function() {
    var interval = setTimeout(function(){
        $('.form_input').removeClass('error');
    }, 2000);
    interval();
    clearTimeout(interval);
};
//form interval
function plan_calc() {
    var amountValue;
    var lizingValue;
    var oneDriverSalaryFrom;
    var oneDriverSalaryTo;
    var one_gsm_from;
    var one_gsm_to;
    var one_cleaning;
    var incomes_from;
    var incomes_to;
    var $element;
    if($('#comfort_tab').hasClass('active')) {
        oneDriverSalaryFrom =  40;
        oneDriverSalaryTo =  50;
        one_gsm_from = 30;
        one_gsm_to = 42;
        one_cleaning = 3;
        incomes_from = 180000;
        incomes_to = 240000;
        //elements
        $element  = $('#comfort_tab');
    }
    else {
        oneDriverSalaryFrom =  45;
        oneDriverSalaryTo =  70;
        one_gsm_from = 36;
        one_gsm_to = 50;
        one_cleaning = 6;
        incomes_from = 300000;
        incomes_to = 420000;
        $element  = $('#business_tab');
    }
    //values
    amountValue =  $element.find('.amount').val();
    lizingValue = $element.find('.amount_1').val();
    var element_driverSalary_from = $element.find($('.drivers_salary_from'));
    var element_driverSalary_to = $element.find($('.drivers_salary_to'));
    var element_gsm_from = $element.find($('.gsm_from'));
    var element_gsm_to = $element.find($('.gsm_to'));
    var element_cleaning = $element.find($('.cleaning'));
    var element_common_costs_from = $element.find($('.common_costs_from'));
    var element_common_costs_to = $element.find($('.common_costs_to'));
    var element_incomes_from = $element.find($('.incomes_from'));
    var element_incomes_to = $element.find($('.incomes_to'));
    var element_profit_from = $element.find($('.profit_from'));
    var element_profit_to = $element.find($('.profit_to'));
    //formula
    var A5 = 2*(amountValue*oneDriverSalaryFrom);
    var B5 = 2*(amountValue*oneDriverSalaryTo);
    var A7 = amountValue*one_gsm_from;
    var B7 = amountValue*one_gsm_to;
    var A9 = amountValue*one_cleaning;
    var common_costs_from = A5+A7+A9;
    var common_costs_to = B5+B7+A9;
    var $incomes_from = amountValue*incomes_from;
    var $incomes_to = amountValue*incomes_to;
    var profit_from = $incomes_from/1000-A5-A7-A9-(amountValue*(lizingValue/1000));
    var profit_to = $incomes_to/1000-B5-B7-A9-(amountValue*(lizingValue/1000));
    //animation
    element_driverSalary_from.animateNumber({ number: A5 });
    element_driverSalary_to.animateNumber({ number: B5 });
    element_gsm_from.animateNumber({ number: A7 });
    element_gsm_to.animateNumber({ number: B7 });
    element_cleaning.animateNumber({ number: A9 });
    element_common_costs_from.animateNumber({number: common_costs_from});
    element_common_costs_to.animateNumber({number: common_costs_to});
    element_incomes_from.animateNumber({number: $incomes_from});
    element_incomes_to.animateNumber({number: $incomes_to});
    element_profit_from.animateNumber({number: profit_from*1000});
    element_profit_to.animateNumber({number: profit_to*1000});
};
function blocksHeightSync (elements, paddingSync) {
    var height = 0;
    var maxHeight = 0;
    if($(elements).length) {
        $(elements).each(function() {
            height = $(this).outerHeight();
            if(height > maxHeight) {
                maxHeight = $(this).outerHeight();
            }
        });
        $(elements).css({
            height: maxHeight + $(paddingSync).outerHeight(),
            paddingBottom: $(paddingSync).outerHeight()
        })
    }
};
$(function () {
    $('#amount').add('#lizing').keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                // Allow: Ctrl+A, Command+A
            (e.keyCode == 65 && ( e.ctrlKey === true || e.metaKey === true ) ) ||
                // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
    //keypress test
   $('.question').click(function(event){
        var questionElement = $(this);
        var $heightElement = questionElement.find('.bottom');
       faqClick($heightElement, questionElement, 250);
       event.preventDefault();
   });
    //faq click
    $('.popup_click').click(function(event){
        var $target = $(this.hash);
        $target.addClass('active');
        event.preventDefault();
    });
    $('.background').add('.cross_popup').click(function(event) {
        $('.popup').removeClass('active');
        event.preventDefault();
    });
    //popup click
    $('.phone').mask("+7(999) 999-9999", {placeholder:"_"});
    //mask
    $('form').submit(function(event){
        var error = 0;
       $(this).find('input, textarea').each(function(){
          if(!$(this).val().length) {
              error = 1;
              $(this).parent().addClass('error');
          }
       });
        if(error>0) {
            event.preventDefault();
        }
        form_interval();
    });
    initialize();
    $('.count').click(function(event){
        var error = false;
        $(this).parent().find('input').each(function(){
           if(!$(this).val().length) {
               $(this).parent().addClass('error');
               error = true;
           }
        });
        if (!error){
            plan_calc();
        }
        event.preventDefault();
    });
    //count click
    $('.button_flat').click(function (event) {
        $('.button_flat').removeClass('active');
        $(this).addClass('active');
        $('.tab_container').removeClass('active');
        $(this.hash).addClass('active');
        event.preventDefault();
    });

    $('.header_link').mouseover(function(){
        var ofLeft=Math.abs(($(this).offset().left + $(this).outerWidth()/2)-$('#header_menu').offset().left-20);
       $('.line_menu').css({
           left: ofLeft
       });
    });
    //header hover
    blocksHeightSync('.height_sync', '.padding_sync');
    $('.body_scroll').click(function(e){
        var $target = this.hash;
        if($($target).length) {
            var $top = Math.abs($($target).offset().top);
            $('body, html').animate({
                scrollTop: $top
            }, 300);
            e.preventDefault()
        }
    });
    //tests
});