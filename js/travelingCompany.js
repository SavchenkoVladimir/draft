'use strict';

/* it is displaying the page softly */
var display = new softDisplaying('body', 100);
display.display();

setTimeout(function(){$('.bxslider').bxSlider();}, 200);

$( "#datepicker" ).datepicker();  