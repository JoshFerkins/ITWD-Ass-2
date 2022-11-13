//Courtesy device array
let courtesyList = [{item: 'iPhone', bond: 275},
					{item: 'AndroidPhone', bond: 100},
					{item: 'Charger', bond: 30}
						];

//A variable that stores customertype, and devices
let appState = {customerType: 'customer',
				courtesyPhone: {item: 'none', bond: 0 },//Allow to borrow ONLY 1 phone
				courtesyCharger: {item: 'none', bond: 0}//Allow to borrow ONLY 1 charger
				};	

//Only when the document has fully loaded
$(document).ready(function(){

//Data validation

	//Warranty section
	$('#warranty').change(function(){
		if (this.checked) { $('#serviceFee').val(0).trigger("change"); } 
		else { $('#serviceFee').val(85).trigger("change"); }
	});
	
	//Handle "click add button" event
	$('#addBtn').click(function(e){
		//Prevent all the default function of the "add" button
		e.preventDefault();
	
		//Get the selected item info
		let item = $('#itemList').find(":selected").text();
		let value = $('#itemList').find(":selected").val();
		let bond = courtesyList.find(foundItem => foundItem.item.toLowerCase() == value.toLowerCase()).bond;
	
		//Build html row to add to the table on UI
		let newRow = `
			<tr class="newCreatedItem" >
				<td>${item}</td>
				<td>${bond}</td>
			</tr>
		`;
	
		//Append this new row to the table if it's not existing
		if(appState.courtesyPhone.item == "none" && value.toLowerCase().includes("phone")) {
			$('#borrowItems').append(newRow);
	
			//update the appState
			appState.courtesyPhone.item = value;
			appState.courtesyPhone.bond = bond;
	
			//Update the "bond" element
			if($('#customerType').is(':checked')) {
				$('#bond').val(appState.courtesyPhone.bond + appState.courtesyCharger.bond).trigger("change");
			} else {
				$('#bond').val(0).trigger("change");
			}
	
		} else if(appState.courtesyCharger.item == "none" && value.toLowerCase().includes("charger")){
			$('#borrowItems').append(newRow);	
	
			//update the appState
			appState.courtesyCharger.item = value;
			appState.courtesyCharger.bond = bond;
	
			if($('#customerType').is(':checked')) {
				$('#bond').val(appState.courtesyPhone.bond + appState.courtesyCharger.bond).trigger("change");
			} else {
				$('#bond').val(0).trigger("change");
			}
		} else {
			alert("The item was already added");
		};
	});
	
	
	//Handle 'click remove button' event
	$('#removeBtn').click(function(e) {
		e.preventDefault();
	
		//remove all added rows
		$('.newCreatedItem').remove();
	
		//update the appstate
		appState.courtesyPhone = {item: "none", bond: 0};
		appState.courtesyCharger = {item: "none", bond: 0};
	
		//remove bond 
		$('#bond').val(0).trigger("change");
	});
	
	
	//Changing customer types handle
	$('#customerType').click(function() {
		if(this.checked){
			appState.customerType = 'customer';
			$('#bond').val(appState.courtesyPhone.bond + appState.courtesyCharger.bond).trigger("change");
		};
	});
	
	$('#businessType').click(function(){
		if(this.checked){
			appState.businessType = 'business';
			$('#bond').val(0).trigger("change");
		};
	});
	
	
	//Bond and servicefee value change handle
	$('#bond').change(function(){
		var bondNum = parseInt($('#bond').val());
		var serviceNum = parseInt($('#serviceFee').val());
	
		$('#totalFee').val(bondNum + serviceNum);
		var totalFeeGSTVal = parseInt($('#totalFee').val()) * 1.15;
		totalFeeGSTVal = totalFeeGSTVal.toFixed(2);
		$('#totalFeeGST').val(totalFeeGSTVal);
	});
	
	$('#serviceFee').change(function(){
		var serviceNum = parseInt($('#serviceFee').val());
		var bondNum = parseInt($('#bond').val());
	
		$('#totalFee').val(bondNum + serviceNum);
		var totalFeeGSTVal = parseInt($('#totalFee').val()) * 1.15;
		totalFeeGSTVal = totalFeeGSTVal.toFixed(2);
		$('#totalFeeGST').val(totalFeeGSTVal);
	});

	//start up values 
	serviceNum = parseInt($('#serviceFee').val());
	
	$('#totalFee').val(serviceNum);
	var totalFeeGSTVal = parseInt($('#totalFee').val()) * 1.15;
	totalFeeGSTVal = totalFeeGSTVal.toFixed(2);
	$('#totalFeeGST').val(totalFeeGSTVal);
});

//Retrieves the customer phone image they uploaded and stores it to localstorage
//New query selector attached to the image input tag
const customerPhoneImage = document.querySelector('#customerPhone');

customerPhoneImage.addEventListener('change', function(){
	//File reader
	const reader = new FileReader();
  reader.addEventListener("load", () => {
		//The file the reader has returned
    const uploaded_image = reader.result;
		//Storing the image to localstorage
		localStorage.setItem("image", JSON.stringify(uploaded_image));
	});
  reader.readAsDataURL(this.files[0]);
})

//Loads all the values the user has inputted into a data array stored in localstorage
function loadValues(){
	var ct;
	var wr;
	//A string value depending on customer type and warranty status
	if($('#customerType').is(':checked')){
		ct = 'Yes';
	} else {
		ct = 'No';
	}
	if($('#warranty').is(':checked')){
		wr = 'Yes';
	} else {
		wr = 'No';
	}
 
	//A large data array with key value pairs to store all data in one
	let data = {
		//Customer information
		name: ($('#titleInput').find(":selected").val()+ ' ' + $('#fnameInput').val() + ' ' + $('#lnameInput').val()),
		address : ($('#streetInput').val() + ', ' + $('#suburbInput').val() + ', ' + $('#cityInput').val()),
		postcode: $('#postcodeInput').val(),
		phonenumber : $('#pnumberInput').val(),
		email : $('#emailInput').val(),

		//Phone information
		customer: ct,
		warranty: wr,
		purchasedate: $('#purchaseDate').val(),
		repairdate: $('#repairDate').val(),

		//phone information
		imei: $('#imeiInput').val(),
		make: $('#makeInput').find(':selected').text(),
		model: $('#modelnumInput').val(),
		desc: $('#descInput').val(),

		//courtesy device information
		phonetype: appState.courtesyPhone.item,
		phonebond: appState.courtesyPhone.bond,
		charger: appState.courtesyCharger.item,
		chargerbond: appState.courtesyCharger.bond,

		//purchase information
		bond: ('$' + $('#bond').val()),
		service: ('$' + $('#serviceFee').val()),
		total: ('$' + $('#totalFee').val()),
		totalGST: ('$' + $('#totalFeeGST').val())
	};

	//Store to localstorage
	localStorage.setItem("data", JSON.stringify(data));
	//load receipt after data is loaded
	loadReceipt();
}

function loadReceipt(){
	//retrieve data from localstorage
	let data = JSON.parse(localStorage.getItem('data'));
	let image = JSON.parse(localStorage.getItem('image'));

	//changes all receipt and modal values to the retrieved and stored values
	//Both the receipt and modal use the same values therefore the same localstorage value

	//Customer information
	$('#receiptUsername').text(data.name);
	$('#receiptAddress').text(data.address);
	$('#receiptPostcode').text(data.postcode);
	$('#receiptPhoneNum').text(data.phonenumber);
	$('#receiptEmail').text(data.email);

	//Phone Information
	$('#receiptCustType').text(data.customer);
	$('#receiptWarranty').text(data.warranty);
	$('#receiptPurchaseDate').text(data.purchasedate);
	$('#receiptRepairDate').text(data.repairdate);

	//Phone Information
	$('#receiptImei').text(data.imei);
	$('#receiptMake').text(data.make);
	$('#receiptModelnum').text(data.model);
	$('#receiptDescription').text(data.desc);

	//Purchase information 2
	$('#receiptPhoneType').text(data.phonetype);
	$('#receiptPhoneBond').text(data.phonebond);
	$('#receiptCharger').text(data.charger);
	$('#receiptChargerBond').text(data.chargerbond);
	$('#receiptBond').text(data.bond);
	$('#receiptServiceFee').text(data.service);
	$('#receiptTotalFee').text(data.total);
	$('#receiptTotalGST').text(data.totalGST);

	//Only the receipt page has an image apart from the modal view
	document.querySelector("#display-image").style.backgroundImage = `url(${image})`;
}
//-------------------------------------------------------------------

