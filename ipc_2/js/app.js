$(document).ready(function(){
 //for map click input
   $("g[id]").click(function(){
        var digit = '',
            id = this.id,
            min = id.length - 1;
        $('g[id]').attr('class', '');
        $(this).attr('class','active');
        digit = id.slice(-min);
        $('#a' + digit).click();
    });
    $('label.area').click(function(){
        var digit = '',
            id = $(this).attr('for');
        min = id.length -1;
        digit = id.slice(-min);
        $('#m' + digit).click();
    });

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
                ser: {
                  required: true,
                    number: true,
                    maxlength: 4,
                    minlength: 4
                },
                num: {
                    required: true,
                    number: true,
                    maxlength: 4,
                    minlength: 4
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
                },
                pass1: "required",
                code: "required",
                req: "required",
                textarea: "required",
                svid: {
                    required: true
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
                email2: "Неккоректный",
                ser: "4 цифры",
                num: "Неккоректный",
                pass1: "Обязательно заполнить",
                code: "",
                req: "",
                textarea: "",
                svid : ''
                //okay: ""
            },
            showErrors: function(errorMap, errorList)
            {
                //alert(this.numberOfInvalids());
                this.defaultShowErrors();
            },
            highlight: function(element)
            {
                $(element).addClass("field-error");
            },
            unhighlight: function(element)
            {
                $(element).removeClass("field-error");
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
    $('#l1').click(function(){
        document.getElementById('link2').click();
    });
    $('#l2').click(function(){
        document.getElementById('link1').click();
    });
    $('#switch').click(function(){
           $('div.delivery, img.delivery').toggleClass('active');
        });
    $('#adress').click(function(){
       $(this).next().toggleClass('active');
        return false
    });
    $('p.linked').click(function(){
        $(this).next().slideToggle(200);
        return false
    });
    //map Init
    $('.mapCall').one("click", function(){
        $('#map, .background').fadeIn();
        var coor =   $(this).prev().text();
    ymaps.ready(init);
    function init() {
        var myMap = new ymaps.Map('map', {
            center: [55.753994, 37.622093],
            zoom: 9
        });
        // Поиск координат центра Нижнего Новгорода.
        ymaps.geocode(coor, {
            /**
             * Опции запроса
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/geocode.xml
             */
            // boundedBy: myMap.getBounds(), // Сортировка результатов от центра окна карты
            // strictBounds: true, // Вместе с опцией boundedBy будет искать строго внутри области, указанной в boundedBy
            results: 1 // Если нужен только один результат, экономим трафик пользователей
        }).then(function (res) {
            // Выбираем первый результат геокодирования.
            var firstGeoObject = res.geoObjects.get(0),
            // Координаты геообъекта.
                coords = firstGeoObject.geometry.getCoordinates(),
            // Область видимости геообъекта.
                bounds = firstGeoObject.properties.get('boundedBy');

            // Добавляем первый найденный геообъект на карту.
            myMap.geoObjects.add(firstGeoObject);
            // Масштабируем карту на область видимости геообъекта.
            myMap.setBounds(bounds, {
                checkZoomRange: true // проверяем наличие тайлов на данном масштабе.
            });
        });
    }
        return false
    });

    $('.background').click(function(){
        $('.background, #map').fadeOut('100');
    });



    //support block
    $('#supCall').click(function(){
        $('.col-xs-8').fadeOut('100');
        $('#support').fadeIn('100');
        $('#support').animate({
            left: 0
        }, 100);
    });
    $('#subSubmit').click(function(){
       $('.col-xs-8').fadeOut('100');
        $('#ajaxCol').load("success.html .success");
        setTimeout(function(){
        $('#ajaxCol').fadeIn('100');
        }, 400)
    });

    //for calendar
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    var weekend = today.getDay();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    today = dd + '.' + mm + '.' + yyyy;
    $('.datepicker').val(today);
    $('.datepicker').datepicker({
        language: "ru-RU",
        getDate: true,
        setDate :  today,
        autoclose: false
    });
    //for weekdays highlitened label click
    $('.days input[type="radio"]').click(function(){
       var weekNumb = $(this).attr('id');
        var numbNumb = weekNumb.slice(-1);
        $('.datepicker-dropdown').show();
        $('.table-condensed td, .table-condensed th.dow').css('background-color','');
        $('.table-condensed td:nth-of-type(' + numbNumb + ')').add('.table-condensed .dow:nth-of-type(' + numbNumb + ')').css('background-color','#FFFFFF');
    });
    $('.datepicker').datepicker()
        .on("changeDate", function(e){
                 var dayofWeek = $('.datepicker').datepicker("getDate").getDay();
                if (dayofWeek == 0){
                    dayofWeek = 7;
                }
                $('#d' + dayofWeek).click();
                if($('#d' + dayofWeek).length == 0){
                $('.table-condensed td, .table-condensed th.dow').css('background-color','');
                }
            });
    //////////////////////////////////end calendar
//tooltip
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });

    ////////////////////////////////////////to destroy
    var temp_menu = function ()
{
    var rootMenu = $('<div id="sub" />').appendTo('body');
    var menu = [
        ["index", "главная"],
        ["step_2", "Шаг 2"],
        ["step_3", "Шаг 3"],
        ["step_3_2", "Шаг 3 (2)"]
    ]
    for (var i = 0; i < menu.length; i++)
    {
        var m = $('<a/>', {'href' : menu[i][0] + '.html'}).text(menu[i][1]);
        $('#sub').append(m);
    }

    rootMenu.css({position: 'fixed',top: '1%',right: '0.3%',zIndex: '999'});
    rootMenu.find('a').css({display: 'block',padding: '3px',color: 'white', background: 'black', margin: '0 1px', opacity: .5});
}
    temp_menu();
});
