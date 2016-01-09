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

/* Make soft hover. */
var newsRefAnimated = new Hover('#news', 'rgb(15, 15, 15)', 'rgb(34, 34, 34)', 200);
newsRefAnimated.animation();
var videoRefAnimated = new Hover('#video', 'rgb(15, 15, 15)', 'rgb(34, 34, 34)', 200);
videoRefAnimated.animation();
var eventsRefAnimated = new Hover('#events', 'rgb(15, 15, 15)', 'rgb(34, 34, 34)', 200);
eventsRefAnimated.animation();
var filmsRefAnimated = new Hover('#films', 'rgb(15, 15, 15)', 'rgb(34, 34, 34)', 200);
filmsRefAnimated.animation();
var tvShowsRefAnimated = new Hover('#tvShows', 'rgb(15, 15, 15)', 'rgb(34, 34, 34)', 200);
tvShowsRefAnimated.animation();
var gamesRefAnimated = new Hover('#games', 'rgb(15, 15, 15)', 'rgb(34, 34, 34)', 200);
gamesRefAnimated.animation();
var communityRefAnimated = new Hover('#community', 'rgb(15, 15, 15)', 'rgb(34, 34, 34)', 200);
communityRefAnimated.animation();
var charachtersRefAnimated = new Hover('#characters', 'rgb(15, 15, 15)', 'rgb(34, 34, 34)', 200);
charachtersRefAnimated.animation();
