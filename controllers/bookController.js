const {Book,Author} = require("../model/mode")

const bookController= {
    //add a book
    addABook:async(req,res)=> {
        try{
            const newBook = new Book(req.body);
            const saveBook = await newBook.save();
            if(req.body.author) {
                const author = Author.findById({_id: req.body.author})
                await author.updateOne({$push: {books:saveBook._id}})
            }
        }catch(err){
            res.status(500).json(err);
        }
    },
    //get all book
    getAllBooks:async(req,res)=> {
        try{
            const allBooks = await Book.find();
            res.status(200).json(allBooks);
        }catch(err){
            res.status(500).json(err);
        }
    },

    //get a book
    getABook:async(req,res)=> {
        try{
            const book = await Book.findById(req.params.id).populate("author");
            res.status(200).json(book);
        }catch(err){
            res.status(500).json(err);
        }
    },
    updateBook:async(req,res) =>{
        try{
            const book = await Book.findById(req.params.id);
            await book.updateOne({$set: req.body});
            res.status(200).json("Updated successfully");
        }catch (err){
            res.status(500).json(err);
        }
    },
    deleteBook: async(req,res)=> {
        try{
            await Author.updateMany(
            {book:req.params.id},
            {$pull:{books:req.params.id}})
            await Book.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete successfully");
        }catch(err){
            res.status(500).json(err);
        }
    }
};

module.exports = bookController;