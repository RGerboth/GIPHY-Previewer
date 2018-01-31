// GIPHY excercise 
// On page load:
// giphy key: kOMuttZ6thiNidL3AgPUWlCORk0sII6L
var APIKey = "kOMuttZ6thiNidL3AgPUWlCORk0sII6L";
var searchLimit = 12; //<== max 20 for giphy
var buttonList = ["Superman", "Batman", "Wonder Woman", "Aquaman"]

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
            console.log(newButton)
    }
}

function fetchImages() {
    var dataValue = $(this).attr("data-value");
    console.log(dataValue);
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + APIKey + "&q=" + dataValue + "&limit=" + searchLimit;
    console.log(queryURL);

    $.ajax({
       url: queryURL,
       method: "GET"
    }).done(function(response) {
   		console.log("response: " + response);
		$("#images").empty();
		//add new button to list, render to page
		for (i=0; i<searchLimit; i++) {
			var newDiv = $("<div>");
				newDiv.addClass("imageBox")

	    	var newImage = $("<img>");
            	newImage.addClass("image");
            	newImage.data("state", "still");
	    		// newImage.attr("src", response.data[i].images.original_still.url);
	    		newImage.attr("src", response.data[i].images.fixed_height_still.url);
	    		// newImage.data("stillImage", response.data[i].images.original_still.url);
	    		newImage.data("stillImage", response.data[i].images.fixed_height_still.url);
	    		newImage.data("animatedImage", response.data[i].images.fixed_height.url);
	    		newImage.data("rating", response.data[i].rating);

            newDiv.append("<p>Image Rated " + newImage.data("rating") + "<p>")
            newDiv.append(newImage);

            $("#images").append(newDiv);

            // newDiv.append("<p>Image Rated " + newImage.data("rating") + "<p><br>" + newImage);

           	// $("#images").append(newImage);

        console.log("Still Image: " + newImage.data("stillImage"))
        console.log("Animated Image: " + newImage.data("animatedImage"))
    	}
    });
}

displayButtons();

$("#buttons").on("click", ".btn", fetchImages);

//on click add new button
$("#add-button").on("click", function(event) {
	event.preventDefault();
	var newButtonValue = $("#button-input").val();
	if (newButtonValue !== "") {
		buttonList.push(newButtonValue);
	    $("#button-input").val("");
		displayButtons();
	}
});

$(document).on("click", ".image", function(event) {
	console.log("image clicked, current state: " + $(this).data("state"));

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

