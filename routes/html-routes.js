var db = require("../config/connection");
var Article = require("../models/Article");
//console.log(db);

module.exports = function(app) {
  //when homepage is loaded up we pull all results from our database and put them
  //   into our handlebars page
  app.get("/", function(req, res) {
    Article.find({}).populate("articles").exec(function(err, doc) {
      if (err) {
        console.log(err);
      } else {
        console.log(doc);
        res.render("index", doc);
      }
    });
  });
};
