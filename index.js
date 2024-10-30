const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const authorRoute = require("./routes/author");
const bookRoute = require("./routes/book");

dotenv.config();
//connect database
mongoose.connect("mongodb+srv://buicongthanh861:123@cluster0.stxcn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",console.log("Connected to MongoDB"));


app.use(bodyParser.json({limit:"50mb"}));
app.use(cors());
app.use(morgan("common"));


//Route
app.use("/v1/author",authorRoute);
app.use("/v1/book",bookRoute);

app.listen(8000, ()=> {
    console.log("Server is runing ...");
});