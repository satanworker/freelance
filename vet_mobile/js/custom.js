$(function(){
	$('.product-item--block-title').click(function(){
		// Деактивируем все остальные
		$('.product-item--block-title').removeClass('active');
		$('.pruduct-item--block-content').hide();

		// Активируем этот
		$(this).addClass('active');
		$(this).next().show();
	})
	$('.product-item--block-title button').click(function(){
		$('.product-item--description').toggleClass('collapsed');
		$('.product-item--block-title button').toggle();
	})
})