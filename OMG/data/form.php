<?php
header('Content-Type: text/html; charset=utf-8');

//Переменные формы
if (isset($_POST['name'])) {$nf = $_POST['name'];} //имя отправителя
if (isset($_POST['email'])) {$ef = $_POST['email'];} //email отправителя
if (isset($_POST['tel'])) {$tf = $_POST['tel'];} //телефон отправителя
if (isset($_POST['whatform'])) {$wf = $_POST['whatform'];} //с какой формы
if (isset($_POST['ref'])) {$rf = urldecode($_POST['ref']);} //реферальный хвост

//Заголовок письма (техническая часть)
$headers = "Content-type:text/html; charset = utf-8\r\n";

//Email, с которого якобы пришло сообщение
$from = "qip_moderator@inbox.ru";

//Тема письма
switch ($wf) {
  case "callback":
    $subject = "заказать расчет";
    break;
  case "equipment":
    $subject = "звонок специалиста";
    break;  
  case "form-top":
    $subject = "заявка вызов замерщика";
    break;
}

//Сообщение, отправляемое на почту
$message = "<b>Имя:</b> $nf <br />  <b>Email:</b> $ef <br /> <b>Телефон:</b> $tf <br /> <b>Реферальный хвост:</b> $rf";

//Режим отладки
$debug = false; //TRUE - включено, FALSE - выключено

if ($debug == true) {
  $testemail = "qip_moderator@inbox.ru"; //почта для отладки
  $sendmail = mail ($testemail,$subject,$message,$headers."From:$from");
  if ($sendmail) {echo "Спасибо! Мы обязательно Вам перезвоним!";}
  else {echo "Ошибка. Сообщение не отправлено!";}  
} else {
  $to1 = "256ottenkov@gmail.com";        
  
  $send1 = mail ($to1,$subject,$message,$headers."From:$from");
  if ($send1 && $send2) {echo "Спасибо! Мы обязательно Вам перезвоним!";}
  else {echo "Ошибка. Сообщение не отправлено!";}
}

?>