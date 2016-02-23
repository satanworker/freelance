/**
 * Created by dmitry on 31.08.15.
 */
$(document).ready(function(){
    //drop ul
    $('.drop-ul').click(function(e){
            $(this).toggleClass('active');
            //update scroll for hiden divs
            if($(this).hasClass('hasScroll')) {
                $("#scroll-button").customScrollbar({
                    preventDefaultScroll: true
                });
        }
    });
    //menu click
    $('.nav-button').click(function(){
       $('.body-blob').toggleClass('opened');
        $("#scroll-shadowed").customScrollbar({
            preventDefaultScroll: true,
            fixedThumbHeight: 8,
            swipeSpeed: 1
        });
    });
    //scroll
    $("#scroll-shadowed, #scroll-button").mCustomScrollbar({
        theme: 'dark',
        autoDraggerLength: false,
        advanced: {
            updateOnContentResize: true
        }
    });
});