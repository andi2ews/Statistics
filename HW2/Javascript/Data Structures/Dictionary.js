// dictionary
// there are no dictionary data struct in javascript. 
// You can create an object and use it as a dict

var dict = {};

dict['hello'] = 2; // insert a pair (key,value) to the dict/object
dict['world'] = 1;
console.log(dict);

console.log(dict.hasOwnProperty('hello')); //check if a key is in dict
delete dict['hello']; // remove an element from the dict (if present)
console.log(dict);

console.log(dict['world']);  //get the value associated with its key
dict['world'] = 100;        // set a value of a key
console.log(dict);