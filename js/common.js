'use strict';

/*
	The StepBack class hangs event listener on a page object and brings page back after click on the object. 
	It adopts the object css selector and steps quantity.
*/
function StepBack(){
	this.step;
	this.object;
}
StepBack.prototype.go = function(objectSelector, stepsQuantity){
	var self = this;
	this.object = document.body.querySelector(objectSelector);
	this.step = stepsQuantity;
	
	$(this.object).click(function(event){
		window.history.go(self.step);		
	});
}

/*
	The Reload() class hangs event listener on a page object and reload a page after click on the object.
	It adopts the css object  selector.
*/
function Reload(objectSelector){
	this.object;
}
Reload.prototype.execute = function(objectSelector){
	this.object = document.body.querySelector(objectSelector);
	
	$(this.object).click(function(){
		location.reload();		
	});
}

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
function softDisplaying(elemSelector, time){
	this.element = document.querySelector(elemSelector);
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
function GlueElementTop(elementId){
	this.element = document.getElementById(elementId);
	this.elementMetrics = getComputedStyle(this.element);
	this.marginTop = this.elementMetrics.marginTop;
	this.elementHeight = this.elementMetrics.minHeight;
	this.parent = this.element.parentElement;
}
GlueElementTop.prototype.createDeputy = function(){
		this.deputy = document.createElement('div'); //создали блок заменитель
		this.deputy.setAttribute('id', 'clone');// присвоили ему id
		this.deputy.style.minHeight = this.elementHeight; //!!!!!Вероятно нужно добавить значение маржин
		this.deputy.style.marginTop = this.marginTop; //установили верхний марджин
		return this.deputy;
}
GlueElementTop.prototype.glue = function(){
	var self = this;
	
		window.addEventListener('scroll', function(){
		if( window.scrollY >= parseInt(self.marginTop) ){
			$(self.element).css({'position': 'fixed', 'margin-top': 0, 'top': 0, 'z-index': 100});
			if( !document.getElementById('clone') ){
				$(self.parent).prepend(self.createDeputy());
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
	The class GlueElementBottom glues element to bottom of document.
*/
function GlueElementBottom(sectionSelector, freeSpace){
	this.section = document.body.querySelector(sectionSelector);
	this.freeSpace = freeSpace;
	this.sectionHeight;
	this.documentHeight;
	this.windowHeight;
}
GlueElementBottom.prototype.glue = function(){
	var self = this;
	this.windowHeight = $(window).height();
	this.documentHeight = $('body').height();
	this.sectionHeight = (this.windowHeight - this.freeSpace) + 'px';

	if( this.windowHeight >= this.documentHeight ){
		$(self.section).css('height', self.sectionHeight);
	}
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
	Class ListItemDecorating adopts element class name and decorates it's children.
	The class adopts class name.
*/
function ListItemDecorating(className){
	this.className = className;
}
ListItemDecorating.prototype.run = function(){
	var self = this;

	$('div').mousemove(function(){
	
		var element = $(this);
		
		if( $(element).attr('class') == self.className ){
			var children = $(element).children();
			var caption = children[0];
			var description = children[1];
			$(caption).css({'background-color':'rgba(0,210,255, 0.1'});
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
		setTimeout(makeSize, 1000);
		event.preventDefault();
	};

	function makeSize(){
		var cover = document.getElementById('cover');
		var page = document.getElementById('contactPage');

		if( $(window).width() > 700 ){
			$(page).css({'margin-left': $(window).width()/4, 'margin-top': '5%', 'border-radius': '10px'});
			$('body').css('overflow-x', 'hidden');
		}
		if( $(window).height() > 700 ){
			$('body').css('overflow-y', 'hidden');
		}
		$(cover).css('height', $('body').height());
		$(cover).fadeIn(1000);
		$(page).fadeIn(2000);
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
			$(element).css({'background-color':'rgb(255, 244, 242)', 'border-color':'rgb(255, 160, 160)'});
		}
		if( validate(elemName) ){
			$(element).css({'background-color':'rgb(240, 255, 240)', 'border-color':'rgb(100, 200, 100)'});
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
		$(self.cont).fadeIn(4000);
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
			setTimeout(function(){	$('#receiver').remove(); }, 2000);
		}
	});
}

/*
	The class repeatTheWords deploys the same name page.
*/
function RepeatTheWords(divId, address){
	this.section = document.body.querySelector(divId);
	this.address = address;
	this.button;
	this.timeGap;
	this.parent;
	this.child;
	this.children;
	this.parentHeight;		
	this._divHeight;
	this._heightStep;
	this.engWordPlace;
	this.rusWordPlace;
	this.counter = 0;
	this.wordsKit;
	this.resArr = [];
	this.changeIdTimeout;
	this.setTiptimeout;
	this.paintAnswerTimeout;
	this.disableBlockTimeout
	this.intervalId;
	this.wordsAddress;
	this.words;
	this.wordsArr;
}
RepeatTheWords.prototype.load = function(buttonIdentifyer){
	var self = this;
	this.button = document.body.querySelector(buttonIdentifyer);
	$(this.button).click(function(){
		$(self.section).load(self.address);
	});	
}
/* Метод принимает время исполнения в милисекундах и идентификатор блока. Находит единственного потомка и придает ему 
свойство height от 0 до своей высоты за 50 итераций*/
RepeatTheWords.prototype.showTime = function(timeLength, divParentId, divChildId){
	var self = this;
	this.timeGap = timeLength / 50;
	this.parent = document.getElementById(divParentId);
	this.child = document.getElementById(divChildId);
	this.parentHeight = this.parent.offsetHeight;
		
	this._divHeight = 0;
	this._heightStep = self.parentHeight / 50;

	this.heightChanging = function(){
		self._divHeight += self._heightStep;
		self.child.style.height = parseInt(self._divHeight) + 'px';		
		if( self._divHeight >= self.parentHeight ){
			clearInterval(self.intervalId);
		}
	}
	this.intervalId = setInterval(self.heightChanging, 100);
}
/* Метод принимает массив из трех элементов, идентификатор местa для размещения англ. слова и идентификатор двух мест для русских слов. Первый элемент массива размешает в англ месте, вторые два в случайном порядке размещает два русских. Месту с вторым словом из массива присваивается id=1(true),месту с третьим элементом присваиваем id=0(false) */
RepeatTheWords.prototype.placeWords = function(wordsArr, englishPlace, russianPlace, tipPlace){
	var self = this;
	this.engWordPlace = document.body.querySelector(englishPlace);
	this.rusWordPlace = document.body.querySelectorAll(russianPlace);
	this.tipPlace = document.body.querySelector(tipPlace);

	if(wordsArr == null){
		self.showResults('.repeatTheWords', 'Your answers are next:');
	}else{
					
	this.engWordPlace.textContent = wordsArr[0];
	this.tipPlace.textContent = 'Try answer';
	
	this.rand = Math.round(Math.random());
	if(this.rand === 1){
		this.rusWordPlace[0].textContent = wordsArr[1];
		this.rusWordPlace[0].setAttribute('id', 1);
	
		this.rusWordPlace[1].textContent = wordsArr[2];
		this.rusWordPlace[1].setAttribute('id', 0);
	}
	if(this.rand === 0){
		this.rusWordPlace[0].textContent = wordsArr[2];
		this.rusWordPlace[0].setAttribute('id', 0);
	
		this.rusWordPlace[1].textContent = wordsArr[1];
		this.rusWordPlace[1].setAttribute('id', 1);
	}
	}
}
/* Метод принимает селектор родителя и возвращает коллекцию потомков */
RepeatTheWords.prototype.getChildren = function(divSelector){
	this.parentElem = document.body.querySelector(divSelector);
	return $(this.parentElem).children();
}
/* Метод принимает 2 номера клавиш и идентификатор блока с потомками. При нажатии на клавиши - генерируется событие click на конкретных потомках блока */
RepeatTheWords.prototype.clickGeneration = function(butt1, butt2, divSelector){
	var self = this;
	this.children = this.getChildren(divSelector);

	this.click = new MouseEvent('click');
	
	$(document).keydown(function(event){
		if( event.which == 37){
			self.children[0].dispatchEvent(self.click);
		}
		if( event.which == 39){
			self.children[2].dispatchEvent(self.click);
		}
	});
}
/* Метод раскрашивает блок зеленым если получает true или коричневым если false */
RepeatTheWords.prototype.paintAnswer = function(answer, divSelector){
	var div = document.body.querySelector(divSelector);
	if(answer){
		$(div).css({'color': 'rgb(255, 255, 255)', 'background': 'rgb(19, 221, 33)', 'border': '0'}).html('&#10003;');
	}
	if(!answer){
		$(div).css({'color': 'rgb(255, 255, 255)', 'background': 'rgb(239, 148, 67)', 'border': '0'}).html('&#10007;');
	}
	function resetColor(div){
		$(div).css({'color': 'rgb(150, 150, 150)', 'background': '', 'border': ''}).html('?');
	}
	this.paintAnswerTimeout = setTimeout(resetColor, 500, div);
}
/* метод меняет id=1 на id=0 по истечении переданного времени */
RepeatTheWords.prototype.changeId = function(time){
	var div = document.getElementById('1');
	function change(){
		div.setAttribute('id', '0');
	}
	this.changeIdTimeout = setTimeout(change, time); //!!!
}
/* Устанавливает подсказку внизу страницы */
RepeatTheWords.prototype.setTip = function(divSelector, time){	
	function setTip(divSelector){
		var div = document.body.querySelector(divSelector);
		$(div).html('Your time is over');
	}
	this.setTiptimeout = setTimeout(setTip, time, divSelector); //!!!
}
/* Метод делает массив ответов */
RepeatTheWords.prototype.makeResArray = function(currentArr, answer){
	var elem = currentArr;
	elem.push(answer);
	this.resArr.push(elem);
}
/* Метод красит текст блока серым по истечении переданного методу времени */
RepeatTheWords.prototype.disableBlock = function(divId, timeMs, name){
	var block = document.body.querySelector(name);
	if(block){
		block.removeAttribute('name');
	}	
	
	function disable(divId){
		var div = document.getElementById(divId);				
		div.setAttribute('name', 'disabled');
	}
	this.disableBlockTimeout = setTimeout(disable, timeMs, divId);
}
/* Метод использует данные из массива ответов и рисует таблицу результатов */
RepeatTheWords.prototype.showResults = function(divSelector, captionText){
	var div = document.body.querySelector(divSelector);
	
	this.resHeader = document.createElement('div');
	$(this.resHeader).attr('class', 'res');
	
	this.table = document.createElement('table');
	$(this.table).attr('class', 'res');
	$(this.resHeader).append(this.table);

	this.caption = document.createElement('caption');
	$(this.caption).attr('class', 'res').html(captionText);
	$(this.table).prepend(this.caption);
	
	this.tbody = document.createElement('tbody');
	$(this.table).append(this.tbody);
	
	this.tHead = document.createElement('tr');
	$(this.tHead).attr('class', 'tHead');
	$(this.tbody).append(this.tHead);
	
	this.stat = document.createElement('th');
	$(this.stat).html('Status');
	$(this.tHead).append(this.stat);
	
	this.engWord = document.createElement('th');
	$(this.engWord).html('English word');
	$(this.tHead).append(this.engWord);
	
	this.answ = document.createElement('th');
	$(this.answ).html('Your answer');
	$(this.tHead).append(this.answ);
	
	this.rightAnsw = document.createElement('th');
	$(this.rightAnsw).html('Right answer');
	$(this.tHead).append(this.rightAnsw);
	
	for( var i = 0; i <= (this.resArr.length - 1); i++ ){
		this._resElem = this.resArr[i];
		
		this.tr = document.createElement('tr');
		
		this.tdStat = document.createElement('td');		
		if( this._resElem[3] == true ){
			$(this.tdStat).html('&#10003').attr('class', 'green');
		}else{
			$(this.tdStat).html('&#10007;').attr('class', 'red');
		}
		$(this.tr).append(this.tdStat);
		
		this.simpleTd = document.createElement('td');
		$(this.simpleTd).html(this._resElem[0]);
		$(this.tr).append(this.simpleTd);
		
		this.userAnsw = document.createElement('td');
		if( this._resElem[3] == true ){
			$(this.userAnsw).html(this._resElem[1]);
		}else{
			$(this.userAnsw).html(this._resElem[2]).attr('class', 'lineThrough');
		}
		$(this.tr).append(this.userAnsw);
		
		this.right = document.createElement('td');
		$(this.right).html(this._resElem[1]);
		$(this.tr).append(this.right);
		
		$(this.tbody).append(this.tr);
	}
	
	this.agan = document.createElement('button');
	$(this.agan).attr('id', 'trainAgan').html('Train agan');
	$(this.resHeader).append(this.agan);
	
	this.back = document.createElement('button');
	$(this.back).attr('id', 'back').html('Back');
	$(this.resHeader).append(this.back);
	
	var children = $(div).children();
	$(children).remove();
	$(div).append(this.resHeader);
	$(this.resHeader).effect('slide', 500);
	
	var stepBack = new StepBack;
	stepBack.go('#back', -1);
	
	var reload = new Reload;
	reload.execute('#trainAgan');
}

/* Метод getAnswer слушает клики на блоках ответов и возвращает true или false. Принимает селектор блоков */
RepeatTheWords.prototype.getAnswer = function(divSelector, wordss){
	
	var self = this;
	this.ansversCont = document.body.querySelectorAll(divSelector);
	this.placeWords(wordss[0], '.word', '.answer', '.tip');
	this.showTime(5000, 'timeParent', 'timeChild');
	this.changeId(5250);
	this.setTip('.tip', 5000);
	self.disableBlock(0, 4800, '[name="disabled]');
	
	$(this.ansversCont).click(function(event){
		var cont = 	event.target;
				
		clearTimeout(self.changeIdTimeout);
		clearTimeout(self.setTiptimeout);
		clearInterval(self.intervalId);
		clearInterval(self.disableBlockTimeout);
		
		if($(cont).attr('id') == '1'){
			var res = true;
		}
		if($(cont).attr('id') == '0'){
			var res = false;
		}
		
		self.paintAnswer(res, '.note');
		self.makeResArray(wordss[self.counter], res);
		self.counter++;
		self.placeWords(wordss[self.counter], '.word', '.answer', '.tip');		
		self.showTime(5000, 'timeParent', 'timeChild');
		self.changeId(5250);
		self.setTip('.tip', 5000);
		self.disableBlock(0, 4800, "[name='disabled']");
	});
}
/* метод обращается к серверу, получает и обрабатывает ответ и запускает остальные методы */
RepeatTheWords.prototype.loadWords = function(wordsAddress){
	var self = this;
	this.wordsAddress = wordsAddress;
		$.ajax({
		url: self.wordsAddress,
		success:function(data){
			var wordss = JSON.parse(data);
			self.getAnswer('.answer', wordss);
			self.clickGeneration(37, 39, '.answerContainer');
		}
	});
}

/*
	The class IncreaseeElement increases an element of the page. 
*/
function IncreaseElement(elemSelector){
	this.elemSelector = elemSelector;
	this.elementTarget;
	this.parentA;
	this.parentDiv;
	this.title;
	this.titleCont;
	this.appendix;
}
IncreaseElement.prototype.animate = function(){
	var self = this;
	$(window).mouseover(function(event){
		this.elementTarget = event.target;

		self.writeRefName();

		if($(this.elementTarget).attr('class') !== 'seleblity'){
			return false;
		}
		
		if(($(this.elementTarget).attr('name') == '11' || $(this.elementTarget).attr('name') == '12' ||
			$(this.elementTarget).attr('name') == '13' || $(this.elementTarget).attr('name') == '14')){
				
				self.writeName();
				self.animateName();
					
				$(this.elementTarget).css({'position':'relative', 'z-index':999,});
				$(this.elementTarget).animate({
					'width':'230px', 
					'height':'230px',
					'border-radius':'7px',
					'margin-top':'-50px',				
				}, 500);
				$(this.elementTarget).animate({}, 500);
				
		}else if($(this.elementTarget).attr('name') == '15'){
			
			$(this.elementTarget).css({'position':'relative', 'z-index':999});
			
			self.writeName();
			self.animateName();
						
			$(this.elementTarget).animate({
				'width':'230px', 
				'height':'230px',
				'border-radius':'7px',
				'margin-top':'-50px',				
				'margin-left':'-50px',					
			}, 500);
			$(this.elementTarget).animate({}, 500);
			
		}else if(($(this.elementTarget).attr('name') == '5' ||	$(this.elementTarget).attr('name') == '10')){			
			
			$(this.elementTarget).css({'position':'relative', 'z-index':999});
			
			self.writeName();
			self.animateName();
			
			$(this.elementTarget).animate({
				'width':'230px', 
				'height':'230px',				
				'border-radius':'7px',
				'margin-left':'-50px',
			}, 500);
			$(this.elementTarget).animate({}, 500);
			
		}else{
			
			self.writeName();
			self.animateName();
			
			$(this.elementTarget).css({'position':'relative', 'z-index':999});
			$(this.elementTarget).animate({
				'width':'230px', 
				'height':'230px',				 
				'border-radius':'7px',
			}, 500);				
		}		
	});
	
	$(window).mouseleave(function(event){
		
		this.elementTarget = event.target;
		if($(this.elementTarget).attr('class') == 'seleblity'){
			$(this.elementTarget).animate({
				'left':'0',
				'width':'180px', 
				'height':'180px',				 
				'border-radius':'0',
				'margin':'0',
			}, 500);
			$(this.elementTarget).css('position', 'static');
			$(this.elementTarget).css('z-index', 0);
			
			self.dropName();			
		}
		self.dropRefName();
	});	
}

/*	The method writeName extracts a text from 'value' attribute and write it over the picture. */
IncreaseElement.prototype.writeName = function(){
	self.title = $(self.elementTarget).attr('value');//при нависании читаю содержание value, заношу значение в переменную
	self.parentA = $(self.elementTarget).parent();//нахожу родителя а
	self.parentDiv = $(self.parentA).parent();//нахожу родителя -> div

	self.appendix = document.createElement('div');//добавляю ему элемент p
	$(self.parentDiv).append(self.appendix);
	
	self.titleCont = document.createElement('p');//добавляю ему элемент p
	$(self.titleCont).attr('class', 'titleCont');//придаю элементу стили
	$(self.titleCont).css('position', 'relative');//придаю элементу стили
	$(self.titleCont).html(self.title);//размещаю в нем текст
	$(self.parentDiv).append(self.titleCont);
}

IncreaseElement.prototype.animateName = function(){
	if($(self.elementTarget).attr('name') == '5' ||	$(self.elementTarget).attr('name') == '10'
		||	$(self.elementTarget).attr('name') == '15'){
			$(self.titleCont).animate({'width': '210px', 'margin-left': '-50px'}, 500);
	}else{
		$(self.titleCont).animate({'width': '210px'}, 500);
	}
}
IncreaseElement.prototype.dropName = function(){
	$(self.titleCont).remove();
	$(self.appendix).remove();
}
IncreaseElement.prototype.writeRefName = function(){
	if( $(self.elementTarget).attr('class') == 'refresh' ){
		this.writeName();
	}
}
IncreaseElement.prototype.dropRefName = function(){
	if( $(self.elementTarget).attr('class') == 'refresh' ){
		this.dropName();
	}
}

/*
	The class FillTheArticle receives an array by AJAX method and fill the article.
*/
function FillTheArticle(selector){
	this.article = document.body.querySelector(selector);
	this.address;
	this.data;
	this.div;
	this.ref;
	this.dat;
}
/* The method performs AJAX inquiry to the server and execute 'fill' method. */
FillTheArticle.prototype.load = function(address){
	this.address = address;
	
	$.ajax({
		url:'http://savchenkoPortfolio/php/meetAStar.php',
		success:function(data){
			fillIn.fill(data);
		}
	});
}
/* The method adopts data and depict them in the page */
FillTheArticle.prototype.fill = function(data){
	this.data = JSON.parse(data);

	for( var i = 0; i <= this.data.length - 1; i++ ){
		this.arrElem = this.data[i];
		
		this.img = document.createElement('img');
		this.img.setAttribute('src', this.arrElem[2]);
		this.img.setAttribute('class', this.arrElem[3]);
		this.img.setAttribute('alt', this.arrElem[4]);
		this.img.setAttribute('value', this.arrElem[5]);
		this.img.setAttribute('name', (i + 1));
		
		this.ref = document.createElement('a');
		this.ref.setAttribute('href', this.arrElem[1]);
		this.ref.appendChild(this.img);
		
		this.div = document.createElement('div');
		this.div.setAttribute('class', 'small');
		this.div.appendChild(this.ref);		
		
		this.article.appendChild(this.div);
	}
}

/* 
	The method LoadNewCelebrities execute new AJAX query to the server after refresh button is pressed. 
*/
function LoadNewCelebrities(buttName, contName, address){
	this.cont = document.body.querySelector(contName);
	this.buttName = buttName;	
	this.address = address;
	this.elementTarget;
}
LoadNewCelebrities.prototype.load = function(){
	var self = this;

	$(window).click(function(event){
		self.elementTarget = event.target;
		
		if($(self.elementTarget).attr('class') == self.buttName){
			self.children = $(self.cont).children();
			$(self.children).remove();
		
			$.ajax({
				url: self.address,
				success:function(data){
					fillIn.fill(data); //!!! very bad
				}
			});
			event.preventDefault();
		}		
	});
}

/* 
	The class DescribeRef adopts reference selector and description address. 
	The class depicts description when reference is mouseover and remove description after mouseleave. 
*/
function DescribeRef(refSelector, descrAddress){
	this.elementsCollection = document.body.querySelectorAll(refSelector);
	this.descrAddress = descrAddress;
	this.element;
	this.definition;
	this.coords;
	this.arrow;
	this.image;
	this.windowCoord;
	this.windowWidth;
	this.windowHeight;
}
DescribeRef.prototype.depict = function(){
	var self = this;
	
	$(this.elementsCollection).mouseover(function(event){
		self.element = event.target;
		self.coords = $(self.element).offset();
		
		self.windowCoord = self.element.getBoundingClientRect();
		self.windowWidth = $(window).width();
		self.windowHeight = $(window).height();
		
		if( ((self.windowWidth - self.windowCoord.right) < 150) || ((self.windowHeight - self.windowCoord.bottom) < 100) ){
			self.depictTop();
		}else{
			self.depictBottom();
		}
		$(self.definition).fadeIn(500);
	});		
	self.clear();
}
DescribeRef.prototype.depictTop = function(){
	var self = this;
	
	self.definition = document.createElement('div');
	$(self.definition).attr('class', 'definition');
	alert(self.coords.left);
	$(self.definition).css({ 'top': self.coords.top - 75,
		'left': self.coords.left - 100
	});
		
	self.image = document.createElement('img');
	$(self.image).attr('src', self.descrAddress);		
	$(self.image).attr('class', 'innerImage');		
	$(self.definition).append(self.image);
				
	self.arrow = document.createElement('div');
	$(self.arrow).attr('class', 'pointerBottom');
	$(self.definition).append(self.arrow);

	$('body').append(self.definition);
}
DescribeRef.prototype.depictBottom = function(){
		var self = this;

		self.definition = document.createElement('div');
		$(self.definition).attr('class', 'definition');
		$(self.definition).css({ 'top': self.coords.top + self.element.offsetHeight,
			'left': self.coords.left + 30
		});
		
		self.arrow = document.createElement('div');
		$(self.arrow).attr('class', 'pointerTop');
		$(self.definition).append(self.arrow);
		
		self.image = document.createElement('img');
		$(self.image).attr('src', self.descrAddress);		
		$(self.image).attr('class', 'innerImage');		
		$(self.definition).append(self.image);
	
		$('body').append(self.definition);	
}
DescribeRef.prototype.clear = function(){
	var self = this;
	
	$(this.elementsCollection).mouseout(function(){
		$(self.definition).remove();
	});
}





























