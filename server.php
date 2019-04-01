<?php
$name = $_POST['user-name'];
$phone = $_POST['user-phone'];
$street = $_POST['street'];
$house = $_POST['house'];
$housing = $_POST['housing'];
$flat = $_POST['flat'];
$floor = $_POST['floor'];
$comments = $_POST['comments'];
$payment = $_POST['payment'];
$callback = $_POST['callback'];

$callback = isset($callback) ? "Нет" : "Да";

$mail_message = '
<html>
    <head>
        <title>Заказ</title>
     </head> 
     <body>
     <h2> Заказ</h2>  
     <ul>
         <li> Имя:' . $name . '</li>
         <li> Телефон:' . $phone . '</li>
         <li> Улица:'. $street . '</li>
         <li> Дом:' . $house . '</li>
         <li> Корпус:' . $housing . '</li>
         <li> Квартира:' . $flat . '</li>
         <li> Этаж:' . $floor . '</li>
         <li> Комментарии:' . $comments . '</li>
         <li> Способ оплаты:' . $payment . '</li>
         <li> Перезванивать ли клиенту:' . $callback . '</li>
     </ul>
    </body>
    </html>
';
    $headers = "From: Администратор сайта <vladik1107@mail.ru>\r\n".
    "MIME-Version: 1.0" . "\r\n" .
    "Content-type: text/html; charset=UTF-8" . "\r\n";
    $mail = mail('vlad_dvorcov@mail.ru' , 'Заказ' , $mail_message , $headers);
    
    $data= [];
        if ($mail) {
             $data['status'] = "OK";
             $data['mes'] = "Письмо успешно отправлено";
        }else{
            $data['status' ]= "NO";
            $data['mes'] = "На сервере произошла ошибка";
        }


        echo json_encode($data);

?>