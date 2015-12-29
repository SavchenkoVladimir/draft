<?php
	$data = '[
				["small", "#", "../imgTest/001.jpg", "seleblity", "alt", "value1 value1 value1 value1"],
				["small", "#", "../imgTest/002.jpg", "seleblity", "alt", "value2"],
				["small", "#", "../imgTest/003.jpg", "seleblity", "alt", "value3"],
				["small", "http://vfl", "../imgTest/abstract.jpg", "refresh", "alt", "refresh"],
				["small", "#", "../imgTest/004.jpg", "seleblity", "alt", "Value 5"],
				["small", "#", "../imgTest/015.jpg", "seleblity", "alt", "value6"],
				["small", "#", "../imgTest/006.jpg", "seleblity", "alt", "value7"],
				["small", "#", "../imgTest/007.jpg", "seleblity", "alt", "value8"],
				["small", "#", "../imgTest/008.jpg", "seleblity", "alt", "value9"],
				["small", "http://brezhneva.com/", "../imgTest/009.jpg", "seleblity", "alt", "Vera Brezhneva"],
				["small", "#", "../imgTest/010.jpg", "seleblity", "alt", "value11"],
				["small", "#", "../imgTest/011.jpg", "seleblity", "alt", "value12"],
				["small", "#", "../imgTest/012.jpg", "seleblity", "alt", "value13"],
				["small", "#", "../imgTest/013.jpg", "seleblity", "alt", "value14"],
				["small", "#", "../imgTest/014.jpg", "seleblity", "alt", "value15"]
			]';
	$data = json_encode($data);
	echo $data;
?>