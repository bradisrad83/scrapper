$(document).ready(function() {
  //API AJAX call when save button clicked
  $(".save").on("click", function(event) {
    var btn = $(this);
    var id = btn.attr("data-id");
    $.ajax({
      url: "/" + id,
      method: "PUT"
    }).done(function(data) {
      if (data.success === true) {
        console.log("Saved Successfully");
        btn.addClass("hidden");
      }
    });
  });
});
