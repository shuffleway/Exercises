//accepts an array and returns true if the array 
//contains at least one odd number, otherwise it returns false.
function hasOddNumber(arr){
    return arr.some(function(n){
        return n % 2 !== 0;
    })
}
hasOddNumber([1,2,2,2,2,2,4]) // true
hasOddNumber([2,2,2,2,2,4]) // false

//accepts a number and returns true if that number 
//contains at least one zero. Otherwise, 
//the function should return false
function hasAZero(num){
    let arr = num.toString().split('');
    return arr.some(function(n){
        return n === '0';
    })
}
hasAZero(33321232131012) // true
hasAZero(1212121) // false

//accepts an array and returns true if every single 
//number in the array is odd.
function hasOnlyOddNumbers(arr){
    return arr.every(function(n){
        return n % 2 !== 0;
    })
}
hasOnlyOddNumbers([1,3,5,7]) // true
hasOnlyOddNumbers([1,2,3,5,7]) // false

//accepts an array and returns true if there are no duplicate values
function hasNoDuplicates(arr){
    return arr.every(function(n, i){
       return  arr.indexOf(n) === i++;
    })
}

hasNoDuplicates([1,2,3,1]) // false
hasNoDuplicates([1,2,3]) // true

let arr = [
    {title: "Instructor", first: 'Elie', last:"Schoppik"},
    {title: "Instructor", first: 'Tim', last:"Garcia", isCatOwner: true},
    {title: "Instructor", first: 'Matt', last:"Lane"},
    {title: "Instructor", first: 'Colt', last:"Steele", isCatOwner: true}
  ]

  //accepts an array of objects and a key, and returns true 
  //if every single object in the array contains that key. 
  //Otherwise it should return false.
  function hasCertainKey(arr, key){
    return arr.every(function(n){
        return key in n;
    })
  }
  hasNoDuplicates([1,2,3,1]) // false
  hasNoDuplicates([1,2,3]) // true

  //This function accepts an array of objects and a key,
  // and a value, and returns true if every single object
  // in the array contains that value for the specific key. 
  //Otherwise it should return false.
  function hasCertainValue(arr, key, val){
    return arr.every(function(n){
        return n[key] === val;
    })
  }
  hasCertainKey(arr,'first') // true
  hasCertainKey(arr,'isCatOwner') // false