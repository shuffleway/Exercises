const arr = [{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}]

//accepts an array of objects and a key and returns a new array 
//with the value of each object at the key.
function extractValue(arr, key){
  return arr.reduce(function(accumulator, currentObject){
        accumulator.push(currentObject[key]);
        return accumulator;
  }, []);
}

//accepts a string and returns an object with the keys as 
//the vowel and the values as the number of times the 
//vowel appears in the string
function vowelCount(str){
    let vowel = "aeiou";
    let str2 = str.split('');

    return str2.reduce(function(acc, curVal){
        let curVal2 = curVal.toLowerCase();
      if(vowel.indexOf(curVal2) !== -1){
        if(acc[curVal2]){
            acc[curVal2]++;
        }
        else{
            acc[curVal2] = 1;
        }
      }
      return acc;
    }, {})
}

//accepts an array of objects and returns the array of 
//objects passed to it with each object now including 
//the key and value passed to the function.
function addKeyAndValue(arr, key, val){
    return arr.reduce(function(acc, next,i){
          acc[i][key] = val;
          return acc;
    },arr);
}

//accepts an array and a callback and returns an 
//array with two arrays inside of it
function partition(arr, func){
    return arr.reduce(function(acc, next){
          if(func(next)){
            acc[0].push(next);
          }
          else{
            acc[1].push(next);
          }
          return acc;
    }, [[], []])
}

//returns true if a value is even
function isEven(val){
    return val % 2 === 0;
}
  
  const arr2 = [1,2,3,4,5,6,7,8];

  //returns true if a value is > 3
function isLongerThanThreeCharacters(val){
    return val.length > 3;
}
  
  const names = ['Elie', 'Colt', 'Tim', 'Matt'];
  
  //Test cases.
  partition(arr, isEven) // [[2,4,6,8], [1,3,5,7]];
  partition(names, isLongerThanThreeCharacters) // [['Elie', 'Colt', 'Matt'], ['Tim']]