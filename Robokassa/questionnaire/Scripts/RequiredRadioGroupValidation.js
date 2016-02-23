jQuery.validator.addMethod(
	'requiredradio',
	function (value, element, params) {
		var groupName = $(element).attr('data-val-requiredradio-name');
		return $('input[name="' + groupName + '"]').is(':checked');
	}
);

jQuery.validator.unobtrusive.adapters.add('requiredradio', {}, function (options) {
	options.rules['requiredradio'] = true;
	options.messages['requiredradio'] = options.message;
});
