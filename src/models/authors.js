const mongoose = require("mongoose");

// create schema

const authorSchema = mongoose.Schema({
    type: String,
    required: [true, "author name is required"],
    trim: true,

})

const Author = mongoose.model("Author",authorSchema);


module.exports = Author;