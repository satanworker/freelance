$(document).ready(function() {
    $('video').css({height: $('video').width()/1.7765625})
    $(window).scroll(function() {
       if(!$('.video_text').is('.active') && ($(this).scrollTop()+$(this).outerHeight() >= $('.video_scroll').offset().top)) {
            $('video')[0].play();
            setTimeout(function() {
               $('.video_text').addClass('active');
           }, 8000);
       }
    });
    $('[data-target]').click(function() {
       $(this).siblings().removeClass('active');
        $(this).addClass('active');
        $('.text_description').removeClass('active');
        $($(this).data('target')).addClass('active');
    });
});