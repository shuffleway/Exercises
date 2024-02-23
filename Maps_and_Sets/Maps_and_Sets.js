//1. What does the following code return?
new Set([1,1,2,2,3,4]); //{1, 2, 3, 4}

//2. What does the following code return?
[...new Set("referee")].join("") //'ref'

//3. What does the Map m look like after running the following code?
let m = new Map();
m.set([1,2,3], true); //{Array(3) => true, Array(3) => false, Array(3) => true}
m.set([1,2,3], false); //{Array(3) => true, Array(3) => false, Array(3) => false}

//4. Write a function called hasDuplicate which accepts an array and returns true 
//or false if that array contains a duplicate
const hasDuplicate = (arr) =>  new Set(arr).size !== arr.length

hasDuplicate([1,3,2,1]) // true
hasDuplicate([1,5,-1,4]) // false

//5. Write a function called vowelCount which accepts a string and returns a map 
//where the keys are numbers and the values are the count of the vowels in the string.

function vowelCount(str){
    const vowelMap = new Map();

    for(let char of str){
        let lowercaseChar = char.toLowerCase();
         
        if('aeiou'.includes(lowercaseChar)){
            if(vowelMap.has(lowercaseChar))
              vowelMap.set(lowercaseChar, vowelMap.get(lowercaseChar) + 1)
            else{
                vowelMap.set(lowercaseChar, 1)
            }
        }
    }
    return vowelMap;
}

