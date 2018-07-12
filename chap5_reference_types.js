// creating object

// explicitly
var person = new Object();
person.name = "Max";
person.age = 7;

// object literal notation
var person = {
    name: "Max",
    age: 7,
};

// access object properties via bracket notation or dot notation
console.log(person["age"]);
console.log(person.age);



// ARRAY

// creating array
console.log(new Array());
console.log(Array());
console.log(new Array(20));
console.log(Array(20));
console.log(new Array("red", "blue", "green"));
console.log([]);
console.log(["red", "blue", "green"]);

// detecting array

/* 
NOTE:
The one problem with instanceof is that it assumes a single global execution 
context. If you are dealing with multiple frames in a web page, you’re really 
dealing with two distinct global execution contexts and therefore two versions 
of the Array constructor. If you were to pass an array from one frame into a 
second frame, that array has a different constructor function than an array 
created natively in the second frame.
*/

var colours = ["red", "blue", "green"];

console.log(colours instanceof Array);
console.log(Array.isArray(colours));


// conversion methods

console.log(colours.toString());        // red,blue,green
console.log(colours.toLocaleString());  // red,blue,green
console.log(colours.valueOf());         // [ 'red', 'blue', 'green' ]
console.log(colours);                   // [ 'red', 'blue', 'green' ] 

// push, pop, unshift, shift
// <- shift, unshift -> [ ... ] <- push, pop ->

var a = ["a", "b", "c"];

console.log(a.push("e", "f"));  // 5, return count
console.log(a);                 // [ 'a', 'b', 'c', 'e', 'f' ]

console.log(a.pop());           // 'f'
console.log(a);                 // [ 'a', 'b', 'c', 'e']

console.log(a.unshift("g", "h"));   // 6, return count
console.log(a);                     // [ 'g', 'h', 'a', 'b', 'c', 'e' ]

console.log(a.shift());         // 'g'
console.log(a);                 // [ 'g', 'h', 'a', 'b', 'c', 'e' ]

// reorder

var a = [1, 2, 3, 4, 5];
console.log(a.reverse());   // [ 5, 4, 3, 2, 1 ], return result
console.log(a);             // [ 5, 4, 3, 2, 1 ], also updated original array

var a = [0, 1, 5, 10, 15];

// by default, sort use compares by converting to string first
console.log(a.sort());      // [ 0, 1, 10, 15, 5 ]
console.log(a);             // [ 0, 1, 10, 15, 5 ]

// to sort by number value
a.sort((v1, v2) => { return v1 - v2; });
console.log(a);             // [ 0, 1, 5, 10, 15 ]


// array manipulation methods

//// concat
var colours = ["red", "green", "blue"];
var colours2 = colours.concat("yellow", ["black", "brown"]);
console.log(colours);   // [ 'red', 'green', 'blue' ]
console.log(colours2);  // [ 'red', 'green', 'blue', 'yellow', 'black', 'brown' ]

//// slice(start-pos[, stop-pos])
// negative postion = position - length
// pos           0       1        2       3         4
// neg-pos      -5      -4       -3      -2        -1
var colours = ["red", "green", "blue", "yellow", "purple"];
console.log(colours.slice(1));      // [ 'green', 'blue', 'yellow', 'purple' ]
console.log(colours.slice(1, 4));   // [ 'green', 'blue', 'yellow' ]
console.log(colours.slice(-1));     // [ 'purple' ]
console.log(colours.slice(1, -1));  // [ 'green', 'blue', 'yellow' ]

//// splice(pos, number-of-items, items-to-insert...)
var colours = ["red", "green", "blue"];
var removed = colours.splice(0, 1);
console.log(colours);   // [ 'green', 'blue' ]
console.log(removed);   // [ 'red' ]

removed = colours.splice(1, 0, "yellow", "orange");
console.log(colours);   // [ 'green', 'yellow', 'orange', 'blue' ]
console.log(removed);   // []

removed = colours.splice(1, 1, "red", "purple");
console.log(colours);   // [ 'green', 'red', 'purple', 'orange', 'blue' ]
console.log(removed);   // [ 'yellow' ]

removed = colours.splice(1, 2, ["haha"]);
console.log(colours);   // [ 'green', [ 'haha' ], 'orange', 'blue' ]
console.log(removed);   // [ 'red', 'purple ]

//// indexOf, lastIndexOf
//             0  1  2  3  4  5  6  7  8
//   indexOf   ->       *
//                            *           <- lastIndexOf                       
//   indexOf(,4)           -> *
//                      *  <-             <- lastIndexOf(,4) 
var numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];

console.log(numbers.indexOf(4));            // 3
console.log(numbers.lastIndexOf(4));        // 5
console.log(numbers.indexOf(4, 0));         // 3
console.log(numbers.lastIndexOf(4, -1));    // 5

console.log(numbers.indexOf(4, 4));         // 5
console.log(numbers.lastIndexOf(4, 4));     // 3

console.log(numbers.indexOf(6));            // -1, not found


// iterative methods on array

/*
Runs the given function on every item in the array, and...
  - every(): returns true if the function returns true for *EVERY* item
  - filter(): returns an array of all items for which the function returns true
  - forEach(): this method has no return value
  - map(): returns the result of each function call in an array
  - some(): returns true if the function returns true for *ANY ONE* item
*/

var numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];

console.log(numbers.every( (item, index, array) => { return item > 2; } ));  // false
console.log(numbers.every( (item, index, array) => { return item > 0; } ));  // true

console.log(numbers.filter( (item, index, array) => { return item > 2; } ));  // [ 3, 4, 5, 4, 3 ]

numbers.forEach((item, index, array) => { if (item > 2) console.log(index); });

console.log(numbers.map( (item, index, array) => { return item * 2; } ));    // [ 2, 4, 6, 8, 10, 8, 6, 4, 2 ]

console.log(numbers.some( (item, index, array) => { return item > 2; } ));  // true
console.log(numbers.some( (item, index, array) => { return item > 5; } ));  // false


// reduction methods: reduce(func [, inital_value]), reduceRight(func [, inital_value])

var values = [1, 2, 3, 4, 5];

var sum = values.reduce( (pre, cur, index, array) => { return pre + cur }, 0 );
console.log(sum);   // 15

var product = values.reduce( (pre, cur, index, array) => { return pre * cur }, 1 );
console.log(product);   // 120

var difference = values.reduce( (pre, cur, index, array) => { return pre - cur }, 0 );
console.log(difference);   // -15

var difference_right = values.reduceRight( (pre, cur, index, array) => { return pre - cur }, 0 );
console.log(difference_right);   // -15


// DATE

// Note: ECMAScript `Date` type is based on an early version of `java.util.Date` from Java.

var now = new Date();
console.log(now);   // 2018-07-07T08:37:10.246Z

// timestamp
console.log(Date.now());    // 1530954318928

console.log(new Date(Date.parse("6 July, 2011")));  // 2011-07-05T14:00:00.000Z

console.log(Date.parse("6 July, 2011"));  // 1309874400000
console.log(new Date(Date.parse("6 July, 2011")));  // 2011-07-05T14:00:00.000Z

console.log(new Date(Date.UTC(2000, 0)));   // 2000-01-01T00:00:00.000Z

// All fives! Note month May's index is 4
console.log(new Date(Date.UTC(2005, 4, 5, 17, 55, 55)));    // 2005-05-05T17:55:55.000Z

// Date contructor takes the same arguments as Date.UTC
console.log(new Date(2000, 0));   // 2000-01-01T00:00:00.000Z
console.log(new Date(2005, 4, 5, 17, 55, 55));    // 2005-05-05T17:55:55.000Z

// to string
console.log(now.toLocaleString());  // 07/07/2018, 19:07:43
console.log(now.toString());        // Sat Jul 07 2018 19:07:43 GMT+1000 (Australian Eastern Standard Time)
console.log(now.valueOf());         // 1530954463069

console.log(now.toLocaleTimeString());  // 19:11:57
console.log(now.toTimeString());        // 19:11:57 GMT+1000 (Australian Eastern Standard Time)

console.log(now.toLocaleDateString());  // 07/07/2018
console.log(now.toDateString());        // Sat Jul 07 2018

console.log(now.toUTCString()); // Sat, 07 Jul 2018 09:11:57 GMT


// REGEXP

/*
var expression = /pattern/flags;

flags:
  - g: global mode
  - i: case-insensitive mode
  - m: multi-line mode
*/

// literal pattern
var pattern1 = /[a-z]*/i;

// use constructor
var pattern2 = new RegExp("[a-z]*", "i");

// NOTE in node js there is no difference now:

var re;

for (var i = 0; i < 10; i++) {
    re = /cat/g;
    console.log(i, re.test("catastrophe"));
}

for (var i = 0; i < 10; i++) {
    re = new RegExp("cat", "ig");
    console.log(i, re.test("catastrophe"));
}

//// functions on pattern

console.log(pattern1.test("hello world!")); // true

var matches = pattern1.exec("hello world!");
console.log(matches);   // [ 'hello', index: 0, input: 'hello world!', groups: undefined ]


//// functions on string

// same as pattern.exec(text)
var matches = "hello world!".match(pattern1);
console.log(matches);

var text = "cat, bat, sat, fat";
var pos = text.search(/at/);
console.log(pos);   // 1

console.log(text.replace("at", "ond"));             // "cond, bat, sat, fat"
console.log(text.replace(/at/g, "and"));            // "cand, band, sand, fand"
console.log(text.replace(/(.at)/g, "word($1)"));    // "word(cat), word(bat), word(sat), word(fat)"

var s = "red, blue, green, yellow";
console.log(s.split(","));      // [ 'red', ' blue', ' green', ' yellow' ]
console.log(s.split(",", 2));   // [ 'red', ' blue' ]
console.log(s.split(/, /));     // [ 'red', 'blue', 'green', 'yellow' ]


// FUNCTIONS

/*
Functions actually are objects. 
Each function is an instance of the `Function` type that has properties and methods 
just like any other reference type.
*/

// function-declaration syntax
function sum(num1, num2) {
    return num1 + num2;
}

// function expression syntax
var sum = function(num1, num2) {
    return num1 + num2;
}

// NOTE the difference between function declarations and function expressions:
// Declarations are read and available in an execution context before any code is executed,
// whereas function expressions aren't complete until the execution reaches that line of code.

// function contructor syntax (do not use)
var sum = new Function("num1", "num2", "return num1 + num2");

// also it is poosible to have named function expressions that look like declarations
var sum = function sum() {};

// NOTE: No overloading for function.

// NOTE: in case of recursive function, use `arguments.callee` to refer self
// also there is `arguments.callee.caller` / `arguments.caller`

var factorial = function(num) {
    if (num <= 1) {
        return 1;
    } else {
        return num * arguments.callee(num - 1);
    }
}

console.log(factorial(5));

// TODO: foreach

// function.apply("this", [arg1, arg2, ...]) and function.call("this", arg1, arg2, ...)
// setting a specific "this" object inside the function body

global.colour = "red";
var o = { colour: "blue" };

function sayColour() {
    console.log(this.colour);
}

sayColour();            // red
sayColour.call(this);   // undefined - ?
sayColour.call(global); // red
sayColour.call(o);      // blue

// function.bind()

var objectSayColour = sayColour.bind(o);
objectSayColour();      // blue


// PRIMITIVE WRAPPER METHODS

/*
Three special reference types:
  - Boolean
  - Number
  - String

In this example, `s1` is a primitive value, `.substring()` is called on wrapper object
*/

var s1 = "hello world";
console.log(s1.substring(6));

// it equivlents to:

var s1 = new String("hello world");
console.log(s1.substring(6));
s1 = null;

// Note: the wrapper object exists only for one line of code before it gets destroyed

var s1 = "hello world";
s1.colour = "red";
console.log(s1.colour); // undefined

// Note: `Object` constructor also acts as a factory method to return an instance of a
// primitive wrapper based on the type of the value passed in:

var obj = new Object("hello world");
console.log(obj instanceof String); // true

// Note: keep in mind calling constructor via `new` is different to calling the same name
// casting function:

var value = "25";

var obj = new Number(value);
console.log(typeof obj);    // "object"

var num = Number(value);
console.log(typeof num);    // "number"


//// Boolean
console.log("//// Boolean");

var falseObj = new Boolean(false);
console.log(falseObj);                      // [Boolean: false]
console.log(typeof falseObj);               // object
console.log(falseObj instanceof Boolean);   // true
console.log(falseObj && true);              // true !!

var falseValue = false;
console.log(falseValue);                    // false
console.log(typeof falseValue);             // boolean
console.log(falseValue instanceof Boolean); // false
console.log(falseValue && true);            // false

//// Nunmber
console.log("//// Number");

var num = 10;
console.log(num.toString());        // 10
console.log(num.toString(16));      // a

var num = 10.005;
console.log(num.toFixed(2));        // 10.01
console.log(num.toExponential(1));  // 1.0e+1

var num = 99;
console.log(num.toPrecision(1));    // 1e+2
console.log(num.toPrecision(2));    // 99
console.log(num.toPrecision(3));    // 99.0

//// String
console.log("//// String");

var s = "hello world";

console.log(s.length);          // 11
console.log(s.charAt(1));       // "e"
console.log(s[1]);              // "e"
console.log(s.charCodeAt(1));   // 101

console.log(s.concat("!", " ", "123")); // "hello world! 123"

// .slice(start[, stop]) <- not include stop position
// .substring(start[, stop]) <- not include stop postiion
// .substr(start[, length])

console.log(s.slice(3));            // "lo world"
console.log(s.substring(3));        // "lo world"
console.log(s.substr(3));           // "lo world"
console.log(s.slice(3, 7));         // "lo w"
console.log(s.substring(3, 7));     // "lo w"
console.log(s.substr(3, 7));        // "lo worl"
console.log(s.slice(-3));           // "rld" = slice(7)
console.log(s.substring(-3));       // "hello world" !! = substring(0)
console.log(s.substr(-3));          // "rld" = substr(7)
console.log(s.slice(3, -4));        // "lo w" = slice(3, 7)
console.log(s.substring(3, -4));    // "hel" !! = substring(3, 0)
console.log(s.substr(3, -4));       // "" !! = substr(3, 0)

console.log(s.indexOf("o"));        // 4
console.log(s.lastIndexOf("o"));    // 7
console.log(s.indexOf("o", 6));     // 7
console.log(s.lastIndexOf("o", 6)); // 4

console.log("*" + "  hello world   ".trim() + "*");     // *hello world*

console.log(s.toLocaleUpperCase());     // "HELLO WORLD"
console.log(s.toUpperCase());           // "HELLO WORLD"
console.log(s.toLocaleLowerCase());     // "hello world"
console.log(s.toLowerCase());           // "hello world"


// find all the positions of 'e'
var s = "Lorem ipsum dolor sit amet, consectetur adipisicing elit";
var result = [];

var pos = 0;
while (pos >= 0) {
    pos = s.indexOf('e', pos);

    if (pos != -1) {
        result.push(pos);
        pos++;
    }
}

console.log(result);    // [ 3, 24, 32, 35, 52 ]


// Global

var uri = "http://www.google.com/hello world.html#start";
var s1 = encodeURI(uri);
var s2 = encodeURIComponent(uri);

console.log(s1);    // "http://www.google.com/hello%20world.html#start"
console.log(s2);    // "http%3A%2F%2Fwww.google.com%2Fhello%20world.html%23start"

console.log(decodeURI(s1));
console.log(decodeURIComponent(s2));


// Math

console.log(Math.max(3, 54, 32, 16));
console.log(Math.min(3, 54, 32, 16));

var values = [3, 54, 32, 16];
console.log(Math.max.apply(Math, values));

console.log(Math.ceil(25.1));   // 26
console.log(Math.round(25.1));  // 25
console.log(Math.floor(25.1));  // 25

console.log(Math.ceil(25.5));   // 26
console.log(Math.round(25.5));  // 26
console.log(Math.floor(25.5));  // 25

console.log(Math.ceil(25.9));   // 26
console.log(Math.round(25.9));  // 26
console.log(Math.floor(25.9));  // 25

console.log(Math.random());