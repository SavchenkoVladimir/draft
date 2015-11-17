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
	The class softDisplaying displays a page softly after the page is completly downloaded.	
*/
function softDisplaying(tagName, time){
	this.element = document.getElementsByTagName(tagName);
	this.time = time;
	
	this.display = function(){
		var time = this.time;
		var element = this.element;		
		document.addEventListener("DOMContentLoaded", function(){$(element).fadeIn(time);
		});
	}
	this.display();
}

/* 
	The class  GlueElementTop keeps element visible on the top of screen 
*/
function GlueElementTop(element){
	this.element = element; //получили элемент
	this.elementMetrics = getComputedStyle(element); //получили характеристики элемента
	this.marginTop = this.elementMetrics.marginTop; //узнали марджин топ
	this.elementHeight = this.elementMetrics.minHeight; //узнали его высоту
	this.parent = this.element.parentElement; //определили родитнльский элемент

	this.definePlace = function(){		
		this.place = element.nextElementSibling; //узнали следующего соседа
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
	var parent = this.parent;
	var clone = this.createDeputy();
	var marginTop = this.marginTop
	var deputy = this.createDeputy();
	var element = this.element;

	window.addEventListener('scroll', function(){
		if( window.scrollY >= parseInt(marginTop) ){
			$(element).css({'position': 'fixed', 'margin-top': 0, 'top': 0, 'z-index': 100});
			if(deputy){
				parent.insertBefore(deputy, place); // добавили заместителя в документ
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

/*
	Class LisItemDecorating adopts element class name and decorates it's children.
	The class adopts class name.
*/
function LisItemDecorating(className){
	this.className = className;
}
LisItemDecorating.prototype.run = function(){
	var className = this.className;
	$('div').mousemove(function(){
	
		var element = $(this);
		
		if( $(element).attr('class') == className ){
			var children = $(element).children();
			var caption = children[0];
			var description = children[1];
			$(caption).css({'background-color':'rgba(0,0,255,0.07'});
			$(description).css({'text-decoration':'underline'});
		}
	});
		$('div').mouseout(function(){
		
		var element = $(this);
		
		if( $(element).attr('class') == className ){
			var children = $(element).children();
			var caption = children[0];
			var description = children[1];
			$(caption).css({'background-color':''});
			$(description).css({'text-decoration':''});
		}
	});
}

/*
	The class SiningStar displays and hide a star on the page background in random place
	The class adopts time of displaying.
*/
function ShiningStar(time){
	this.time = time;
	this.createElement = function(){
		var element = document.createElement('img');
		element.setAttribute('id', 'star');
		return element;
	}
}
ShiningStar.prototype.run = function(){
	var time = this.time;
	var element = this.createElement();
	setInterval(function(){
			var windowWidth = $(window).width();
			var windowHeight = $(window).height();
			element.style.top = (parseInt(Math.random() * windowHeight)) + 'px';
			element.style.left = (parseInt(Math.random() * windowWidth)) + 'px';
			document.body.appendChild(element);
			$(element).fadeIn((time/2) - 50);
			
			setTimeout(function(){
				$(element).fadeOut((time/2));
			}, (time/2) + 25);
		}, 
	this.time);	
}











/* Keep header visible on the top of screen */
/*
var header = document.getElementById('header');
var glueHeader = new GlueElementTop(header);
glueHeader.run();
*/

/* It is wrighting current year in the footer */
/*
var beginPlace = $('.beginYear');
var currentPlace = $('.currentYear');
var insertDate = new InsertCurrenDate(beginPlace, currentPlace);
insertDate.write();
*/