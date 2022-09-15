const Author = require("../models/author");
const ds = require("node-dataset");
const path = require('path')

const authorsFile = path.resolve(__dirname, "../files/authors.csv");
const booksFile = path.resolve(__dirname, "../files/books.csv");
const magazinesFile = path.resolve(__dirname, "../files/magazines.csv");

exports.addAuthors = async(req,res) => {
    const dataset = new ds.DataSet().fromFile(authorsFile, "csv");
    let authorsData = (await dataset).data;
    // let authorsArr = [];
            for (let i = 0; i < authorsData.length; i++) {
                let currData = authorsData[i].toString().split(";");
                let newData = new Author({
                    email: currData[0],
                    firstname: currData[1],
                    lastname: currData[2]
                }
                )
                newData.save()
            }
        res.status(200).send("Data Saved Succcessfully")
        console.log("Data Saved");    
}

exports.addBooks = async(req,res) => {
    const dataset2 = new ds.DataSet().fromFile(booksFile, "csv");
    let booksData = (await dataset2).data;
    for (let i = 0; i < booksData.length; i++) {
        let currData = booksData[i].toString().split(";");
        let obj = {
            title: currData[0],
            isbn: currData[1],
            authors: currData[2].toString().split(","),
            description: currData[3]
        }
        
        obj.authors.map((author) => {
            Author.updateOne(
                {email: author}, 
                {
                    $addToSet: {
                        books: obj
                    }
                },
                (err, result)=> {
                    if(err){
                        console.log(err);
                    }
                }    
            )
        })
    }
    res.status(200).send("Books Updated Successfully");
}

exports.addMagazines  = async(req,res) => {
    const dataset = new ds.DataSet().fromFile(magazinesFile,"csv");
    let magazinesData = (await dataset).data;
    for (let i = 0; i < magazinesData.length; i++) {
        let currData = magazinesData[i].toString().split(";");
        let obj = {
            title: currData[0],
            isbn: currData[1],
            authors: currData[2].toString().split(","),
            publishedAt: currData[3]
        }
        obj.authors.map((author) => {
            Author.updateOne(
                {email: author}, 
                {
                    $addToSet: {
                        magazines: obj
                    }
                },
                (err, result)=> {
                    if(err){
                        console.log(err);
                    }
                }    
            )
        })
    }
    res.status(200).send("Mags Updates Successfullt");
}