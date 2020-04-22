
const express = require('express');
const logger = require('morgan');
const app = express();

const mongoose = require("mongoose");
require("dotenv").config();

// const Author = require('./src/models/authors');
const {createAuthor, updateAuthor, deleteAuthor, readAuthor} = require("./src/controllers/authorControllers");
const {createGenre, readGenres} = require("./src/controllers/genreControllers");


mongoose.connect(process.env.BD_LOCAL, {
  // some options to deal with deprecated warning, you don't have to worry about them.
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})
  .then(() => console.log("connected to database"));

  const router = express.Router();
  
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(router);


app.use(logger('dev'));
app.use(express.json());




router.get('/', (req,res)=>{
  return res.status(200).json({status: "ok", data:[]})
})

router.route('/authors')
.get(readAuthor)
.post(createAuthor)

router.delete("/authors/:id", deleteAuthor);
router.put("/authors/:id", updateAuthor);

router.route('/genres')
.post(createGenre)
.get(readGenres)

router.route('/books')
.post(createBook)


module.exports = app;


app.listen(process.env.PORT,()=>{
  console.log("app is rungning on port",process.env.PORT )
})
