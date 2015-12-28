'use strict';

/* it is displaying the page softly */
var display = new softDisplaying('body', 3000);
display.display();

/* Keep header visible on the top of screen */
var header = document.getElementById('header');
var glueHeader = new GlueElementTop(header);
glueHeader.glue();

/* It is wrighting current year in the footer */
var beginPlace = $('.beginYear');
var currentPlace = $('.currentYear');
var insertDate = new InsertCurrenDate(beginPlace, currentPlace);
insertDate.write();

/* Run the Repeat the words page*/
var repeat = new RepeatTheWords('.repeatTheWords', 'http://savchenkoPortfolio/php/repeatTheWordsHTML.php');
repeat.load('.go');
