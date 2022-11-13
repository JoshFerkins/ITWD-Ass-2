//This javascript file is used for testing the validity of user inputs on the booking page

//All functions are very similar however all differe slightly meaning they all can't use the same thing

//Called when the submit button on the receipt modal is pressed
function testValidity(){
	//Checks if all error checks are true
	if(!fnamecheckError && !lnamecheckError && !streetcheckError && !pncheckError && !postcheckError && !emailcheckError && !imeicheckError && !modelnumcheckError){
		//if not
		alert("Please check input validity!");
		return;
	} else if(appState.courtesyPhone.item == "none"){
		//if a phone hasn't been selected
		alert("A phone must be selected for hire!")
		return;
	} else {
		//If all return true
		alert("Booking application submitted!");
		window.location.href = "receipt.html";
	}
}

//Initally hiding all error alerts and setting all error check states to false
$('#usercheck').hide();
let fnamecheckError = false;
let lnamecheckError = false;
$('#streetcheck').hide();
let streetcheckError = false;
$('#citycheck').hide();
let citycheckError = false;
$('#pncheck').hide();
let pncheckError = false;
$('#postcheck').hide();
let postcheckError = false;
$('#emailcheck').hide();
let emailcheckError = false;
$('#imeicheck').hide();
let imeicheckError = false;
$('#modelnumcheck').hide();
let modelnumcheckError = false;


//Both first and last name use the validateUserName function 
$('#fnameInput').keyup(function () {
	//If the user name is valid
	if(validateUsername($('#fnameInput').val())){
		//Changes error check state depending
		fnamecheckError = true;
	} else{
		fnamecheckError = false;
	}
});
$('#lnameInput').keyup(function(){
	if(validateUsername($('#lnameInput').val())){
		lnamecheckError = true;
	} else{
		lnamecheckError = false;
	}
});

//funciton used by both prior keyup handles
	function validateUsername(nameValue) {
	//Used to check for a range of differing expression values
	var regex = /^[-a-zA-Z\s]*$/
	if (nameValue.length == 0) {
		$('#usercheck').show();
		$('#usercheck').html('name missing');
		return false;
	} else if (!regex.test(nameValue)) {	
		$('#usercheck').show();
		$('#usercheck').html('name can only contain alphabetical character and hyphens');	
		return false;
	} else {
	$('#usercheck').hide();
	return true;
	}
};

//street input
$('#streetInput').keyup(function(){
	if($('#streetInput').val().length == 0){
		$('#streetcheck').show();
		streetcheckError = false;	
	} else {
		$('#streetcheck').hide();
		streetcheckError = true;
	}
});

//city input
$('#cityInput').keyup(function(){
	if($('#cityInput').val().length == 0){
		$('#citycheck').show();
		citycheckError = false;
	} else {
		$('#citycheck').hide();
		citycheckError = true;
	}
});

//postcode input
$('#postcodeInput').keyup(function(){
	var regex = /^[0-9]*$/;
	if($('#postcodeInput').val().length < 4) {
		$('#postcheck').show()
		postcheckError = false;
	} else if(!regex.test($('#postcodeInput').val())){
		$('#postcheck').show();
		$('#postcheck').html('Must only be numbers');
		postcheckError = false;
	}	else {
		$('#postcheck').hide();
		postcheckError = true;
	}
});


//phone number input
$('#pnumberInput').keyup(function(){
	var regex = /^[0-9()+-]*$/;		
	if($('#pnumberInput').val().length < 8){
		$('#pncheck').show();
		$('#pncheck').html('Phone number is too short');
		pncheckError = false;
	} else if(!regex.test($('#pnumberInput').val())){
		$('#pncheck').show();
		$('#pncheck').html('Phone number may only contain numbers');
		pncheckError = false;
	} else {
		$('#pncheck').hide();
		pncheckError = true;
	}
});


//email input
$('#emailInput').keyup(function(){
	var regex = /^[\2]*$/;
	if($('#emailInput').val().length == 0){
		$('#emailcheck').show();
		$('#emailcheck').html('Email missing');
		emailcheckError = false;
	} else if (regex.test($('#emailInput').val())){
		$('#emailcheck').show();
		$('#emailcheck').html('Invalid email');
		emailcheckError = false;
	} else {
		$('#emailcheck').hide();
		emailcheckError = true;
	}
});

//imei input
$('#imeiInput').keyup(function(){
	var regex = /^[0-9]*$/;
	if($('#imeiInput').val().length != 15){
		$('#imeicheck').show();
		$('#imeicheck').html('must be 15 characters long');
		imeicheckError = false;
	} else if (!regex.test($('#imeiInput').val())){
		$('#imeicheck').show();
		$('#imeicheck').html('Must be numbers');
		imeicheckError = false;
	} else {
		$('#imeicheck').hide();
		imeicheckError = true;
	}
});

//model number input
$('#modelnumInput').keyup(function(){
	var regex = /^[0-9]*$/;
	if($('#modelnumInput').val().length == 0){
		$('#modelnumcheck').show();
		$('#modelnumcheck').html('Model number missing');
		modelnumcheckError = false;
	} else if(!regex.test($('#modelnumInput').val())){
		$('#modelnumcheck').show();
		$('#modelnumcheck').html('Model number must only be numbers');
		modelnumcheckError = false;
	} else {
		$('#modelnumcheck').hide();
		modelnumcheckError = true;
	}
});
