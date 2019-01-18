$(document).ready(function () {

    var characters = [];

    function displayInfo() {

            var character = $(this).attr("data-character");

            console.log(character)

            // making a URL to search giphy
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                character + "&api_key=ybw55h5Eew4e7xlw4qwG6Au58z42YVv5&limit=10&rating=g&rating=pg&rating=pg-13";

            //AJAX call
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                
                console.log(response);

                var gifs = response.data;

                for (var i = 0; i < gifs.length; i++) {
                    // Creating a div for the gifs to go into
                    var gifDisplay = $("<div>");
                    // Grabbing and storing the rating of the gifs
                    var rating = gifs[i].rating;
                    // Creating a place to put the rating
                    var pRating = $("<p>").text("Rating: " + rating);
                    // Creating an image tag for the gifs so I can give them properties later
                    var characterGif = $("<img>");
                    //Adding a class so I can use it for the onclick event later
                    characterGif.addClass("frodo");
                    //Giving the img tag the attribute from the response so that we can display the gif
                    characterGif.attr("src", gifs[i].images.fixed_height_still.url);
                    //Giving the image the "data-still" attribute so the gifs start not moving
                    characterGif.attr("data-still", gifs[i].images.fixed_height_still.url);
                    //Giving the image the "data-animate" attribute so that it can start moving when clikced
                    characterGif.attr("data-animate", gifs[i].images.fixed_height.url);
                    //Setting the data-state to sill upon loading
                    characterGif.attr("data-state", "still");

                    // Appending the paragraph and image to the display
                    gifDisplay.append(pRating);
                    gifDisplay.append(characterGif);
                    console.log(gifDisplay);

                    // Prepending the gifDisplay to the "#gifs" div in the HTML so that it is always first
                    $("#gifs").prepend(gifDisplay);
                }
            });
    }
    //To animate, start, and stop the gifs
    $(document).on("click", ".frodo", function (){
        console.log("hello!");
        var state = $(this).attr("data-state");

        if (state === "still"){
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
        console.log($(this))
    });

    // Display the buttons 
    function buttons() {
        //This is to stop it from displaying the same name over and over
        $("#buttons-view").empty();

        for (var i = 0; i < characters.length; i++) {
            //giving button a variable so it's easier to write over and over
            var a = $("<button>");
            a.addClass("character-btn");
            // Adding a data-attribute
            a.attr("data-character", characters[i]);
            // Providing the initial button text
            a.text(characters[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(a);
        }
    };

    $("#add-character").on("click", function (event) {
        event.preventDefault();
        // Grabs the user input from the textbox
        var character = $("#character-input").val().trim();

        // Adds to the array
        characters.push(character);
        
        // Calls buttons function 
        buttons();
        $("#character-input").val("");
        
    });

    // Adding a click event listener to all elements with a class of "character-btn"
    $(document).on("click", ".character-btn", displayInfo);

});
