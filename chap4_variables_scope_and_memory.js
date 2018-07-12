

// PRIMITIVE AND REFERENCE VALUES
// - primitive (5): undefined, null, boolean, number and string
// - reference: objects

// Dynamic properties are only allowed on reference types
var person = new Object();
person.name = "Max";
console.log(person.name);

// Copy values

// primitive type copies value
var num1 = 5;
var num2 = num1;
var num1 = 10;
console.log(num1, num2);    // 10, 5

// reference type copies reference
var obj1 = new Object();
var obj2 = obj1;
obj1.name = "Max";
console.log(obj1.name, obj2.name);  // Max, Max

// NOTE: Function arguments ALWAYS pass by value!
// Think of function arguments in ECMAScript as nothing more than local variables
function setName(obj) {
    // the result is that obj is accessing object by reference, even though it 
    // was passed into the function by value
    obj.name = 'Max';
}

var person = new Object();
setName(person);
console.log(person.name);   // Max

function setName1(obj) {
    obj.name = 'Max';
    // this is a proof that obj is not passed by reference
    obj = new Object();
    obj.name = "Greg";
}
setName1(person);
console.log(person.name);   // Max

// instanceof
var person = new Object();
var colours = new Array();
var pattern = new RegExp();

console.log(person instanceof Object);  // true
console.log(colours instanceof Array);  // true
console.log(pattern instanceof RegExp); // true
