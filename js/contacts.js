'use strict';

/*	Making the Contactas page. Object contacts is alredy created in the index.js script. */
contacts.setProperty();
contacts.painting();
contacts.buttonUnblock('[name="send"]');
contacts.send('../php/contactsHandle.php', '#resp');
contacts.close('#close', '#warning');