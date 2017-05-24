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
        //    btn.addClass("hidden");
      }
    });
  });
  $(".saveNote").on("click", function(event) {
    var btn = $(this);
    var id = btn.attr("data-id");
    var note = $(".note").val().trim();
    console.log(note);
    console.log(id);
    $.ajax({
      url: "/savenote/" + id,
      method: "POST",
      data: {
        title: "New Note",
        body: note
      }
    }).done(function(note) {
      if (note.success === true) {
        console.log(note);
        $(".modal").hide();
      }
    });
  });
});
