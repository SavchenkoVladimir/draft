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
	var self = this;
	
	this.display = function(){
		document.addEventListener("DOMContentLoaded", function(){$(self.element).fadeIn(self.time);
		});
	}
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
GlueElementTop.prototype.glue = function(){
	var self = this;

	window.addEventListener('scroll', function(){
		if( window.scrollY >= parseInt(self.marginTop) ){
			$(self.element).css({'position': 'fixed', 'margin-top': 0, 'top': 0, 'z-index': 100});
			if( !document.getElementById('clone') ){
				self.parent.insertBefore(self.createDeputy(), self.definePlace()); // добавили заместителя в документ
			}
		}
		if( window.scrollY <= parseInt(self.marginTop) ){
			$(self.element).css({'position': '', 'margin-top': '', 'top': '', 'z-index': ''});
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
	var self = this;

	$('div').mousemove(function(){
	
		var element = $(this);
		
		if( $(element).attr('class') == self.className ){
			var children = $(element).children();
			var caption = children[0];
			var description = children[1];
			$(caption).css({'background-color':'rgba(0,0,255,0.07'});
			$(description).css({'text-decoration':'underline'});
		}
	});
	$('div').mouseout(function(){
		
		var element = $(this);
		
		if( $(element).attr('class') == self.className ){
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
		this.img = document.createElement('img');
		this.img.setAttribute('id', 'starBackground');
		this.element = document.createElement('div');
		this.element.setAttribute('id', 'star');
		this.element.appendChild(this.img);
		return this.element;
	}
}
ShiningStar.prototype.run = function(){
	var self = this;
	this.element = this.createElement();
	
	function hideElement(){
		setTimeout(function(){
			$(self.element).fadeOut((self.time/2));
		}, (self.time/2) - 25);
	}
	
	function liveElement(){
			var windowWidth = $(window).width();
			var windowHeight = $(window).height();
			
			self.element.style.top = (parseInt(Math.random() * windowHeight)) + 'px';
			self.element.style.left = (parseInt(Math.random() * windowWidth)) + 'px';
			
			document.body.appendChild(self.element);
			$(self.element).fadeIn((self.time/2) - 50);
			
			hideElement();		
	}
	setInterval(liveElement, self.time);	
}

/*
	The class MakingContactsPage creates a contacts page.
	The contacts page being downloaded with AJAX and cover current page
*/
function MakingContactsPage(referenceId, pageAddress){
	this.ref = document.getElementById(referenceId);
	this.name = '';
	this.email = '';
	this.message = '';

	//вешаю на  window слушатель событий onchange
	//при наступлении события определяю элемент на котором сработало это событие
	//определяю значение свойства name на котором сработало событие 
	//если значение свойства совпадает с одним из имен свойств объекта - получаем значение формы и записываем
	//в свойство объекта
	
	//вешаем на window слушатель событий потери фокуса
	//по факту наступления события определяем значение атрибута name на котором сработало событие
	//если это email - задействую обработчик email 
	//если все в порядке - оставляю поле зеленым
	//на остальных полях если они не пустые - поля остаются зеленые а если пустые - становятся красными
	//также при этом событии срабатывает обработчик который проверяет правильносить заполнения полей форм
	//если все заполнены верно - активируем кнопку отправить
	
	//при нажатии на кнопку отправить
	
	//при нажатии на кнопку закрыть - проверяем значения свойств объекта - если они != null - спрашиваем польз
	//хочет ли он действительно выйти. Если нет - возвращаем false Если да - скрываем все окно и удаляем объект
	 
	this.loadPage =	function(){
		var div = document.createElement('div');
		$(div).attr('id', 'receiver');
		$('body').prepend(div);
		$(div).load(pageAddress);
		setTimeout(makeSize, 2000);
		event.preventDefault();
	};
	
	function makeSize(){
		var screenWidth = $(window).width(); 
		var screenHeight = $(window).height(); 
		var cover = document.getElementById('cover');
		var page = document.getElementById('contactPage');
		
		$(page).css({'margin-left':screenWidth/3});
		$(cover).fadeIn(1000);
		$(page).fadeIn(2000);
		$('body').css('overflow', 'hidden');
	}

	$(this.ref).click(this.loadPage);
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