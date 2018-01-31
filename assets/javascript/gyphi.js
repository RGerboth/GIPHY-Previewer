// GIPHY excercise 
//Pseudo Code
//
//On page load:
//set variables
// giphy key: kOMuttZ6thiNidL3AgPUWlCORk0sII6L
var APIKey = "kOMuttZ6thiNidL3AgPUWlCORk0sII6L";
var buttonList = ["Superman", "Batman", "Wonder Woman", "Auquman"]
		//is image playing or still
		//store animate url
		//store still url
		//*** using .data attribute to store these values for each image***
	//funciton displayButtons
function displayButtons() {
	//clear previous buttons
	$("#buttons").empty();
	//add new button to list, render to page
	for (i=0; i<buttonList.length; i++) {
	    var newButton = $("<button>");
            newButton.addClass("button");
            newButton.attr("data-value", buttonList[i]);
            newButton.text(buttonList[i]);
            $("#buttons").append(newButton);
            console.log(newButton)
    }
}

function fetchImages() {
    var dataValue = $(this).attr("data-value");
    console.log(dataValue);
    var queryURL = "https://api.giphy.com/vl/gifs/search?api_key:" + APIKey + "&q:" + dataValue + "&limit:10";
    console.log(queryURL);
        // Creates AJAX call for the specific movie button being clicked
    $.ajax({
       url: queryURL,
       method: "GET"
    }).done(function(response) {
       console.log(response);
	});
}

displayButtons();

$("#buttons").on("click", ".button", fetchImages);

//on click add new button
$("#add-button").on("click", function(event) {
	event.preventDefault();
	var newButtonValue = $("#button-input").val();
	console.log("New Button: " + newButtonValue)
	buttonList.push(newButtonValue);
	console.log("All buttons: " + buttonList.toString());
    $("#button-input").val("");
	displayButtons();
});

//https://www.gyphy.com/vl/gifs/search?api_key=YOURKEY&q="this is where we put attr of button"
		//.done

	//function: on button click
		//prevent default
		//grab attribute of the button (buttonTitle) and store in variable
		//clear all images from page (.empty)
		//Ajax call to fetch image from GIPHY
			//method | "get"
			//url | "https://www.gyphy.com/vl/gifs/search?api_key=YOURKEY&q="this is where we put attr of button"
		//.done
			//loop through the data to get each image we need
				//create a jQuery div 
				//create a jQuery img
					//set scr attr of jQuery image to be data[i].images."some still image"
					//add data-state attr to jQuery img = "still"
					//*** add data-stillURL to jQuery img = "resposne.data[i]images.original_still.url ***"
					//*** add data-animatedURL to jQuery img = response.data[i].images.original.url ***
					//create a jQuery <p>
					//put the rating from GIPHY resonse into paragraph 
					//response.data[i].Rating
				//append jQuery image to jQuery div
				//append jQuery paragraph to jQuery div
				//append jQuery div to page (container?)

		//onClick of image div
			//set variable equal to imaged clicked data-state attr
			//if state = still, then display animated
				//set scr attr of imageClicked to be data-animatedURL of imageClicked
				//set data-state attr of imageClicked to 'animated'
			//else set scr attr of iamgeClicked to the data-stillURL of imageClicked

