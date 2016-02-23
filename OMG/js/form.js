$(document).ready(function () {

	 $('input').focus(function(){
   $(this).data('placeholder',$(this).attr('placeholder'))
   $(this).attr('placeholder','');
});
$('input').blur(function(){
   $(this).attr('placeholder',$(this).data('placeholder'));
});
      
  $("form").submit(function() { return false; });
      
  //Здесь код формы отправки      
  $(".send").on("click", function(){
      
    var 
      whatform     = $(this).parent().attr('id'), //в какой форме сделали "клик"
      formname     = $("#" + whatform + " #formname"), //поле "Ваше имя:" 			
      namelength   = $(formname).val().length, // длина поля "Ваше имя:"
      formtel      = $("#" + whatform + " #formtel"), //поле "Ваш телефон:" 			
      tellength    = $(formtel).val().length, // длина поля "Ваш телефон:"       
      allgood      = false, //Булевская переменная, определяющая переход к самой отправке
	  formemail      = $("#" + whatform + " #formemail"); //поле "Ваш e-mail:" 			
	  //alert(formtel);
	  //alert(formemail);
	  //alert($("#"+whatform).serializeArray());
	//whatform.submit();
	
	//alert(whatform);
	//return false;
          
    //Генерируем атрибуты name
    $("#"+whatform).find('#whatform').val(whatform);
    $(formname).attr("name", "name");
    $(formtel).attr("name", "tel");
	$(formemail).attr("name", "email");
          
    if (allgood != true) {
    //Проверка на введенность данных
      if (namelength >= 3) { //Если имя есть, убираем ошибку
        $(formname).removeClass("error");  
      } 
      if (tellength >= 7) { //Если телефон есть, убираем ошибку
        $(formtel).removeClass("error");  
      }
      if (namelength < 3 && tellength < 7) { //Если оба поля не введены
        $(formname).addClass('error error-name');
        $(formtel).addClass('error error-tel');
        $('input[placeholder].error-name').attr("placeholder", "Введите более 3 букв!");  
        $('input[placeholder].error-tel').attr("placeholder", "Введите более 7 цифр!");
      	setTimeout(function() {
        $('input[placeholder].error-name').attr("placeholder", "Введите имя*");  
        $('input[placeholder].error-tel').attr("placeholder", "Введите телефон*");
        $(formname).removeClass("error-name");
      	$(formtel).removeClass("error-tel");	
      	}, 3000);  
$('.error-name').val("");
$('.error-tel').val("");
        allgood = false;  
      } 
      if (namelength < 3 && tellength >= 7) { //Если имени нет, а телефон есть
        $(formname).addClass("error error-name");
        $('input[placeholder].error-name').attr("placeholder", "Введите более 3 букв!");

      	setTimeout(function() {
        $('input[placeholder].error-name').attr("placeholder", "Введите имя*");  
        $(formname).removeClass("error-name");
      	}, 3000); 
 
        $('.error-name').val("");

        allgood = false;              
      }  
      if (namelength >= 3 && tellength < 7) { //Если имя есть, телефона нет
      	$(formtel).addClass("error-tel"); 
        $('input[placeholder].error-tel').attr("placeholder", "Введите более 7 цифр!");

      	setTimeout(function() { 
        $('input[placeholder].error-tel').attr("placeholder", "Введите телефон*");
      	$(formtel).removeClass("error-tel");	
      	}, 3000); 

        $('.error-tel').val("");
        allgood = false;            
      } 
      if (namelength >= 3 && tellength >= 7) { //Если имя есть и телефон есть
        $(formname).removeClass("error");
        $(formtel).removeClass("error");
        allgood = true;
      }
    }
          
    //Здесь, если все хорошо - идем на отправку  			  
    if(allgood == true) {  		
			//document.getElementById(whatform).submit();
	
			
			  $.ajax({
				type: 'POST',
				url: '/data/form.php',
				data: $("#"+whatform).serializeArray(),
				success: function(data) {
				  location = finish; // redirect
				  $('.formwar4').fadeIn(100);
				  setTimeout(function() {
						$('.formwar4').fadeOut(500);
					}, 5000);                      
					  $(formname).val('').removeClass('error');
				  $(formtel).val('').removeClass('error');
				  $(this).parent().parent().parent().fadeOut();
				  console.log("Длина имени: " + namelength + " Длина телефона: " + tellength + " Булевская: " + allgood + " Ответ от обработчика: " + data);  							
				}
			  });
		
    }
  
    return false;
  
  });
  
  
   //Здесь код формы отправки      
  $(".send-mail").on("click", function(){
      
    var 
      whatform     = $(this).parent().attr('id'), //в какой форме сделали "клик"
      formname     = $("#" + whatform + " #formname"), //поле "Ваше имя:" 			
      namelength   = $(formname).val().length, // длина поля "Ваше имя:"
      formtel      = $("#" + whatform + " #formtel"), //поле "Ваш телефон:" 			
      tellength    = $(formtel).val().length, // длина поля "Ваш телефон:"       
      allgood      = false, //Булевская переменная, определяющая переход к самой отправке
	  formemail      = $("#" + whatform + " #formemail"); //поле "Ваш e-mail:" 	
	  maillength    = $(formemail).val().length, // длина поля "Ваш телефон:" 		
	  //alert(formtel);
	  //alert(formemail);
	  //alert($("#"+whatform).serializeArray());
	//whatform.submit();
	
	//alert(whatform);
	//return false;
          
    //Генерируем атрибуты name
    $("#"+whatform).find('#whatform').val(whatform);
    $(formname).attr("name", "name");
    $(formtel).attr("name", "tel");
	$(formemail).attr("name", "email");
          
    if (allgood != true) {
    //Проверка на введенность данных
      if (namelength >= 3) { //Если имя есть, убираем ошибку
        $(formname).removeClass("error");  
      } 
      if (tellength >= 7) { //Если телефон есть, убираем ошибку
        $(formtel).removeClass("error");  
      }
      if (namelength < 3 ) { //Если оба поля не введены
        $(formname).addClass('error error-name');
        $('input[placeholder].error-name').attr("placeholder", "Введите более 3 букв!");  
      	setTimeout(function() {
        $('input[placeholder].error-name').attr("placeholder", "Введите имя*");  
        $(formname).removeClass("error-name");	
      	}, 3000);  
$('.error-name').val("");
        allgood = false;  
      } 
 
      if (tellength < 7) { //Если имя есть, телефона нет
      	$(formtel).addClass("error-tel"); 
        $('input[placeholder].error-tel').attr("placeholder", "Введите более 7 цифр!");
      	setTimeout(function() { 
        $('input[placeholder].error-tel').attr("placeholder", "Введите телефон*");
      	$(formtel).removeClass("error-tel");	
      	}, 3000); 
        $('.error-tel').val("");
        allgood = false;            
      } 
	  
	    if (maillength < 3) { //Если имя есть, телефона нет
      	$(formemail).addClass("error-mail"); 
        $('input[placeholder].error-mail').attr("placeholder", "Введите более 3 букв!");
      	setTimeout(function() { 
        $('input[placeholder].error-mail').attr("placeholder", "Введите e-mail*");
      	$(formemail).removeClass("error-mail");	
      	}, 3000); 
        $('.error-mail').val("");
        allgood = false;            
      } 
	  
      if (namelength >= 3 && tellength >= 7 && maillength >= 3) { //Если имя есть и телефон есть
        $(formname).removeClass("error");
        $(formtel).removeClass("error");
        allgood = true;
      }
    }
          
    //Здесь, если все хорошо - идем на отправку  			  
    if(allgood == true) {  		
			//document.getElementById(whatform).submit();
	
			
			  $.ajax({
				type: 'POST',
				url: '/data/form.php',
				data: $("#"+whatform).serializeArray(),
				success: function(data) {
				  location = finish; // redirect
				  $('.formwar4').fadeIn(100);
				  setTimeout(function() {
						$('.formwar4').fadeOut(500);
					}, 5000);                      
					  $(formname).val('').removeClass('error');
				  $(formtel).val('').removeClass('error');
				  $(this).parent().parent().parent().fadeOut();
				  console.log("Длина имени: " + namelength + " Длина телефона: " + tellength + " Булевская: " + allgood + " Ответ от обработчика: " + data);  							
				}
			  });
		
    }
  
    return false;
  
  }); 
  
  
  
  
  
 
  
  $(".send_order").on("click", function(){
      
    var 
      whatform     = $(this).parent().attr('id'), //в какой форме сделали "клик"
      formname     = $("#" + whatform + " #formname"), //поле "Ваше имя:" 			
      namelength   = $(formname).val().length, // длина поля "Ваше имя:"
      formtel      = $("#" + whatform + " #formtel"), //поле "Ваш телефон:" 			
      tellength    = $(formtel).val().length, // длина поля "Ваш телефон:"       
      allgood      = false, //Булевская переменная, определяющая переход к самой отправке
	  formemail      = $("#" + whatform + " #formemail"); //поле "Ваш e-mail:" 			
	  //alert(formtel);
	  //alert(formemail);
	  //alert($("#"+whatform).serializeArray());
	//whatform.submit();
	
	//alert(whatform);
	//return false;
          
    //Генерируем атрибуты name
    $("#"+whatform).find('#whatform').val(whatform);
    $(formname).attr("name", "formname");
    $(formtel).attr("name", "formtel");
	$(formemail).attr("name", "formemail");
          
    if (allgood != true) {
    //Проверка на введенность данных
      if (namelength >= 3) { //Если имя есть, убираем ошибку
        $(formname).removeClass("error");  
      } 
      if (tellength >= 7) { //Если телефон есть, убираем ошибку
        $(formtel).removeClass("error");  
      }
      if (namelength < 3 && tellength < 7) { //Если оба поля не введены
        $(formname).addClass('error');
        $(formtel).addClass('error');
        $('.formwar1').fadeIn(100);
      	setTimeout(function() {
      		$('.formwar1').fadeOut(500);
      	}, 3500);      
        allgood = false;  
      } 
      if (namelength < 3 && tellength >= 7) { //Если имени нет, а телефон есть
        $(formname).addClass("error");
        $('.formwar2').fadeIn(100);
      	setTimeout(function() {
      		$('.formwar2').fadeOut(500);
      	}, 3500); 
        allgood = false;              
      }  
      if (namelength >= 3 && tellength < 7) { //Если имя есть, телефона нет
      	$(formtel).addClass("error");
        $('.formwar3').fadeIn(100);
      	setTimeout(function() {
      		$('.formwar3').fadeOut(500);
      	}, 3500);     
        allgood = false;            
      } 
      if (namelength >= 3 && tellength >= 7) { //Если имя есть и телефон есть
        $(formname).removeClass("error");
        $(formtel).removeClass("error");
        allgood = true;
      }
    }
          
    //Здесь, если все хорошо - идем на отправку  			  
    if(allgood == true) {  		
		document.getElementById(whatform).submit();			  
    }
  
    return false;
  
  });
  $('.menu li a').on('click', function(){
		$(this).parent().toggleClass('active').siblings().removeClass('active')
	});
      
});