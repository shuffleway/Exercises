/**
 * Build a frequency counter object from an array
 * @param {Array} arr any array
 */
function countFrequencies(arr) {
    const frequencyCounter = {};
    
    for (const element of arr) {
        frequencyCounter[element] = (frequencyCounter[element] || 0) + 1;
    }
    
    return frequencyCounter;
}

function findMode(arr){
  let freqCounter = countFrequencies(arr)
    
  let count = 0;
  let mostFrequent;

  for (let key in freqCounter) {
    if (freqCounter[key] > count) {
      mostFrequent = key;
      count = freqCounter[key];
    }
  }

  return +mostFrequent;
}

function findMean(nums){
    if(nums.length === 0) return 0;
    return nums.reduce(function (acc, cur) {
      return acc + cur;
    }) / nums.length
}


function findMedian(nums){
    // sort and get the middle element
  
    nums.sort((a, b) => a - b);
  
    let middleIndex = Math.floor(nums.length / 2);
    let median;
  
    if (nums.length % 2 === 0) {
      median = (nums[middleIndex] + nums[middleIndex - 1]) / 2;
    } else {
      median = nums[middleIndex];
    }
    return median
}

/**
 * Attempt to convert an array of strings to an array of numbers
 * @param {Array} stringArray array of strings
 * @returns {Array|Error} an array or an error object
 */
function convertAndValidateNumsArray(stringArray) {
    const numberArray = stringArray.map(Number);

    // Check if any element is NaN (invalid number)
    const isValid = numberArray.every((num) => !isNaN(num));

    if (isValid) {
        return numberArray;
    } else {
        return new Error(
            'Invalid input: Some elements are not valid numbers.'
        );
    }
}

module.exports = {
    findMean,
    findMedian,
    findMode,
    convertAndValidateNumsArray
  };