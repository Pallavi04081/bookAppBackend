const mongoose = require('mongoose')

const booksData = new mongoose.Schema ({  
     title:{
        type:String,
        required:true
     },
     ISBN:{
        type:String,
     },
     Author:{
        type:String
     },
     Describtion:{
        type:String,
     },
     publishedDate:{
        type:String
     },
     publisher:{
        type:String
     },
     user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserRegistation"
     }
})

const BooksData = mongoose.model("BooksrData",booksData)

module.exports = BooksData;