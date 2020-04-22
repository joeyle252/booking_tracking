
const Book = require('../models/book');
// const Genre = requires('../models/genre');
// const Author = require('../models/author');

exports.createBook = async function (req,res){
    const {title, genres, author} = req.body;

    const book = new Book({
        title: title,
        genres: genres,
        author: author
    });
    await book.save();
    
    return res.json({status: "ok", data: book})
}




// const authorObj = await Author.findId(author); 
// const genreArray = genres.map(async el=>await Genre.findId(el)); //genreArray now is just a array of Promise
// const a = await Promise.all(genreArray); // this step will get all the array of array promise


