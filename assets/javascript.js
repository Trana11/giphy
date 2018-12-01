$(function() {
  populateButtons(searchArray, "searchButton", "#buttonsArea");
});

let searchArray = ["dog", "cat", "biird"];

function populateButtons(searchArray, classToAdd, areaToAddTo) {
  $(areaToAddTo).empty();
  for (var i = 0; i < searchArray.length; i++) {
    let a = $("<button>");
    a.addClass(classToAdd);
    a.attr("data-type", searchArray[i]);
    a.text(searchArray[i]);
    $(areaToAddTo).append(a);
  }
}

$(document).on("click", "searchButton", function() {
  $("#searches").empty();
  let type = $(this).data("type");
  let queryURL =
    "http://api.giphy.com/v1/gifs/search?q=" +
    type +
    "&api_key=JKGEPZBNGR3g69Q4nZUaUS6ROIDrFqtR&LIMIT=10";
  $.ajax({ url: queryURL, method: "GET" }).done(function(response) {
    for (var i = 0; i < response.data.legnth; i++) {
      let searchDiv = $("<div class='search-item'>");
      let rating = response.data[i].rating;
      let p = $("<p>").text("Rating: " + rating);
      let animated = response.data[i].images.fixed_height.url;
      let still = response.data[i].images.fixed_height.url;
      let image = $("<img>");
      image.attr("src", still);
      image.attr("data-still", still);
      image.attr("data-animated", animated);
      image.attr("data-state", "still");
      image.addClass("searchImage");
      searchDiv.append(p);
      searchDiv.append(image);
      $("#searches").append(searchDiv);
    }
  });
});

$(document).on("click", ".searchImage", function() {
  let state = $(this).data("state");
  if (state == "still") {
    $(this).attr("src", $(this).data("animated"));
    $(this).attr("data-state", "animated");
  } else {
    $(this).attr("src", $(this).data("still"));
    $(this).attr("data-state", "still");
  }
});

$("#addSearch").on("click", function() {
  let newSearch = $("input")
    .eq(0)
    .val();
  searchArray.push(newSearch);
  populateButtons(searchArray, "searchButton", "#buttonsArea");
  return false;
});
