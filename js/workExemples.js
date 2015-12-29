'use strict';

/* it is page displaying softly */
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

/* It is decorating the work list items */
/*
var decorate = new ListItemDecorating('list-item');
decorate.run();
*/

/* Make three stars shine on the background of page */
var star1 = new ShiningStar(6500, 'star');
star1.run();
var star2 = new ShiningStar(9000, 'star');
star2.run();


/* Making the Contactas page */
var contacts = new MakingContactsPage('#contacts',
'../php/contactsHTML.php', '../html/errorPage.html');
contacts.loadPage();

/* Glue footer bottom */
var footerGlued = new GlueElementBottom('section.workExemples', 120);
footerGlued.glue();
$(window).resize(function(){
	footerGlued.glue();
});