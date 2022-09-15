// 10010100
// 1 00 1 0 1 00
str1 = "10010100";
myName = "rishiraj";
arr3 = [2,4,5,4,5,8,0];

function splitString(str) {
    let newStr = str.split("");
    let arr2 = [];
    for (let i = 0; i < 100; i++) {
        if(i == 0){
            arr2.push(newStr[i]);
        }
        if(i == 1){
            arr2.push(" ");
        }
        if(i == 2){
            arr2.push(newStr[1]);
        }
        if(i == 3){
            arr2.push(newStr[2]);
        }
        if(i == 4){
            arr2.push(" ");
        }
        if(i == 5){
            arr2.push(newStr[3]);
        }
        if(i == 6){
            arr2.push(" ");
        }
        if(i == 7){
            arr2.push(newStr[4]);
        }
        if(i == 8){
            arr2.push(" ");
        }
        if(i == 9){
            arr2.push(newStr[5])
        }
        if(i == 10){
            arr2.push(" ");
        }
        if(i == 11){
            arr2.push(newStr[6]);
        }
        if(i == 12){
            arr2.push(newStr[7]);
        }
        // arr2.push(newStr[i]);
    }
    return arr2.join("");
}

function reverseString(myName){
    let charArr = myName.split("");
    let newStr = "";
    for (let i = charArr.length - 1; i >= 0; i--) {
        newStr += charArr[i];
    }
    return newStr
}

function sortingArr(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if(arr[j] > arr[j+1]){
                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }            
        }        
    }
    return arr;
}

function selectionSort(arr) {
    let l = arr.length - 1;
    for (let i = 0; i < arr.length; i++) {
        let minimum = i;
        for (let j = i+1; j < arr.length; j++) {
            if(arr[j] < arr[minimum]){
                minimum = j;
            }
        }
        if(minimum != i)
        // let temp = arr[i];
        arr[i] = arr[l-i];
        arr[l-i] = temp;
    }
    return arr;
}
console.log(selectionSort(arr3));