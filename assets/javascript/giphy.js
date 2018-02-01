// GIPHY previewer js - RPG
//
// giphy key: kOMuttZ6thiNidL3AgPUWlCORk0sII6L
//
var APIKey = "kOMuttZ6thiNidL3AgPUWlCORk0sII6L";
var searchLimit = 12; //<== NOTE: max 20 for giphy
var buttonList = ["Superman", "Batman", "Wonder Woman", "Aquaman", "The Flash", "Hulk", "Ant Man"]

function displayButtons() {
	//clear previous buttons
	$("#buttons").empty();
	//add new button to list, render to page
	for (i=0; i<buttonList.length; i++) {
    var newButton = $("<button>");
    newButton.attr("type", "button")
    newButton.addClass("btn btn-primary");
    newButton.attr("data-value", buttonList[i]);
    newButton.text(buttonList[i]);
    $("#buttons").append(newButton);
  }
}

//fetch images from GIPHY
function fetchImages() {
//fetch from GIPHY, search based on button data-value
  var dataValue = $(this).attr("data-value");
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + APIKey + "&q=" + dataValue + "&limit=" + searchLimit;
  $.ajax({
    url: queryURL,
    method: "GET"
    }).done(function(response) {
  		$("#images").empty();
  		//build new div for each image, setting initial state of each img to "still" and add data values.
      //append <p> (to display "rating") then append built img then render to html
  		for (i=0; i<searchLimit; i++) {
  			var newDiv = $("<div>");
  			newDiv.addClass("imageBox")
       	var newImage = $("<img>");
       	newImage.addClass("image");
       	newImage.data("state", "still");
  	  	newImage.attr("src", response.data[i].images.fixed_height_still.url);
  	  	newImage.data("stillImage", response.data[i].images.fixed_height_still.url);
  	  	newImage.data("animatedImage", response.data[i].images.fixed_height.url);
  	  	newImage.data("rating", response.data[i].rating);
        newDiv.append("<p>Image Rated " + newImage.data("rating") + "<p>")
        newDiv.append(newImage);
        $("#images").append(newDiv);
     	}
    });
}

//on startup, display pre-set buttons
displayButtons();

//on click .btn (button), fetch the images with search term of button clicked
$("#buttons").on("click", ".btn", fetchImages);

//on click #add-button, add a new button
$("#add-button").on("click", function(event) {
	event.preventDefault();
	var newButtonValue = $("#button-input").val();
	if (newButtonValue !== "") {
		buttonList.push(newButtonValue);
    $("#button-input").val("");
		displayButtons();
	}
});

//on click .image, switch between still and animated images
$(document).on("click", ".image", function(event) {
	event.preventDefault();
    var state = $(this).data("state");
    if (state === "still") {
      $(this).data("state", "animate");
      $(this).attr("src", $(this).data("animatedImage"));
    } else {      
      $(this).data("state", "still");
      $(this).attr("src", $(this).data("stillImage"));
    }
});

// have a nice day - RPG