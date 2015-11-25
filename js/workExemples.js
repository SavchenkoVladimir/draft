'use strict';

/* it is page displaying softly */
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

/* It is decorating the work list items */
var decorate = new LisItemDecorating('list-item');
decorate.run();

/* Make three stars shine on the background of page */
var star1 = new ShiningStar(6500);
star1.run();
var star2 = new ShiningStar(7900);
star2.run();
var star3 = new ShiningStar(10100);
star3.run();

/* Making the Contactas page */
var contacts = new MakingContactsPage('contacts', 'http://draft/php/contactsHTML.php');