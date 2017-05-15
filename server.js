var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var exphbs = require("express-handlebars");

var PORT = process.env.PORT || 3000;
//Initialize our express server
var app = express();
//Initialize body-parser
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
//Initialize Morgan
app.use(logger("dev"));
//Set up a public directory
app.use(express.static("public"));

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");


//Initialize routes
require("./routes/html-routes")(app);
require("./routes/api-routes")(app);

//Listen to either our environment port of on 3000
app.listen(PORT, function() {
  console.log(`App running on port: ${PORT}`);
});
