'use strict';

var words = ['word', 'слово', 'мир'];

var wordss = [
	['word', 'слово', 'мир'],
	['board', 'доска', 'стол'],
	['go', 'идти', 'думать'],
	['miss', 'скучать', 'достигать'],
	['apple', 'яблоко', 'телефон'],
	['swim', 'плавать', 'летать'],
	['table', 'стол', 'дорога'],
	['cell', 'мобильник', 'самолет']
];


//repeat.showTime(5000, 'timeParent', 'timeChild');
//repeat.placeWords(words, '.word', '.answer');
//setTimeout(repeat.showTime, 500, 5000, 'timeParent', 'timeChild');
repeat.getAnswer('.answer', wordss);
repeat.clickGeneration(37, 39, '.answerContainer');
//repeat.highlightElement('.answerContainer');