'use strict';

/* it is displaying the page softly */
var display = new softDisplaying('body', 2000);
display.display();

/* Make page 100% height of screen. */
var footerGlued = new GlueElementBottom('section.starWarsCharackters', 295);
footerGlued.glue();
$(window).resize(function(){
	footerGlued.glue();
});