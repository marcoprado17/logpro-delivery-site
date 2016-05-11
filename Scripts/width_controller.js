var minWidth = 80; // unidade: em
// pxToEm já foi definida em height_controller

var resizeWidths = function(){
	console.log('resizeWidths called');
	var windowsWidth = $(window).width()*pxToEm;
	console.log('windowsWidth = ' + windowsWidth);
	var width;
	if( windowsWidth > minWidth ){
		width = windowsWidth;
	}
	else{
		width = minWidth;
	}
	$('#header').css('width', toEmUnit(width));
	$('#main-windows').css('width', toEmUnit(width));
	$('#footer').css('width', toEmUnit(width));
}

var toEmUnit = function(number){
	return number+'em';
}