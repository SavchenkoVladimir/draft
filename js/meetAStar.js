'use strict';

/* it is displaying the page softly */
var display = new softDisplaying('body', 2000);
display.display();

/* Glue footer bottom */
var footerGlued = new GlueElementBottom('section.meetAStar', 170);
footerGlued.glue();
$(window).resize(function(){
	footerGlued.glue();
});

/* It is wrighting current year in the footer */
var beginPlace = $('.beginYear');
var currentPlace = $('.currentYear');
var insertDate = new InsertCurrenDate(beginPlace, currentPlace);
insertDate.write();

/* Fill the article */
var fillIn = new FillTheArticle('article');
fillIn.load('../php/meetAStar.php', '../html/errorPage.html');
fillIn.refresh('refresh', 'article', '../php/meetAStar.php', '../html/errorPage.html');

/* Increase an element */
var increase = new IncreaseElement('small');
increase.animate();