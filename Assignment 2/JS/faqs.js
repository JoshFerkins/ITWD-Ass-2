//This is used to get and post the JSON question and answer informatoin from the online JSON file with XML

let proxy = 'https://cors-anywhere.herokuapp.com/';//CORS proxy
let url = 'http://danieldangs.com/itwd6408/json/faqs.json'; //online JSON file location

$.getJSON(proxy + url, function(data){  //Uses the proxy + file as a url JSON Get request
		$.each(data, function(i, question) { //For each JSON data retrieved
		//Creates html for the data retrieved
		let content =`
		<div class="border border-gray question-box">
			<h4>${question.question}</h4>
			<p>${question.answer}</p>
		</div>
		`;
		//Appending this to the div will create new html depending on how many values are retrieved
		$('#questions').append(content);
		});
	}
);

//This is used for filtering retrieved questions and answers
$('#faqsSearch').on('keyup', function() {
	let keywords = $(this).val().toLowerCase();
	
	//Filters the question data based on comparison with the keywords variables gotten from search input
	$('#questions div').filter(function() {
		$(this).toggle($(this).html().toLowerCase().indexOf(keywords) > -1);
	});
});