var request = require("request");
var cheerio = require("cheerio");
var db = require("../config/connection");
//console.log(db);

module.exports = function(app) {
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

        entry.save(function(err, doc){
          if(err) {
            console.log(err);
          }else {
            console.log(doc);
          }
        });
      });
      console.log(results);
    });
    res.send("SCRAPING COMPLETE");
  });
};
