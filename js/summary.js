'use strict';

/* it is displaying the page softly */
var display = new softDisplaying('body', 3000);
display.display();

/* Keep header visible on the top of screen */
var glueHeader = new GlueElementTop('header');
glueHeader.glue();

/* It is wrighting current year in the footer */
var beginPlace = $('.beginYear');
var currentPlace = $('.currentYear');
var insertDate = new InsertCurrenDate(beginPlace, currentPlace);
insertDate.write();

/* Making the Contactas page */
var contacts = new MakingContactsPage('#contacts',
'../php/contactsHTML.php', '../html/errorPage.html');
contacts.loadPage();

/* Glue footer bottom */
var footerGlued = new GlueElementBottom('section.summary', 180);
footerGlued.glue();
$(window).resize(function(){
	footerGlued.glue();
});