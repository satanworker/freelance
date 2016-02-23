/**
 * Created by robokassa on 22/07/15.
 */
$(document).ready(function(){
    var $navi = navigator.userAgent;
  //  $('#navigator').text(navi);
    //select styling
    var $styledWrapper = $('.styled');
    $styledWrapper.click(function(){
        var selVal = $(this).val();
        $(this).prev().removeClass('inactive').text(selVal);
    });
    $styledWrapper.change(function(){
        var selVal = $(this).val();
        $(this).prev().removeClass('inactive').text(selVal);
    });
    //spoiler top
    $('#spoiler-link').click(function(){
        if($(this).hasClass('active')) {
         $(this).removeClass('active');
        $('#spoiler').removeClass('opened');
        }
        else {
         $(this).addClass('active');
        $('#spoiler').addClass('opened');
        }
       return false
    });
    //cards change
    $('#myCard').click(function(){
        $('#cardsChange').removeClass('new-card');
    });
    $('#newCard').click(function(){
       $('#cardsChange').addClass('new-card');
    });
    //bonuces toggle
    $('#bonusesLink').click(function(){
        $('#bonusesBlock').toggleClass('opened');
    });
    //contract error
    $('#contract').click(function(){
       $(this).parent().toggleClass('error');
    });
    //info test
    $('#info').click(function(){
       alert('Здесь текст, который нельзя стилизовать')
    });
    //popup test
    $('#logout').click(function(){
       $('.popup').addClass('opened');
    });
});