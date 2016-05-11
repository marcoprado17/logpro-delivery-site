var _destinyForm;
var _numberOfDeliveryForms;
var _maxNumberOfDeliverys = 3;

newDestinyMain = function(){
	_numberOfDeliveryForms = 1;
	var firstDestinyForm = $(".last-destiny");
	_destinyForm = firstDestinyForm.clone();
	var closeButton = $() 
	_destinyForm.children('.new-delivery-panel-heading').append('<img src="Images/close.png" class="close-adress-form-btn">');
	$('#max-delivery-reached-alert').children('span').text(_maxNumberOfDeliverys);
	$('#max-delivery-reached-alert').css('display', 'none');
	addAddressFormGeocodingUpdate(firstDestinyForm);

	$('#new-destiny-btn').click(function(){
		var _oldLastDestiny = $(".last-destiny");
		if(_numberOfDeliveryForms === 1 ){
			var button = $('<img src="Images/close.png" class="close-adress-form-btn">');
			_oldLastDestiny.children('.new-delivery-panel-heading').append(button);
			setCloseButtonClickFunction(button);
		}
		_oldLastDestiny.removeClass('last-destiny');
		var newDestinyForm = _destinyForm.clone();
		setCloseButtonClickFunction(newDestinyForm.children('.new-delivery-panel-heading').children('img'));
		_oldLastDestiny.after(newDestinyForm);
		updateDeliveryDestinyNames();
		_numberOfDeliveryForms++;

		if( _numberOfDeliveryForms === _maxNumberOfDeliverys ){
			$('#max-delivery-reached-alert').css('display', 'block');
			$('#new-destiny-btn').css('display', 'none');
		}

		addAddressFormGeocodingUpdate(newDestinyForm);
	})
}

setCloseButtonClickFunction = function(element){
	element.click(function(){
		if( _numberOfDeliveryForms === _maxNumberOfDeliverys ){
			$('#max-delivery-reached-alert').css('display', 'none');
			$('#new-destiny-btn').css('display', 'inline-block');
		}
		_numberOfDeliveryForms--;
		$(this).parent().parent().remove();
		updateDeliveryDestinyNames();
		updateLastDestiny();
		if( _numberOfDeliveryForms === 1 ){
			$('.new-destiny-panel').children('.new-delivery-panel-heading').children('img').remove();
		}
	})
}

updateDeliveryDestinyNames = function(){
	$('.delivery-form-title').each(function(i, deliveryFormTitle){
			$(this).text('Entrega ' + String.fromCharCode(65+i))
	});
}

updateLastDestiny = function(){
	$('.new-destiny-panel').last().addClass('last-destiny');
}