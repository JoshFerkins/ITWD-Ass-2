/*[[=====================================================]]*/

/* <***> DEMO SLIDES :: ADVANCED JAVASCRIPT <***> */

/*[[=====================================================]]*/

let r = document.querySelector(":root")

function hide1() {
  $("#demo-1").hide("slow");
  $("#demo-1-button").css({"background-color": "" , "color": ""});
}
function hide2() {
  $("#demo-2").hide("slow");
  $("#demo-2-button").css({"background-color": "" , "color": ""});
}
function hide3() {
  $("#demo-3").hide("slow");
  $("#demo-3-button").css({"background-color": "" , "color": ""});
}
function hide4() {
  $("#demo-4").hide("slow");
  $("#demo-4-button").css({"background-color": "" , "color": ""});
}
function hide5() {
  $("#demo-5").hide("slow");
  $("#demo-5-button").css({"background-color": "" , "color": ""});
}

$("#demo-1-button").click(function () {
	//Show elements
	$("#demo-1").show("slow");
	$("#demo-1-button").css({"background-color": "#FFC000" , "color": "black"});
	//Hide these elements
	hide2();
	hide3();
	hide4();
	hide5();
});

$("#demo-2-button").click(function () {
//Show elements
	$("#demo-2").show("slow");
	$("#demo-2-button").css({"background-color": "#FFC000" , "color": "black"});
	//Hide these elements
	hide1();
	hide3();
	hide4();
	hide5();
});

$("#demo-3-button").click(function () {
//Show elements
	$("#demo-3").show("slow");
	$("#demo-3-button").css({"background-color": "#FFC000" , "color": "black"});
	//Hide these elements
	hide1();
	hide2();
	hide4();
	hide5();
});
$("#demo-4-button").click(function () {
//Show elements
	$("#demo-4").show("slow");
	$("#demo-4-button").css({"background-color": "#FFC000" , "color": "black"});
	//Hide these elements
	hide1();
	hide2();
	hide3();
	hide5();
});
$("#demo-5-button").click(function () {
//Show elements
	$("#demo-5").show("slow");
	$("#demo-5-button").css({"background-color": "#FFC000" , "color": "black"});
	//Hide these elements
	hide1();
	hide2();
	hide3();
	hide4();
});

/* << DEMO 1 :: File Upload >> */

const image_input = document.querySelector("#image-input");

image_input.addEventListener("change", function() {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const uploaded_image = reader.result;
    document.querySelector("#display-image").style.backgroundImage = `url(${uploaded_image})`;
  });
  reader.readAsDataURL(this.files[0]);
});

/* << DEMO 2 :: Draggable >> */

//Define a container as being draggable; creates a draggable object
$(".box" ).draggable({
  //Modifies the draggable variables
  scope: 'demoBox',
  revertDuration: 100,
  start: function( event, ui ) {
    $( ".box" ).draggable( "option", "revert", true );
    $('.result').html('-');
  }
});

//Defines an area as accepting draggable objects
$(".drag-area" ).droppable({
  //Modifies the draggable variables
   scope: 'demoBox',
   //When the object is dropped on the container
   drop: function( event, ui ) {
     //Finds the container that was interacted with and inits it a variable
     let area = $(this).find(".drop-area").html();
     //init a variable based on the object dropped
     let box = $(ui.draggable).html();     
     //Change draggable object draggable attributes
     $( ".box" ).draggable( "option", "revert", false );
     
     //Append the object as a static objectin the drag area
     $('.result').html("[Action] <b>" + box + "</b>" +
                       " dropped on " + 
                       "<b>" + area + "</b>");    
     $(ui.draggable).detach().css({top: 0,left: 0}).appendTo(this);
   }
})

/* << DEMO 3 :: Map >> */

//Creates a tooltip that apears and displays the address from data-tooltip when hovered over

//Creates an instance of the empty div of .map-tooltip 
var tooltip = document.querySelector('.map-tooltip');

//Create a for loop which runs if the querySelector index is present for path.NZ-map
[].forEach.call(document.querySelectorAll('path.NZ-map'), function(item) {
  //Creates an event listening to when the mouse hovers over the defined area
  item.addEventListener('mouseenter', function() {
    //creates a variable to the path
  	var sel = this,
    		pos = sel.getBoundingClientRect()
    
    //Change the css display of the tooltip to flex
    tooltip.style.display = 'flex';
    //Change the location in the tooltip
    let name = item.getAttribute('name');
    //change the addres in the tooltip
    let address = item.getAttribute('data-tooltip');
    //If there is no address
    if (address == null) {
      let address = "No Stores";
      let block = name.concat('<br>',address);
      tooltip.innerHTML = block;
    } else { //If there is an address value
      let block = name.concat('<br>',address);
      tooltip.innerHTML = block;
    }
    //Create another event listening to when the mouse moves over the location
    item.addEventListener('mousemove', function(e) {
      //This changes the tooltip location depending on the location of the mouse when it moves, the mouse must be over the location
      tooltip.style.top = e.clientY + 'px';
      tooltip.style.left = e.clientX + 'px';
    });
  });
  //Create another event listening to when the mouse leaves the defined path location
  item.addEventListener('mouseleave', function(){
    //Hides the tooltip
  	tooltip.style.display = 'none';
  });
});










