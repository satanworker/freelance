$(function ()
{
    $(window).load(function ()
    {
        var WindowWidth = $("body").outerWidth();
        var WindowHeight = $("body").outerHeight();

        //$(".col-md-4").css("height", WindowHeight);
        //$("#support-block .col-md-6").first().css("height", WindowHeight);
        //$(".thanks-block").css("height", WindowHeight);

        $.validator.setDefaults
        ({
            errorPlacement: function(error, element)
            {
                error.appendTo(element.prev());
            }
        });

        $.validator.addMethod("mobileRU", function(phone_number, element) {
            phone_number = phone_number.replace(/\(|\)|\s+|-/g, "");
            return this.optional(element) || phone_number.length > 9 &&
                phone_number.match(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/);
        });

        $.validator.messages.required = 'required';

        $("form").each(function ()
        {
            $(this).validate({
                onkeyup: function(element)
                {
                    $(element).valid();
                },
                rules: {
                    surname: "required",
                    firstname: "required",
                    _name: {
                        required: true
                    },
                    inn: {
                        required: true,
                        number: true,
                        maxlength: 12,
                        minlength: 12
                    },
                    ogrnip: {
                        required: true,
                        number: true,
                        maxlength: 15,
                        minlength: 15
                    },
                    phone: {
                        required: true,
                        mobileRU: true
                    },
                    email: "required",
                    email: {
                        required: true,
                        email: true
                    },
                    email2: "required",
                    email2: {
                        required: true,
                        email: true
                    }
                    //okay: "required"
                },

                // Specify the validation error messages
                messages:
                {
                    surname: "Обязательно заполнить",
                    firstname: "Обязательно заполнить",
                    _name: "Только кириллица",
                    inn: "Дожно быть 12 цифр",
                    ogrnip: "Должно быть 15 цифр",
                    phone: "Должен начинаться с +7 или 8",
                    email: "Неккоректный",
                    email2: "Неккоректный"
                    //okay: ""
                },
                showErrors: function(errorMap, errorList)
                {
                    //alert(this.numberOfInvalids());
                    this.defaultShowErrors();
                },
                highlight: function(element)
                {
                    $(element).parent().addClass("field-error");
                },
                unhighlight: function(element)
                {
                    $(element).parent().removeClass("field-error");
                },
                invalidHandler: function(event, validator)
                {
                    // 'this' refers to the form
                    var errors = validator.numberOfInvalids();
                    if (errors)
                    {
                        var message = errors == 1
                            ? '<i>Форма заявки заполнена некорректно,<br/> пожалуйта проверьте данные</i>'
                            : '<i>Форма заявки заполнена некорректно,<br/> пожалуйта проверьте данные</i>';
                        //+error+
                        //Форма заявки заполнена некорректно, пожалуйта проверьте данные
                        $("div#summary-err span").html(message);
                        $("div#summary-err span").show();
                    }
                    else
                    {
                        $("div#summary-err span").hide();
                    }
                }
            });
        });

        $("#summary-err input").on("click", function ()
        {
            console.log($(this).find("span").length)
        });

        $.when($("form").validate()).then(function ()
        {
            if ($("#okay").hasClass("error"))
            {
                $(this).parent().addClass("error")
            }
        });

        $("#trig").on("click", function ()
        {
            $("#mainBlock").fadeOut('50');
            $("#support-block").animate({
                left: 20
            }, 500, function () {

            });
        });

        $(".backtoblack").on("click", function ()
        {
            $(".thanks-block").animate({
                left: "-100%"
            }, 100);
        });

        $(".cancel").on("click", function ()
        {
            $("#mainBlock").fadeIn('50');
            $("#support-block").animate({
                left: "-100%"
            }, 500, function () {

            });
        });

        // FAQ
        $(".faq dd").hide();

        $(".faq dt").click(function () {
            if (!$(this).hasClass("on")) {
                toggleQuestion($(".faq dt.on"));
            }
            toggleQuestion($(this))
        })
        function toggleQuestion(target) {
            target.toggleClass("on").next().slideToggle("fast");
        }

        $(".courier label.radio").on("click", function ()
        {
            $(".courier label.radio").removeClass("sel");
            var t = $(this);

            if (t.find("input").is(":checked"))
            {
                t.addClass("sel")
            }
        });

    });
});