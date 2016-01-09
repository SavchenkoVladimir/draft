'use strict';

/* it is displaying the page softly */
var display = new softDisplaying('body', 1500);
display.display();

/* Making the Contactas page */
var contacts = new MakingContactsPage('a.right404',
'../php/contactsHTML.php', '../html/errorPage.html');
contacts.loadPage();