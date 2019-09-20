$(document).ready(function() {
  var gifs = ["cat", "bear", "plane", "cows", "cars"];

  function displayButtons() {
    $(".buttons").empty();
    for (var i = 0; i < gifs.length; i++) {
      var charButton = $("<button>");
      charButton.addClass("btn-warning");
      charButton.attr("data-person", gifs[i]);
      charButton.text(gifs[i]);
      $(".buttons").append(charButton);
    }
  }

  $("#add-gif").on("click", function(event) {
    event.preventDefault();
    var gifSearch = $("#gif-input")
      .val()
      .trim();
    gifs.push(gifSearch);
    displayButtons();
    loadData();
  });

  function loadData() {
    $("button").on("click", function() {
      $(".display").empty();

      var name = $(this).attr("data-person");

      var queryURL =
        "https://api.giphy.com/v1/gifs/search?q=" +
        name +
        "&api_key=mAuau4GXKo9SjuYYPFLo7OsO5KfWXHAb&limit=10"; 

      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
        console.log(response);

        var results = response.data;

        for (var k = 0; k < results.length; k++) {
          var gifDiv = $("<div class='item'>");
          var rating = results[k].rating;
          var p = $("<p>").text("Rating: " + rating);
          var gifImage = $("<img>");

          gifImage.addClass("gif");
          gifImage.attr("src", results[k].images.fixed_height_still.url);
          gifImage.attr("data-state", "still");
          gifImage.attr("data-still", results[k].images.fixed_height_still.url);
          gifImage.attr("data-animate", results[k].images.fixed_height.url);

          gifDiv.append(p);
          gifDiv.append(gifImage);

          $(".display").prepend(gifDiv);
        }
      });
    });
  }

  $(".display").on("click", ".gif", function() {
    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  displayButtons();
  loadData();
});
