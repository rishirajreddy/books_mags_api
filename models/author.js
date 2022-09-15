const mongoose = require('mongoose')

const Book = mongoose.Schema({
    title: {
        type: String
    },
    isbn: {type: String},
    authors:[],
    description:{
        type:String
    }
})

const Magazine = mongoose.Schema({
    title: {
        type: String
    },
    isbn: {type: String},
    authors:[],
    publishedAt:{
        type:String
    }
})

const Author = mongoose.Schema({
    email: {
        type:String
    },
    firstname: {
        type: String
    },
    lastname:{
        type:String
    },
    books:[Book],
    magazines:[Magazine]
})



module.exports = mongoose.model('author', Author);