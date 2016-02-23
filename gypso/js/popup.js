$(document).ready(function() {
    $('#overlay').css({opacity: 0.5}); // Делаем затемняющий фон кроссбраузерным
    positionCenter($('#popup')); // Позиционируем всплывающее окно по центру
	
    $('.show_popup').click(function() { // При клике по ссылке, показываем всплывающее окно
        $('#popup, #overlay').fadeIn(300);
    });
	
    $('#close_popup').click(function() { // Скрываем всплывающее окно при клике по кнопке закрыть
		$('#popup, #overlay').fadeOut(300);
    });
	
    function positionCenter(elem) { // Функция, которая позиционирует всплывающее окно по центру
        elem.css({
            marginTop: '-' + elem.height() / 2 + 'px',
			marginLeft: '-' + elem.width() / 2 + 'px'
        });
    }
});