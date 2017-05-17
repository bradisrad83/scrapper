var mongoose = require("mongoose");
var Note = require("../models/Note");
var Article = require("../models/Article");

mongoose.Promise = Promise;

mongoose.connect("mongodb://heroku_xxkwmxvg:10jkt346l7ltipb1ptg0e0mlc0@ds143141.mlab.com:43141/heroku_xxkwmxvg");
var db = mongoose.connection;
// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

db.myModels = {
  Note: Note,
  Article: Article
};
//console.log(db.myModels.Article.save());
//console.log(db.myModels.Note);



module.exports = db;
