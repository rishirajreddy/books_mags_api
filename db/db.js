const mongoose = require('mongoose');

const url = "mongodb+srv://mrrobot:mrrobot@empmngmt.cs734kp.mongodb.net/books_db?retryWrites=true&w=majority";

const connectDB = () => {
    mongoose.connect(url,{
        useNewUrlParser : true, useUnifiedTopology: true
    });
        console.log("Connected to mongodb")
}

module.exports = connectDB;
