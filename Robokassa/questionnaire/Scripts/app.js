(function ($) {
    $(function () {
        $('.frm-field').eq(1).append("<span class='edit'>edit</span>");

        $('.edit').one('click', function () {
            var t = $(this);
            t.parent().addClass('badFld');
            t.parent().append("<textarea class='txtArea' />").show();
            t.addClass('filled');
        });

        $('body').on('blur', '.txtArea', function () {
        	$(this).css({
        		'minHeight': 53,
				'height': 53
        	});			
        });

        $('body').on('focus', '.txtArea', function () {
        	$(this).css({
        		'minHeight': 150,
				//'height': 150
        		});
        });
    });

})(jQuery);