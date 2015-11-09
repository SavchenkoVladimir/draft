'use strict';

/*
	Class InsertCurrenDate adopts two arguments: the node contains inception year and 
	the node where current year will be displayed if the these are different.
*/
function InsertCurrenDate(beginPlace, currentPlace){
	this._beginYear = $(beginPlace).html();
	this._currentYear = new Date().getFullYear();
}
InsertCurrenDate.prototype.write = function(){
	if( this._beginYear != this._currentYear ){
		$(currentPlace).html( '- ' + this._currentYear);
	}
};


/* 
	The class  GlueElementTop keeps element visible on the top of screen 
*/
function GlueElementTop(element){
	this.element = element;
	this.elementMetrics = getComputedStyle(element);
	this.marginTop = this.elementMetrics.marginTop;
	this.elementHeight = this.elementMetrics.height;

	this.definePlace = function(){
		this.place = element.nextSibling;
		return this.place;
	}
	
	this.createDeputy = function(){
		this.deputy = document.createElement('div'); //создали блок заменитель
		this.deputy.setAttribute('id', 'clone');// присвоили ему id
		this.deputy.style.minHeight = this.elementHeight; //установили высоту блока
		this.deputy.style.marginTop = this.marginTop; //установили верхний марджин
		return this.deputy;
	}
}
GlueElementTop.prototype.run = function(){
	var place = this.definePlace();
	var clone = this.createDeputy();
	var marginTop = this.marginTop
	var deputy = this.createDeputy();
	var element = this.element;

	window.addEventListener('scroll', function(){
		if( window.scrollY >= parseInt(marginTop) ){
			$(element).css({'position': 'fixed', 'margin-top': 0, 'top': 0, 'z-index': 100});
			if(deputy){
				document.body.insertBefore(deputy, place); // добавили заместителя в документ
			}
		}
		if( window.scrollY <= parseInt(marginTop) ){
			$(element).css({'position': '', 'margin-top': '', 'top': '', 'z-index': ''});
			if($("#clone")){
				$("#clone").remove();
			}			
		}		
	});
}


/* 
	Class movingSun moves the Sun object when the mouse changes its location on the Y axis
*/
function MoveingSun(sunId){
	this.sun = sunId;
	$(window).mousemove(function(event){
		var mouseHeight = event.clientY;
		var screenWidth = $(window).width(); //получили ширину экрана
		var screenHeight = $(window).height(); //получили высоту экрана
		var marginTop = parseInt((mouseHeight * 100) / screenHeight); //получили высоту курсора в %
		var marginLeft = - parseInt((mouseHeight * 100) / screenHeight);
		if(marginTop){
			$(this.sun).fadeIn(1000);
			$(this.sun).css({'margin-top': marginTop, 'margin-left':marginLeft, 'left':'10%'});
		}
	});
}








/* make sun move */
var move = new MoveingSun(sun);

/* Keep header visible on the top of screen */
var header = document.getElementById('header');
var glueHeader = new GlueElementTop(header);
glueHeader.run();


/* It is wrighting current year in the footer */
var beginPlace = $('.beginYear');
var currentPlace = $('.currentYear');
var insertDate = new InsertCurrenDate(beginPlace, currentPlace);
insertDate.write();