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

/* Populate the charachers block. */
var fillArticle = new ListCharacters(
  'article.starWarsCharackters',
  '../php/starWarsCharacters.php',
  '../html/errorPage.html',
  'charachter', 
  'charachterLink'
);
fillArticle.firstDownload();

/* Header changing depends on scrolling position. */
var headerChange = new ChangeHeader('div.starWarsLogo');
headerChange.transparencyChange();
var childrenIdentArray = ['#sw_headerBlur_left', '#sw_headerBlur_right', 'div.headerWrapper', 'div.starWarsLogo'];
headerChange.shrinkElement('div.swlogo > div', childrenIdentArray);