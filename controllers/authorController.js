const {Author,Book} = require("../model/mode");
const { deleteBook } = require("./bookController");

const authorController = {
    //add author
    addAuthor:async(req,res)=> {
       try{
        const newAuthor = new Author(req.body);
        const saveAuthor = await newAuthor.save();
        res.status(200).json(saveAuthor);
       }catch(err) { 
        res.status(500).json(err);
       }
    },


    //get all author
    getAdllAuthor: async(req,res) => {
        try {
            const author = await Author.find()
            res.status(200).json(author);
        }catch(err){
            res.status(500).json(err);
        }
    },
    //get an author
    getAnAuthor : async(req,res)=> {
        try{
            const author = await Author.findById(req.params.id).populate("books");
            res.status(200).json(author);
        }catch(err){
            res.status(500).json(err);
        }
    },
    updateAuthor:async(req,res)=> {
        try{
            const author = await Author.findById(req.params.id);
            await author.updateOne({$Set:req.body});
            res.status(200).json("update successfully!");
        }catch (err){
            res.status(500).json(err);
        }
    },
    deleteAuthor:async(req,res) => {
        try{
            await Book.updateMany({author:req.params.id},{author:null})
            await Author.findByIdAndDelete(req.params.id);
            res.status(200).json("deleted successfully");
            
        }catch (err){
            res.status(500).json(err);
        }
    },
};
module.exports = authorController;