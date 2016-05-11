var main = function(){
	console.log('main called');

	initHeights();
	resizeWidths();
	hideShowMainWindowMain();
	newDestinyMain();
}

var map;
var geocoder;
var directionsService;
var directionsDisplay;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
	    center: {lat: -23.202, lng: -45.887},
	    zoom: 15
	});

	geocoder = new google.maps.Geocoder();
	directionsService = new google.maps.DirectionsService;
  	directionsDisplay = new google.maps.DirectionsRenderer;
  	directionsDisplay.setMap(map);

	deliveryMapManagerMain();
}

var onResize = function(){
	resizeMainWindowsHeight();
	resizeWidths();
}

$(document).ready(main);
$(window).resize(onResize);