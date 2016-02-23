/**
 * Created by dmitry on 02.09.15.
 */
$(function(){
    var $carouselBig = $('.tab.active').find('.carousel.big');
    $('.date').datepicker();
    //tabs
    $('.tab-handler').click(function(){
        var $t = $(this);
        var target = $t.attr('href');
        $('.tab-handler.active').removeClass('active');
        $t.addClass('active');
        $('.tab.active').removeClass('active');
        $(target).addClass('active');
        $carouselBig = $('.tab.active').find('.carousel.big');
        return false
    });
   //booty
    $('.carousel.small .item').each(function(){
        var next = $(this).next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }
        next.children(':first-child').clone().appendTo($(this));
        for (var i=0;i<2;i++) {
            next=next.next();
            if (!next.length) {
                next = $(this).siblings(':first');
            }
            next.children(':first-child').clone().appendTo($(this));
        }
    });
    //carousel click test
    //$('.carousel-control').click(function(e){
    //   var $parent;
    //    var arrow;
    //    var carouselSmall = $(this).parents('.carousel');
    //    if($(this).hasClass('left')) {
    //        arrow = 'prev'
    //    }
    //    else {
    //        arrow = 'next'
    //    }
    //    if(carouselSmall.hasClass('small')) {
    //        $parent = $carouselBig;
    //        console.log($parent);
    //    }
    //    else {
    //        $parent = $('.carousel.small');
    //        //console.log($parent);
    //    }
    //    $parent.carousel(arrow);
    //});
    //item click test
    $('.carousel.small .col-xs-3').click(function(e){
        var $tar = e.target;
        var $tarSrc = $($tar).attr('src');
        var tabActive = $('.tab.active').find('.col-xs-7');
        var $bigTar = 'img[src="' + $tarSrc + '"]';
        var go = tabActive.find($bigTar).parents('.item').index();
        $('.tab.active .col-xs-7 .carousel').carousel(go);
    });
    //popup
    $('.callback').click(function(){
       $('.popup').addClass('active');
        return false;
    });
    $('.background, .cross').click(function(){
       $('.popup').removeClass('active');
        return false;
    });
    //form click function
    $('.inner-submit').click(function(){
        var $siblings = $(this).parent().find('input[type="text"]');
        var error;
        $siblings.each(function(){
           if(!$(this).val().length) {
                $(this).addClass('error');
           }
            else {
               error = 0;
               $(this).clone().appendTo('#popupform').addClass('hidden');
           }
        });
        if (error == 0) {
            $('.popup').addClass('active');
        }
        return false
    });
});
