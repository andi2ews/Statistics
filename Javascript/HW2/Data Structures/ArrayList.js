var array = []; // array/list

array.push(1); // insert values
array.push(10);
array.push(100);
array.push(1000);
array.push(10000);

array.pop(); // remove the last element of the array
var index = 2;
array.splice(index, 1); // 2nd parameter means remove one item only
console.log(array);

console.log(array[0]); //get elememnt of index i
array[0] = -1; // set element of index i
console.log(array);


console.log(array.indexOf(1000)); // check existence of an element

// for loop with break
for (let i = 0; i < array.length; i++) {
    if (array[i] === 1000) break;
    console.log(array[i]);
}