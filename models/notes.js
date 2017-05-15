var mongoose = require("mongoose");

//create a schema class
var Schema = mongoose.Schema;

//create the note schema
var NoteSchema = new Schema({
  title: {
    type: String
  },
  body: {
    type: String
  }
});

//create note model with the NoteSchema
var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
