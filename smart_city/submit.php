<?php

	//email

	define('ENABLE_EMAIL',false); //включить/выключить email уведопления
	$mailto = "bazhenov87@yandex.ru";
	
	//sms
	define('ENABLE_SMS',true); //включить/выключить sms уведопления
	$login = "uberregular";
	$pass = "T29CWNQaseN";
	$phones = "79268162186,79250223069,79636397917";

	//podio
	require_once "podio/PodioAPI.php";
	define('ENABLE_PODIO',true); //включить/выключить Podio уведопления

	define('PODIO_NAME','uberzayavki-hqnurw'); //client_id
	define('PODIO_APIKEY','6d08oJSPg8pCfgVSzSiHumcRJz2aqvvqlNP5N609vJ7dKCXDPNd10kcDkB43iuDR'); //client_secret
	define('PODIO_APP', 12136014); //username
	define('PODIO_APPKEY', 'fc4001f3107046c6927a8c8509328e45'); //password



	//функция передачи sms сообщения 
	function send($host, $port, $login, $password, $phone, $text, $sender = false, $wapurl = false ){
	    $fp = fsockopen($host, $port, $errno, $errstr);
	    if (!$fp) {
	        return "errno: $errno \nerrstr: $errstr\n";
	    }
	    fwrite($fp, "GET /messages/v2/send/" .
	        "?phone=" . rawurlencode($phone) .
	        "&text=" . rawurlencode($text) .
	        ($sender ? "&sender=" . rawurlencode($sender) : "") .
	        ($wapurl ? "&wapurl=" . rawurlencode($wapurl) : "") .
	        "  HTTP/1.0\n");
	    fwrite($fp, "Host: " . $host . "\r\n");
	    if ($login != "") {
	        fwrite($fp, "Authorization: Basic " . 
	            base64_encode($login. ":" . $password) . "\n");
	    }
	    fwrite($fp, "\n");
	    $response = "";
	    while(!feof($fp)) {
	        $response .= fread($fp, 1);
	    }
	    fclose($fp);
	    list($other, $responseBody) = explode("\r\n\r\n", $response, 2);
	    return $responseBody;
	} 

	//передача sms на несколько номеров
	function send_sms($login, $pass, $phones, $sms_text){
		
		$phones = explode(",", $phones);
		
		foreach($phones as $one){
			send("api.smsfeedback.ru", 80, $login, $pass, trim($one), $sms_text, "Uber Russia");
		}
	}

	//валидация $_GET или $_POST
	function validate_data( $data ){
		$result = array();
		foreach( $data as $key => $value ){
			$result[$key] = empty( $data[$key] ) ? "" : htmlspecialchars( @$data[$key] );
		}
		return $result;
	}





	date_default_timezone_set( "Europe/Moscow" );

	$error = false;
	$error_message = "";

	if ( empty( $_POST ) ){         
		$error = true;
		$error_message = "Пустой запрос";
	}

	$post = validate_data($_POST);
	$get = validate_data($_GET);


	//Проверка заполнености обязательных полей
	if (isset($post["required"]) && $post["required"] != ""){
		$required = explode(",", $post["required"]);

		foreach($required as $one){
			if ( $post[$one] == ""){
				$error = true;
			}
		}
	}

	if ($error){       
		$error = true;
		$error_message = "Не все поля были заполнены";
	}else{ //если ошибок не было - готовим и отправляем заявку

		//collect all data
		$VAR = array();

		$VAR["name"]		= isset($post["name"]) ? $post["name"] : '';				//Имя
		$VAR["phone"]		= isset($post["phone"]) ? $post["phone"] : '';				//Телефон
		$VAR["message"] 	= isset($post["message"]) ? $post["message"] : '';				//Сообщение
		$VAR["type"] 		= isset($post["type"]) ? $post["type"] : '';				//Название формы


		$VAR["utm_source"]		= isset($get["utm_source"]) ? $get["utm_source"] : '';		//Источник
		$VAR["utm_medium"] 		= isset($get["utm_medium"]) ? $get["utm_medium"] : '';		//Средство
		$VAR["utm_campaign"] 	= isset($get["utm_campaign"]) ? $get["utm_campaign"] : '';	//Кампания
		$VAR["utm_keyword"] 	= isset($get["utm_keyword"]) ? $get["utm_keyword"] : '';		//Ключевик
		$VAR["utm_content"] 	= isset($get["utm_content"]) ? $get["utm_content"] : '';		//Объявление

							
		if (isset($get['utm_campaign'])){ //Источник
			switch($get['utm_campaign']){
				case "rabota_vakansia": 	$VAR["source"] = 12; break;
				case "rabota_v_taxi": 		$VAR["source"] = 12; break;
				default: 					$VAR["source"] = 2;
			}
		}else{
			$VAR["source"] = 2;
		}

		//city
//		$VAR["city"] = 1; //"Москва";
//		if ( strpos($_SERVER['SERVER_NAME'], 'spb.uber') === 0 ){
//			$VAR["city"] = 2; //"Санкт-Петербург";
//		}
//		if ( strpos($_SERVER['SERVER_NAME'], 'ekb.uber') === 0 ){
//			$VAR["city"] = 3; //"Екатеринбург";
//		}
		
		$message = "Имя: ".$VAR["name"]."\n";
		$message .= "Телефон: ".$VAR["phone"]."\n";
		$message .= "Форма: ".$VAR["type"]."\n";
		$message .= "Текст: ".$VAR["message"]."\n";
		$message .= "Источник: ".$VAR['utm_source']."\n";
		$message .= "Cредство: ".$VAR['utm_medium']."\n";
		$message .= "Кампания: ".$VAR['utm_campaign']."\n";
		$message .= "Ключевик: ".$VAR['utm_keyword']."\n";
		$message .= "Объявление: ".$VAR['utm_content'].""; 

		//debug
		// echo '<pre>';
		// print_r($VAR);
		// echo '</pre>';
		// die();
		

		//submit to Podio		//need some magic here
	    if(ENABLE_PODIO) {

	    	//логинимся
			Podio::setup(PODIO_NAME, PODIO_APIKEY);
			Podio::authenticate_with_app(PODIO_APP, PODIO_APPKEY);

			//Создаем контакт и получаем его ID
			$contact_data['name'] = $VAR["name"];
			$contact_data['phone'] = array($VAR["phone"]);
			$podio_contact = PodioContact::create( 3461749, $contact_data );

	        // Подготавливаем поля для заявки
	        $fields = array(
	            'informatsiia-o-zaiavke'=>$message,
	            //'primechanie'=>'',
	            'istochnik-3'=>$VAR["source"],
	            //'menedzher'=> 2857783,
	            'kontaktnye-dannye'=>$podio_contact,
	            //'gorod' => $VAR["city"]

	        );

	        //Создаем заявку
	        $podio_item = PodioItem::create(PODIO_APP, array('fields'=>$fields));
			echo "полетели";
	    }


		//sending sms
	    if(ENABLE_SMS) {		
			$sms_text = 'Заявка от ' . $VAR["name"] . ', ' . $VAR["phone"];
			$VAR['sms'] = send_sms($login, $pass, $phones, $sms_text);
		}

		//send email
	    if(ENABLE_EMAIL) {
	    	mail( $mailto , "Новая заявка с сайта #".substr(@$VAR['phone'],-5), $message);
	    }



	}

?>