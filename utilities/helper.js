const fastcsv = require('fast-csv');
const fs = require("fs");
// const ws = fs.createWriteStream("../files/output_new.csv");


function sortArray(arr) {
    let sorted = arr.sort((a, b) => {
        let fa = a.title.toLowerCase(),
            fb = b.title.toLowerCase();
    
        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    });
    return sorted;
}

function removeDuplicates(arr) {
    let removedDupBooks = [];

    let titleArr = arr.filter(emp => {
        const isDup = removedDupBooks.includes(emp.title);
    
        if (!isDup) {
            removedDupBooks.push(emp.title);
    
        return true;
        }
    
        return false;
    })
    return titleArr;
}

function getCSVFile(data,ws) {
    return fastcsv
    .write(data, {headers: true})
    .on('finish', function(){
        console.log("CSV file created successfully");
    })
    .pipe(ws);
}

module.exports = {
    sortArray: sortArray, 
    removeDuplicates: removeDuplicates,
    getCSVFile: getCSVFile
};
