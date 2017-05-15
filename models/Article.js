var mongoose = require("mongoose");

//create a schema class
var Schema = mongoose.Schema;

//create article schema
var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});
//create article model with articleschema
var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
