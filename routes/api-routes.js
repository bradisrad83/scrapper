var request = require("request");
var cheerio = require("cheerio");
var db = require("../config/connection");
//console.log(db);

module.exports = function(app) {
  app.post("/savenote/:id", function(req, res) {
    console.log(req.body);
    var newNote = new db.myModels.Note(req.body);

    newNote.save(function(err, doc) {
      if (err) {
        console.log(err);
      } else {
        db.myModels.Article.findOneAndUpdate({
            "_id": req.params.id
          }, {
            "note": doc._id
          })
          .exec(function(error, doc) {
            if (error) {
              console.log(error);
            } else {
              res.status(200).json({
                success: true,
                doc: doc
              });
            }
          });
      }
    });
  });


  //Route for saving articles
  app.put("/:id", function(req, res) {
    var savedId = req.params.id;
    db.myModels.Article.findOneAndUpdate({
      "_id": savedId
    }, {
      "saved": true
    }, function(err, doc) {
      if (err) {
        console.log(err);
        return res.status(500).end();
      }
      res.status(200).json({
        success: true
      });
    });

  });
  //GET request to scrape the l4lm website
  app.get("/scrape", function(req, res) {
    //grab the body of the html with request
    request("http://liveforlivemusic.com/", function(error, response, html) {
      var $ = cheerio.load(html);
      //console.log($);
      var results = [];
      $("h3").each(function(i, element) {
        //save results to an object
        var result = {};
        result.title = $(this).children("a").text().trim();
        result.link = $(this).children("a").attr("href");
        //push results into results
        results.push(result);

        var entry = new db.myModels.Article(result);

        entry.save(function(err, doc) {
          if (err) {
            console.log(err);
          } else {
            //console.log(doc);
          }
        });
      });
      //console.log(results);
      res.redirect("/populate");
    });
  });
};
