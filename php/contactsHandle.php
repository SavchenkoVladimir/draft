<?php
	$querry = $_REQUEST['querry'];
	$querry = json_decode($querry, true);
	
	$name = $querry['_name'];	
	if(!$name){
		$response = 'Type your name, please.<br />';		
	}else{
		//Обрезаем пробелы
		$name = trim($name);
		//Проверка длинны строки
		$name_length = iconv_strlen($name, 'UTF-8');
		if($name_length	>	99){
			$response .= 'Your name is too long. Take less than 99 signs, please.<br />';
		}else{
			//Убираем тэги и превращаем символы в сущности
			$name = strip_tags(htmlspecialchars($name,	ENT_QUOTES,	'UTF-8'));
			$name = 'Oт: '.$name;
		}
	}

	$email = $querry['_email'];
	//Проверяем email	
	if(!$email){
		$response .=  'Type your email, please.<br />';
	}else{				
		if(preg_match('/.+@.+\..+/i', $email) == 0){
			$response .= 'Verify your email, please<br />';
		}else{
			//Убираем тэги и превращаем символы в сущности
			$email = strip_tags(htmlspecialchars($email, ENT_QUOTES, 'UTF-8'));
			$email = '\n email: '.$email;			
		}
	}
	
	$message = $querry['_message'];
	if(!$message){
		$response .= "Where is your message?<br />";
	}else{
		//Обрезаем пробелы
		$message = trim($message);
		//Проверяем длинну строки
		$question_length = iconv_strlen($message, 'UTF-8');
		if($question_length	>	255){
			$response .= 'Your name is too long. Take less than 255 signs, please.<br />';
		}else{
			//Убираем теги и преобразуем спецсимволы
			$message = strip_tags(htmlspecialchars($message,	ENT_QUOTES,	'UTF-8'));
			$message = wordwrap($message, 65, "<br />\n");
			$message = "\n Вопрос: ".$message;
		}		
	}
	
	$to	= "savchenko_vladimir@mail.ua";
	$subject	=	"It is the question from a site visitor";
	
	//Составляем запрос
	if($name != false and $email != false and $message != false){
		$message = $name.$email.$message;
		if(!mail($to, $subject,	$message)){
		$response .= "Your message is not sent. Try again, please.<br />";
	}else{
		$response .= "<p>Your message is sent successfully.</p>
			<script>
				$(\"[name='name']\").val('').css({'background-color':'', 'border-color':''});
				$(\"[name='email']\").val('').css({'background-color':'', 'border-color':''});
				$(\"[name='message']\").val('').css({'background-color':'', 'border-color':''});
				contacts._name = '';
				contacts._email = '';
				contacts._message = '';
				var button = document.body.querySelector('[name=\"send\"]').setAttribute('disabled', 'true');
			</script>";
		}
	}
	echo $response;
?>