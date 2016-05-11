var _tShowMainWindow = 150;
var _tHideMainWindow = 150;
var _tShowMainWindowContent = 125;
var _mainWindowWidth = 40 // unidade: em

var _buttonClickedId;

var hideShowMainWindowMain = function(){
	console.log('hideShowMainWindowMain called');
	if( $('#main').hasClass('main-not-visible') ){
		$('#main').css('width', '0em');
	}

	$('.menu-btn-unselected').click(function(){
		_buttonClickedId = $(this).prop('id');
		if( $(this).hasClass('menu-btn-selected') ){
			return;
		}
		console.log('menu-btn(' + _buttonClickedId + ') clicked');
		if( $('#main').hasClass('main-visible') ){ 
			hideMainWindowAndShowAgain();
		}
		else{
			showMainWindow();
		}
	});

	$('#close-main-window-image').click(function(){
		resizeWidths();
		hideMainWindow();
	});
}

var hideMainWindow = function(){
	console.log('hideMainWindow called');
	unshowMainContent();
	$('#main').animate({width: '0em'}, _tHideMainWindow);
	setTimeout(function(){
		turnMenuButtonUnselected($('.menu-btn-selected'));
	}, _tHideMainWindow/2);
}

var hideMainWindowAndShowAgain = function(){
	console.log('hideMainWindowAndShowAgain called');
	unshowMainContent();
	$('#main').animate({width: '0em'}, _tHideMainWindow, showMainWindow);
}

var unshowMainContent = function(){
	$('#main-content').removeClass('main-content-visible');
	$('#main-content').addClass('main-content-not-visible');
}

var showMainWindow = function(){
	console.log('showMainWindow called');
	$('#main').animate({width: _mainWindowWidth+'em'}, _tShowMainWindow, showMainContent);
	turnMenuButtonUnselected($('.menu-btn-selected'));
	turnMenuButtonSelected($('#'+ _buttonClickedId));
	$('#main').removeClass('main-not-visible');
	$('#main').addClass('main-visible');
}

var showMainContent = function(){
	$('#main-content').removeClass('main-content-not-visible');
	$('#main-content').addClass('main-content-visible');
	$('#main-content').css('opacity', '0');
	$('#main-content').animate({opacity: '1'}, _tShowMainWindowContent);
}

var turnMenuButtonUnselected = function(button){
	button.addClass('menu-btn-unselected');
	button.removeClass('menu-btn-selected');
	button.children('.menu-btn-image').prop('src', getUnselectedImageSrc(button));
}

var getUnselectedImageSrc = function(button){
	if( button.prop('id') === 'new-delivery-btn' ){
		return 'Images/motorcycle_icon_unselected.png';
	}
	else if( button.prop('id') === 'monitor-delivery-btn' ){
		return 'Images/monitor_icon_unselected.png';
	}
	else{
		return 'Images/history_icon_unselected.png';
	}
}

var turnMenuButtonSelected = function(button){
	button.removeClass('menu-btn-unselected');
	button.addClass('menu-btn-selected');
	button.children('.menu-btn-image').prop('src', getSelectedImageSrc(button));
}

var getSelectedImageSrc = function(button){
	if( button.prop('id') === 'new-delivery-btn' ){
		return 'Images/motorcycle_icon_selected.png';
	}
	else if( button.prop('id') === 'monitor-delivery-btn' ){
		return 'Images/monitor_icon_selected.png';
	}
	else{
		return 'Images/history_icon_selected.png';
	}
}