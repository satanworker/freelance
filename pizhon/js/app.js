/**
 * Created by dmitry on 07.07.15.
 */
$(document).ready(function(){
    $('.call').click(function(){
        $('<iframe style="width:1024px; height:691px;" scrolling="no" src="http://sonline.su/order_new2b/place_5193/theme_4"></iframe>').prependTo('#popup');
       $('#popup').addClass('opened');
    });
    $('#background').click(function(){
       $('#popup').removeClass('opened');
    });
    //instagram test
        var feed = new Instafeed({
        get: 'user',
        userId:1537234412,
        accessToken: '2005023216.1677ed0.ca0d82b2c93d4486acdcb015fc4b960f',
        clientId:'64c95e9fa8334c55b0c9dbffef9538f4'
    });
    feed.run();
    //scroll script
    if(!$('#blog').length >= 1) {
    $(window).scroll(function(){
       var scTop = $(window).scrollTop() + $(window).height() / 2;
        if(scTop - $(window).height() / 1.5  >= $('#no-women').offset().top - 10) {
            $('#header').addClass('fixed');
            $('.rotated').each(function(){
               if(scTop >= $(this).offset().top && ($(this).hasClass('no-anime') == false)) {
                       $(this).addClass('zoomInLeft animated');
               }
            });
            if(scTop >= $('#friends').offset().top) {
                $('#friends a').each(function(index){
                    var $this = $(this);
                    if($this.hasClass('right')) {
                        if(index == 0) {
                            $this.addClass('slideInLeft animated');
                        }
                        else {
                            setTimeout(function(){
                              $this.addClass('slideInLeft animated');
                            }, 300)
                        }
                    }
                    else {
                        if(index == 1) {
                         $this.addClass('slideInRight animated');
                        }
                        else if(index == 2) {
                            setTimeout(function(){
                              $this.addClass('slideInRight animated');
                            }, 300)
                        }
                        else {
                            setTimeout(function(){
                              $this.addClass('slideInRight animated');
                            }, 600)
                        }
                    }
                });
            }
        // if(scTop + 100 <= $('.rotated').eq(0).offset().top) {
        //    $('.rotated').eq(0).addClass('shake animated')
        //}
           else if(scTop >= $('#couple').offset().top) {
                $('#couple p').each(function(index){
                    var $this = $(this);
                    var delay = 300 * index;
                    setTimeout(function(){
                        $this.addClass('fadeIn animated');
                    }, delay);
                });
                  if (scTop >= $('#service').offset().top) {
                    $('#service').parent().children('p').each(function(index){
                        var $this = $(this);
                        var delay = 100 * index
                        setTimeout(function(){
                            $this.addClass('fadeIn animated');
                        }, delay);
                        console.log(this);
                    });
                }
                if (scTop >= $('#instafeed').offset().top) {
                    $('#instafeed img').each(function(index){
                        var $this = $(this);
                        var delay = 200 * index;
                        setTimeout(function(){
                            $this.addClass('rotateInDownLeft animated');
                        }, delay);
                    });
                }
            }
             if(scTop >= $('#contacts').offset().top) {
                 console.log(this);
                $('#contacts').children('.col-xs-6').addClass('fadeInRight animated');
            }
            if(scTop >= $('#barbers').offset().top) {
                $('carousel-barbers').carousel({
                    interval: 8000
                });
            }

        }
        else {
            $('#header').removeClass('fixed');
        }
    });
    }
});