$(document).ready(function() {
    $('video').css({height: $('video').width()/1.7765625});
    $(window).scroll(function() {
       if(!$('.video_text').is('.active') && ($(this).scrollTop()+$(this).outerHeight() >= $('.video_scroll').offset().top)) {
            $('video')[0].play();
            setTimeout(function() {
               $('.video_text').addClass('active');
           }, 8000);
       }
        if($(this).scrollTop()+55 > $('.row.first').outerHeight()) {
            $('.header.fixed').removeClass('closed');
        }
        else {
            $('.header.fixed').addClass('closed');
        }
    });
    $('.scroll').click(function(event) {
        event.preventDefault();
        var target = $(this.hash).offset().top - 44;
        $("html, body").animate({ scrollTop:  target}, 250);
    });
    $('[data-target]').click(function() {
       $(this).siblings().removeClass('active');
        $(this).addClass('active');
        $('.text_description').removeClass('active');
        $($(this).data('target')).addClass('active');
    });
});