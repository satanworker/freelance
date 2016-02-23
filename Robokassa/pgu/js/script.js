$(function () {
    $('.preloader').preloader(true);

    function updateText(event) {
        var input = $(this);
        setTimeout(function () {
            var val = input.val();
            if (val != "")
                input.parent().find("label").addClass("show-state"),
                input.parent().find("label.wrong, label.empty").addClass('non-displayed'),
                input.parent().removeClass('red');
            else
                input.parent().find("label").removeClass("show-state");
                    //input.parent().find("label.wrong, label.empty").removeClass("non-displayed");
               
        }, 1)
    }
    $("input.input").keydown(updateText);
    $("input.input").change(updateText);

    $('.hide').click(function () {
        $('.popupback').addClass('body-overflow');
        $('.popup').css({ opacity: 1 }).addClass('popup-visual');
            $('body').addClass('body-overflow');
            $('.popupback').animate({
                opacity: 1
            }, 500, function () {
                $('.popupback').removeClass('body-overflow');
            });
        $('.popupback').css({ zIndex : 100 });
    });
    $('td a').click(function () {
        $('.main .left').css( 'minHeight' , '780px');
        $('.popupback').addClass('body-overflow');
        $('.popupback').animate({
            opacity: 0
        }, 500, function () {
            $('.popup').removeClass('popup-visual');
            $('.popupback').css({ zIndex: -1 });
            $('body').removeClass('body-overflow');
        });
        $('.vanish').addClass('non-displayed');
        $('.id').removeClass('non-displayed');
    });
    $('.turn').click(function () {
        $('.main .left').css('minHeight', '830px');
        $('.popupback').addClass('body-overflow');
        $('.popupback').animate({
            opacity: 0
        }, 500, function () {
            $('.popup').removeClass('popup-visual');
            $('.popupback').css({ zIndex: -1 });
            $('body').removeClass('body-overflow');
        });
        $('.vanish').removeClass('non-displayed');
        $('.id').addClass('non-displayed');
    });
    
    $('.cross').click(function () {
        $('.popupback').addClass('body-overflow');
        $('.popupback').animate({
            opacity: 0
        }, 250, function () {
            //$('.popup').removeClass('popup-visual');
            //$(".popup").hide('50')
            $(".popup").css({ opacity: 0 }).removeClass('popup-visual')
            $('.popupback').css({ zIndex: -1 });
            $('body').removeClass('body-overflow');
        });
        
});
    $('.morebanks').click(function () {
        $('.dispell').hide();
        $('.height').fadeIn(700);
       
    });
    //for list
    $('.light-other').click(function () {
        $('.sub-menu').slideToggle(500);
        $('img[alt="arrow"]').stop(true).toggleClass('arrow');
        $(this).toggleClass('new-state');
    });
    //that's all
});
//ready

/**
* Adds a loading overlay on the element.
* 
* That jQuery function must be run with a CSS style. 
* See the stylesheet bellow for more informations.
*
* @param {Boolean} state    [optional] Set to false to remove the overlay.
* @param {String}  addClass [optional] One or several class to add to the overlay
* @return {jQuery} The current jQuery object (allow chaining)
*/
$.fn.preloader = function (state, addClass) {

    // element to animate
    var $this = $(this);
    // hide or show the overlay
    state = state === undefined ? true : !!state;

    $this.each(function (i, element) {

        var $element = $(element);
        var root_ = $("<div/>", { 'class': "wrap-wrap" });
        var root__ = $("<div/>", { 'class': "wrap-wrap-wrap" });
        var rootTag = $("<div/>", { 'class': "circleContainer" });
        var circle = $("<div/>", { 'class': "circle", id: "c1" });
        var circle_ = $("<div/>", { 'class': "circle", id: "c2" });

        // if we want to create and overlay and any one exists
        if (state && $element.find(".js-loading-overlay").length === 0) {

            // creates the overlay
            //var $overlay = $("<div/>").addClass("js-loading-overlay");
            //var $overlay = root_.append(rootTag.append(circle).append(circle_));
            var $overlay = root_.append(root__.append(rootTag.append(circle).append(circle_))).addClass("js-loading-overlay");

            // add a clas
            if (addClass !== undefined) {
                $overlay.addClass(addClass);
            }
            // appends it to the current element
            $element.append($overlay).addClass("js-loading");
            // show the element
            $overlay.stop().hide().fadeIn(400);

            // Disables all inputs
            $this.find("input,button,.btn").addClass("disabled").prop("disabled", true);

            // if we want to destroy this overlay
        } else if (!state) {
            // just destroys it
            $element.removeClass("js-loading").find(".js-loading-overlay").remove();

            // Unabled all inputs
            $this.find("input,button,.btn").removeClass("disabled").prop("disabled", false);
        }
        //for control
            $('.select-first, .select-second').multipleSelect({
                isOpen: true,
                keepOpen: true,
                single: true,
                onClick: function (param) {
                     
                }
            });
            //$('input[name="duration"]').click(function () {
              //  $('.common').fadeIn('slow');
                //alert('fade');
            //});
            $('div.select-second div.ms-drop').appendTo('.years').attr('id', 'control-years');
            $('div.select-first div.ms-drop').appendTo('.numbers').attr('id', 'control-numbers');
                $(document).mouseup(function (e) { // событие клика по веб-документу
                var div = $(".common"); // тут указываем ID элемента
                //if ($('input[name="duration"]').is(e.target))
                //{
                    //div.fadeToggle('slow');
                    //alert('fadeIn');
                //}
                if (!div.is(e.target) // если клик был не по нашему блоку
                && div.has(e.target).length === 0 && !$('input[name="duration"]').is(e.target)){
                 // и не по его дочерним элементам
                div.fadeOut('slow'); // скрываем его
                }
                else if (!div.is(e.target) // если клик был не по нашему блоку
                && div.has(e.target).length === 0 && $('input[name="duration"]').is(e.target)){
                    div.fadeToggle('slow');
                }
            
        });
            $('.common').click(function(){
                var monthSelect = $('.select-first').val(),
                    yearSelect = $('.select-second').val();
                if(monthSelect == null)
                {
                    monthSelect = '01';
                }
                if(yearSelect == null)
                {
                    yearSelect = (new Date()).getFullYear();
                }
                $('input[name="duration"]').val( monthSelect + "/"+ yearSelect );

        }); 

            $('#arrow-first').click(function (){
                $('#control-numbers').scrollTop();
            });
        //end control
    });
    return this;


};