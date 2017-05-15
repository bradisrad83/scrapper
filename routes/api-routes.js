var request = require("request");
var cheerio = require("cheerio");
var mongoose = require("mongoose");


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
      });
      console.log(results);
    });
    res.send("SCRAPING COMPLETE");
  });
};
