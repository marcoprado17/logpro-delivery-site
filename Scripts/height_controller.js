var headerHeight = 2.25; // unidade: em
var mainWindowsMinHeight = 30; // unidade: em
var footerHeight = 6; // unidade: em

var pxToEm = 1/parseFloat($("body").css("font-size"));

var initHeights = function(){
	$('#header').css('height', toEmUnit(headerHeight));
	$('#footer').css('height', toEmUnit(footerHeight));
	resizeMainWindowsHeight();
}

var resizeMainWindowsHeight = function(){
	var windowsHeight = $(window).height()*pxToEm;
	var mainWindowsHeight;
	if( windowsHeight > headerHeight + mainWindowsMinHeight + footerHeight ){
		mainWindowsHeight = windowsHeight - headerHeight - footerHeight;
	}
	else{
		mainWindowsHeight = mainWindowsMinHeight;
	}
	$('#main-windows').css('height', toEmUnit(mainWindowsHeight));
}

var toEmUnit = function(number){
	return number+'em';
} 