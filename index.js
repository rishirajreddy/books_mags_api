const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const connectDB = require("./db/db");
const bookRoutes = require("./routes/book_routes");
const path = require("path");

connectDB();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json({extended: false}));
app.use("/", bookRoutes);

app.use(express.static(path.join(__dirname+'/public')))
app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname+'/public/index.html'))
})

module.exports = app;