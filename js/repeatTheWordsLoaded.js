'use strict';

var words = ['word', 'слово', 'мир'];
/*
var words = [
	['word', 'слово', 'мир'],
	['board', 'доска', 'стол']
];
*/

repeat.showTime(5000, 'timeParent', 'timeChild');
repeat.placeWords(words, '.word', '.answer');
//setTimeout(repeat.showTime, 500, 5000, 'timeParent', 'timeChild');
repeat.getAnswer('.answer');