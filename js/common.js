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
	this._name = '';
	this._email = '';
	this._message = '';
	
	this.getElement = function(){
		var elem = 	event.target;	
		return elem;
	}
	
	this.getElementName = function(elem){
		var elemName = $(elem).attr('name');
		return elemName;
	}
	
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
/* The method sets an object property value after input fields are changed. */
MakingContactsPage.prototype.setProperty = function(){
	var self =  this;
	
	$(document).change(function(event){
		var element = event.target;
		var name = $(element).attr('name');
		
		switch(name){
			case ('name'): self._name = $(element).val();
				break;
			case ('email'): self._email = $(element).val();
				break;
			case ('message'): self._message = $(element).val();
				break;
		}
	});
}
/* The method validates a name property value */
MakingContactsPage.prototype.nameValidate = function(){
	if(this._name){
		return true;		
	}else{
		return false;
	}
}
/* The method validates a email property value */
MakingContactsPage.prototype.emailValidate = function(){
	if( this._email.match(/.+@.+\..+/i) ){
		return true;
	}else{
		return false;
	}
}
/* The method validates a message property value */
MakingContactsPage.prototype.messageValidate = function(){
	if(this._message){
		return true;		
	}else{
		return false;
	}
}
/* The method paints an input fields in depends on valid or invalid value. */
MakingContactsPage.prototype.painting = function(){
	var self = this;

	$(document).change(function(event){
		var element = event.target;
		var elemName = $(element).attr('name');

		function validate(elem){
			if( elem == 'name' ){
				return self.nameValidate();
			}else if( elem == 'email' ){
				return self.emailValidate();
			}else if( elem == 'message' ){
				return self.messageValidate();
			}			
		}
		
		if( !validate(elemName) ){
			$(element).css({'background-color':'rgb(252, 219, 215)', 'border-color':'rgb(255, 59, 56)'});
		}
		if( validate(elemName) ){
			$(element).css({'background-color':'rgb(227, 255, 193)', 'border-color':'rgb(26, 218, 87)'});
		}		
	});
}
/* The method unblocks the send button if the typed values are allowed */
MakingContactsPage.prototype.buttonUnblock = function(){
	var self = this;
	$(document).change(function(){
		if( self.nameValidate() && self.emailValidate() && self.messageValidate() ){
			var button = document.body.querySelector('[name="send"]');
			button.removeAttribute('disabled');
			button.style.cursor = 'pointer';
		}else{
			var button = document.body.querySelector('[name="send"]');
			button.setAttribute('disabled', 'true');
		}
	});
}
/* The method sends a letter. It adopts a buttom name attribute, a script handler address and warning div id */
MakingContactsPage.prototype.send = function(buttName, address, divId){
	var self = this;
	this.cont = document.body.querySelector(divId);
	this._button = document.body.querySelector(buttName);
	
	function makeContainer(divId){
		var prevSibling = self.cont.previousElementSibling;
		self.cont.style.left = parseInt(prevSibling.getBoundingClientRect().left) + 100 + 'px';
		self.cont.style.top = parseInt((prevSibling.getBoundingClientRect().top) - 105) + 'px';
		$(self.cont).fadeIn(2000);
	}
	
	function containerBlur(divId, time){
		$(self.cont).fadeOut(time);
	}
	
	$(this._button).click(function(){
		var str = JSON.stringify(self, ['_name', '_email', '_message']);
		makeContainer(divId);
		$(self.cont).load(address, {'querry': str});
		setTimeout(containerBlur, 10000, divId, 2000);
	});
}
/* The method closes the contact page. It adopts a button id and warning div id */
MakingContactsPage.prototype.close = function(buttId, divId){
	var self = this;
	this.button = document.body.querySelector(buttId);
	this.div = document.body.querySelector(divId);
	
	$(this.button).click(function(){
		if( self._name != '' || self._email != '' || self._message != ''){
			self.div.style.top = parseInt(self.button.getBoundingClientRect().top) + 30 + 'px';
			self.div.style.left = parseInt(self.button.getBoundingClientRect().left) - 290 + 'px';
			$(self.div).fadeIn(1000);
			var yes = $(self.div).children()[1];
			$(yes).click(function(){
				self._name = self._email = self._message = '';
				$('#cover').fadeOut(1000);
			});
		
			var no = $(self.div).children()[2];
			$(no).click(function(){
				$(self.div).fadeOut(1000);
				return false;
			});	
		}else{
			$('#cover').fadeOut(1000);
			$('body').css('overflow', '');
			setTimeout(function(){
			$('#receiver').remove()				;
//				document.body.removeChild(elem);
			}, 2000);
		}
	});
}
























