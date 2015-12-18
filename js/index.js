'use strict';

/* make sun move */
var move = new MoveingSun('sun');

/* Keep header visible on the top of screen */
var glueHeader = new GlueElementTop('header');
glueHeader.glue();

/* it is displaying the page softly */
var display = new softDisplaying('body', 3000);
display.display();

/* It is wrighting current year in the footer */
var beginPlace = $('.beginYear');
var currentPlace = $('.currentYear');
var insertDate = new InsertCurrenDate(beginPlace, currentPlace);
insertDate.write();

/* Making the Contactas page */
var contacts = new MakingContactsPage('contacts', 'http://savchenkoPortfolio/php/contactsHTML.php');

/* Glue footer bottom */
var footerGlued = new GlueElementBottom('section.main_page', 113);
footerGlued.glue();
$(window).resize(function(){
	footerGlued.glue();
});

/* Describe the references */
var describe = new DescribeRef('section > div > a', 'http://savchenkoPortfolio/img/github.png');
describe.depict();

