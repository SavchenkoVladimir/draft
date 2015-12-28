'use strict';

/* it is displaying the page softly */
var display = new softDisplaying('body', 3000);
display.display();

/*
	Making the Contactas page. 
	Object contacts is alredy created in the index.js script
*/
contacts.setProperty();
contacts.painting();
contacts.buttonUnblock();
contacts.send('[name="send"]', 'http://savchenkoPortfolio/php/contactsHandle.php', '#resp');
contacts.close('#close', '#warning');
