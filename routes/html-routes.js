var db = require("../config/connection");
var Article = require("../models/Article");
//console.log(db);

module.exports = function(app) {
  //Route to load our main page
  app.get("/", function(req, res) {
    res.render("home");
  });

  app.get("/saved", function(req, res) {
    Article.find({
      saved: true
    }).populate("articles").exec(function(err, doc) {
      if (err) {
        console.log(err);
      } else {
        res.render("saved", {
          docs: doc
        });
      }
    });
  });

  //route to populate
  app.get("/populate", function(req, res) {
    Article.find({}).populate("articles").exec(function(err, doc) {
      if (err) {
        console.log(err);
      } else {
        //console.log(doc);
        res.render("index", {
          docs: doc
        });
      }
    });
  });
};
