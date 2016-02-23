/**
 * Created by dpetrov on 30.04.2015.
 */
$(document).ready(function(){
    $('.carousel').carousel();
    $('#carousel123').carousel('pause');
    $('#nav .drop').click(function(){
       $(this).toggleClass('active');
        return false;
    });
    $('#callback, #callback_1').click(function(){
       $('#call-block, #back').fadeIn('fast');
    });
    $('#onecall').click(function(){
        $('#oneClick, #back').fadeIn('fast');
        return false;
    });
    $('#blob').click(function(){
       $('#carousel-popup, #back').fadeIn('fast');
    });
    $('#cross, #back').click(function(){
        $('#call-block, #back, #carousel-popup, #oneClick').fadeOut('fast');
    });
    //carousel
        $('.carousel-showmanymoveone .item').each(function(){
            var itemToClone = $(this);

            for (var i=1;i<3;i++) {
                itemToClone = itemToClone.next();

                // wrap around if at end of item collection
                if (!itemToClone.length) {
                    itemToClone = $(this).siblings(':first');
                }

                // grab item, clone, add marker class, add to collection
                itemToClone.children(':first-child').clone()
                    .addClass("cloneditem-"+(i))
                    .appendTo($(this));
            }
        });
    $('.carousel-showmanymoveone .item a').click(function(){
        return false
    });
    $('#previewImage').attr('src', $('#carousel123 .item.active').find('a:first-of-type').attr('href'));
    $('.carousel-showmanymoveone').on('slid.bs.carousel', function() {
        $('#previewImage').attr('src', $('#carousel123 .item.active').find('a:first-of-type').attr('href'));
    });
    //for table border
    $('#table tr').hover(function () {
        $(this).prev().addClass("active");  //Add the active class to the area is hovered
    }, function () {
        $(this).prev().removeClass("active");
    });
    //for navigation top
    $('.navigation li').has('ul').addClass('uled');
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
                    $(this).removeClass('inative')
                field.val((val - 1));
                numbValue.text(field.val());
                }
            });
      })
    };
    init_number();
    //radio buttons, crafted-selects cart_2.html
    $('label.radio').click(function(){
        if($(this).hasClass('face')){
            $('label.face').removeClass('active');
        }
        else {
            $('label.face1').removeClass('active');
        }
        $(this).addClass('active');
    });
    //checkbox
    $('.crafted-select ul li').click(function(){
        $(' .city').val($(this).text());
        $(this).parents('ul.town').removeClass('opened');
        console.log($(this).parents('.crafted-select'))
    });
    $('#checkbox input[type="checkbox"]').click(function(){
        if(!$(this).is(':checked')){
            $(this).parent('#checkbox').removeClass('active');
        }else{
            $(this).parent('#checkbox').addClass('active');
        }
    });
    //sert
    $('a.sert').click(function(){
       $('#carousel-popup, .background').fadeIn();
    });
      ////////////////////////////////////////to destroy
    var temp_menu = function ()
{
    var rootMenu = $('<div id="sub" />').appendTo('body');
    var menu = [
        ["main", "main"],
        ["sert", "sert"],
        ["news", "news"],
        ["text", "text"],
        ["cart", "cart"],
        ["cart_2", "cart_2"],
        ["catalog", "catalog"],
        ["catalog_2", "catalog_2"],
        ["contacts", "contacts"],
        ["faq", "faq"]
    ];
    for (var i = 0; i < menu.length; i++)
    {
        var m = $('<a/>', {'href' : menu[i][0] + '.html'}).text(menu[i][1]);
        $('#sub').append(m);
    }

    rootMenu.css({position: 'fixed',top: '1%',right: '0.3%',zIndex: '999'});
    rootMenu.find('a').css({display: 'block',padding: '3px',color: 'white', background: 'black', margin: '0 1px', opacity: .5});
};
    temp_menu();
    /////////////////
    $('input.long-date').datepicker( $.datepicker.regional[ "ru" ] );
});


