'use strict';

/* it is displaying the page softly. */
var display = new softDisplaying('body', 100);
display.display();

/* It is wrighting current year in the footer */
var beginPlace = $('.beginYear');
var currentPlace = $('.currentYear');
var insertDate = new InsertCurrenDate(beginPlace, currentPlace);
insertDate.write();

/* Run the slider. */
setTimeout(function(){$('.bxslider').bxSlider();}, 200);

/* Run the datapicker. */
$( "#datepicker" ).datepicker();  


/* Replace radio-buttons by stars. */
var radioReplace = new RedioReplacer('[name="hotelClass"]', '.radio-replacer-container');
radioReplace.replase();
radioReplace.check();