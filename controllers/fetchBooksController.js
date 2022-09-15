const Author = require("../models/author");
const fs = require("fs");
const {sortArray, removeDuplicates, getCSVFile} = require("../utilities/helper");
const author = require("../models/author");

exports.getAllBooksMags = async(req,res) => {
    var booksArr = [];
    var magsArr = [];

    Author.find()
        .then((result) => {
            result.map((book) => {
                booksArr.push(book.books);
                magsArr.push(book.magazines);
            })
            console.log(booksArr.flat().flatMap(obj => obj.authors));
            // console.log(booksArr.length);
            res.send({books:booksArr, mags: magsArr});
        })
}

exports.getBooksByIsbn = async(req,res) => {
    let bookByIsbn;

    Author.findOne(
        {"books.isbn": req.params.isbn})
        .then((result) => {
            if(!result){
                return res.status(404).json({msg:"No books with matching ISBN no. found"});
            }else {
                for (const book of result.books) {
                    if(book.isbn === req.params.isbn){
                       return res.status(200).send(book);
                    }
                }
            }
        })
        .catch(err => console.log(err));
}

exports.getMagsByIsbn = async(req,res) => {
    let magByIsbn;

    Author.findOne(
        {"magazines.isbn": req.params.isbn})
        .then((result) => {
            if(!result){
                res.status(404).send({msg:"No magazines with matching ISBN no. found"});
            }else{
                for (const mag of result.magazines) {
                    if(mag.isbn === req.params.isbn){
                        res.status(200).send(mag);
                    }
                }
             }
        })
        .catch(err => console.log(err));
}

exports.getBooksMagsByEmail = async(req,res)=> {
    let booksByEmail = [];
    let magsByEmail = [];

    Author.findOne(
        {email: req.body.email})
            .then((result) => {
                booksByEmail.push(result.books);
                magsByEmail.push(result.magazines);
                res.status(200).send({books: booksByEmail, mags: magsByEmail});
            })
            .catch(err => {
                res.status(500).send(err.message);
                console.log(err);
            })
}

exports.fetchBooksMagsSortByTitle = async(req,res) => {
    var booksArr = [];
    var magsArr = [];

    Author.find()
        .then((result) => {
            result.map((book) => {
                booksArr.push(book.books);
                magsArr.push(book.magazines);
            })
            let sortedBooks = booksArr.flat();
            let sortedMags = magsArr.flat();
            let newSortedBooks = sortArray(sortedBooks);
            let newSortedMags = sortArray(sortedMags);
            
            const titleBooks = removeDuplicates(newSortedBooks); 
            const titleMags = removeDuplicates(newSortedMags); 
            
            console.log("Success");
            res.send({books:titleBooks, mags: titleMags});
        })   
}

exports.addNewAuthor = async(req,res) => {
    const {email, firstname, lastname} = req.body;

    const newBook = new Author({
        email: email,
        firstname: firstname,
        lastname: lastname
    })

    newBook.save()
        .then((response) => {
            res.status(200).send({msg:"Author Added", author: response})
        })
        .catch(err => {
            console.log(err);
        })
}

exports.addNewBook = async(req,res) => {
    const {email, title, isbn, authors, description} = req.body;
    
    const newBook = [
        {
            title:title,
            isbn: isbn,
            authors:authors,
            description:description
        }
    ]

    Author.updateOne(
        {email: email},
        {
            $addToSet: {
                "books": {
                    title: title,
                    isbn: isbn,
                    authors:authors,
                    description:description
                }
            }
        },
        (err, result) => {
            if(err){
                console.log(err);
                res.send(err.message)
            }else {
                const ws = fs.createWriteStream(`./files/newly_added/output_new_book${isbn}.csv`);
                getCSVFile(newBook, ws)
                res.status(200).send("Book saved")
                console.log(result);
            }
        }
    )
}

exports.addNewMag = async(req,res) => {
    const {email, title, isbn, authors, publishedAt} = req.body;

    const newMag = [{
        title: title,
        isbn:isbn,
        authors:authors,
        publishedAt:publishedAt
    }]

    Author.updateOne(
        {email: email},
        {
            $addToSet: {
                "magazines": {
                    title: title,
                    isbn: isbn,
                    authors:authors,
                    publishedAt:publishedAt
                }
            }
        },
        (err, result) => {
            if(err){
                console.log(err);
                res.send(err.message)
            }else {
                const ws = fs.createWriteStream(`./files/newly_added/output_new_mag${isbn}.csv`);
                getCSVFile(newMag, ws)
                res.status(200).send("Magazine saved")
                console.log(result);
            }
        }
    )
}


