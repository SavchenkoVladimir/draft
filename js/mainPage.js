'use strict';

/* make sun move */
var move = new MoveingSun('sun');

/* Keep header visible on the top of screen */
var header = document.getElementById('header');
var glueHeader = new GlueElementTop(header);
glueHeader.run();

/* it is page displaying softly */
var display = new softDisplaying('body', 5000);

/* It is wrighting current year in the footer */
var beginPlace = $('.beginYear');
var currentPlace = $('.currentYear');
var insertDate = new InsertCurrenDate(beginPlace, currentPlace);
insertDate.write();

