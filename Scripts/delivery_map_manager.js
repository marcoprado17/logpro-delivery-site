var _notFindAddress = false;
var _destinyLatLng;

deliveryMapManagerMain = function(){
	console.log('deliveryMapManagerMain called');
	initEstablishmentAdrress();
}

var _establishmentAddress = "R. Eng. Prudente Meireles de Morais, 355 - Vila Adyana, São José dos Campos - SP, 12243-750";
var _establishmentLatLng;
// _establishmentLatLng não é inicializado apos initEstablishmentAdrress ser chamado, mas depois do google chamar a função de callback
initEstablishmentAdrress = function(){
	console.log('initEstablishmentAdrress called');
	geocoder.geocode({'address': _establishmentAddress}, function(results, status) {
	    if (status === google.maps.GeocoderStatus.OK) {
	    	console.log('initEstablishmentAdrress finished, _establishmentLatLng:');
	    	_establishmentLatLng = [results[0].geometry.location.lat(), results[0].geometry.location.lng()];
	    	console.log(_establishmentLatLng);
	    } else {
	    	alert('Establishment address not find!');
	    }
  	});
}

var delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

addAddressFormGeocodingUpdate = function(newDestinyPanel){
	var addressInput = newDestinyPanel.children('.panel-body').children('.adress-input-div').children('.adress-input');

	addressInput.keyup(function() {
	    delay(function(){
	      	onFinishEnterAddress(addressInput);
	    }, 1000 );
	});

	addressInput.keydown(function() {
		if( _notFindAddress ){
			addressInput.parent().next().remove();
			_notFindAddress = false;
		}
	});
}

onFinishEnterAddress = function(addressInput){
	var address = addressInput.val();
	geocoder.geocode({'address': address}, function(results, status) {
	    if (status === google.maps.GeocoderStatus.OK) {
			_destinyLatLng = [results[0].geometry.location.lat(), results[0].geometry.location.lng()];
			traceRoute();
	    } else if(address != '') {
	    	addressInput.parent().after($('<div id="adress-not-find-alert" class="alert alert-danger">O endereço digitado não foi encontrado.</div>'));
	    	_notFindAddress = true;   	
	    }
  	});
}

var _totalDestinyPanels;
traceRoute = function(){
	console.log('traceRoute called');

	// directionsService.route({
	//     origin: new google.maps.LatLng(_establishmentLatLng[0], _establishmentLatLng[1]),
	//     destination: new google.maps.LatLng(_destinyLatLng[0], _destinyLatLng[1]),
	//     travelMode: google.maps.TravelMode.DRIVING
	// }, function(response, status) {
	//     if (status === google.maps.DirectionsStatus.OK) {
	//       directionsDisplay.setDirections(response);
	//     } else {
	//       window.alert('Directions request failed due to ' + status);
	//     }
	// });

	_totalDestinyPanels = 0;
	
	$('.new-destiny-panel').each(function(){
		geocoder.geocode({'address': address}, function(results, status) {
		    if (status === google.maps.GeocoderStatus.OK) {
				_destinyLatLng = [results[0].geometry.location.lat(), results[0].geometry.location.lng()];
				traceRoute();
		    } else if(address != '') {
		    	addressInput.parent().after($('<div id="adress-not-find-alert" class="alert alert-danger">O endereço digitado não foi encontrado.</div>'));
		    	_notFindAddress = true;   	
		    }
  		});
	});
}