//VARIABLE THAT SAVES ALL BUTTONS AND SEARCH TERM FOR LATER IN ARRAY
var displayedButtons = ["Spiderman", "Ironman", "Hulk", "Wonderwoman", "Superman", "Black Panther", "Captain Marvel", "Aquaman"];
//CREATES BUTTONS FROM ARRAY IN VARIABLE DISPLAYEDBUTTONS
function renderButtons(){ 
        $("#display-buttons").empty();
    
        for (var i = 0; i < displayedButtons.length; i++){
    
            var newButton = $("<button>") 
            newButton.attr("class", "button");
            newButton.attr("id", "input")  
            newButton.attr("data-name", displayedButtons[i]); 
            newButton.text(displayedButtons[i]); 
            $("#display-buttons").append(newButton); 
        }
}
renderButtons()
    
function displayImage() {
        $("#display-images").empty();
        // In this case, the "this" keyword refers to the button that was clicked
        var person = $(this).attr("data-name");
        console.log(person)
  
        // Constructing a URL to search Giphy for the name of the person who said the quote
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          person + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
  
        // Performing our AJAX GET request
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          // After the data comes back from the API
          .then(function(response) {
            // Storing an array of results in the results variable
            var results = response.data;
  
            // Looping over every result item
            for (var i = 0; i < results.length; i++) {
  
              
                // Creating a div for the gif
                var gifDiv = $("<div>");
  
                // Creating an image tag
                var personImage = $("<img>");
  
                // Giving the image tag an src attribute of a proprty pulled off the
                // result item
                personImage.attr("src", results[i].images.original_still.url);
                personImage.attr("data-still", results[i].images.original_still.url);
                personImage.attr("data-animate", results[i].images.original.url);
                personImage.attr("data-state", "still");
                personImage.attr("class", "gif");
  
                // Appending the paragraph and personImage we created to the "gifDiv" div we created
                //gifDiv.append(p);
                gifDiv.append(personImage);
  
                // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                $("#display-images").append(gifDiv);
              //}
            }
          });
};
$("#newButton").on("click", function(){
        event.preventDefault();
        var input = $("#user-input").val().trim();
        form.reset();
        displayedButtons.push(input);
                
        renderButtons();
})
function imageChangeState() {          
        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");
        if(state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        }
        else if(state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }   
}
$(document).on("click", "#input", displayImage);
$(document).on("click", ".gif", imageChangeState);
