

// function-declaration syntax
function sum(num1, num2) {
    return num1 + num2;
}

// get function name
console.log(sum.name);

// function declaration hoisting -- function decalaration are read before code executes
sayHi();
function sayHi() {
    console.log("Hi!");
}

// It also means this example doesn't work as expected
// if (true) {
//     function sayHi() {
//         console.log("Hi!");
//     }   
// } else {
//     function sayHi() {
//         console.log("Hello!");
//     }
// }

// function expression syntax
var sum = function(num1, num2) {
    return num1 + num2;
}


// CLOSURES

function createComparisonFunction(propertyName) {
    return function(object1, object2) {
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];

        return value1 - value2;
    }
}

/*
Even after the inner function has been returned and is being used elsewhere,
it has access to the external variable `propertyName`. 
This occurs because the inner function's scope chain includes the scope of 
`createComparisonFunction()`
*/

/*
There is one notable side effect of this scope-chain configuration: the closure
always gets the last value of any variable from the containing function.

See demo1(), every function returns 10.
To fix by creating another anonymous function, see demo1_fix().
*/

function demo1() {
    var result = [];

    for (var i = 0; i < 10; i++) {
        result[i] = function() {
            return i;
        }
    }

    return result;
}

console.log(demo1()[0]());  // 10 !!!

function demo1_fix() {
    var result = [];

    for (var i = 0; i < 10; i++) {
        result[i] = function(num) {
            return function() {
                return num;
            }
        }(i);
    }

    return result;
}

console.log(demo1_fix()[0]());  // 0

/*
Use `this` object inside closure introduces some complex behaviours.
The `this` object is bound at runtime based on the context:
  - when used insde global functions, `this` is equal to `global / window` in 
    nonstrict mode and `undefined` in strict mode.
  - when called as an object method, `this` is equal to the object
Anonymous functions are not bound to an object in this context, meaning
`this` object points to `global / window` (case1).
To solve the issue, allow closure access to a stored `this`.

Note that both `this` and `arguments` behave in this way.
*/

var name = "Global";

var demo2 = {
    name: "My Object",

    getNameFunc: function() {
        return function() {
            return this.name;
        }
    }
};

console.log(demo2.getNameFunc()()); // "undefined"

var demo2_fix = {
    name: "My Object",

    getNameFunc: function() {
        var that = this;
        return function() {
            return that.name;
        }
    }
};

console.log(demo2_fix.getNameFunc()()); // "My Object"

var demo2_2 = {
    name: "My Object",

    getName: function() {
        return this.name;
    }
};

console.log(demo2_2.getName());                         // "My Object"
console.log((demo2_2.getName)());                       // "My Object"
console.log((demo2_2.getName = demo2_2.getName)());     // "undefined"


// Memory Leaks due to circular reference

function demo3() {
    var element = document.getElementById("someElement");
    element.onclick = function() {
        alert(element.id);
    }
}

/*
In this version of the code, a copy of element’s ID is stored in a variable 
that is used in the closure, eliminating the circular reference. That step 
alone is not enough, however, to prevent the memory problem.

Remember: the closure has a reference to the containing function’s entire 
activation object, which contains element. Even if the closure doesn’t 
reference element directly, a reference is still stored in the containing 
function’s activation object. It is necessary, therefore, to set the element 
variable equal to null. This dereferences the COM object and decrements its 
reference count, ensuring that the memory can be reclaimed when appropriate.
*/

function demo3_fix() {
    var element = document.getElementById("someElement");
    var id = element.id;

    element.onclick = function() {
        alert(id);
    }

    element = null;
}


// MIMICKING BLOCK SCOPE

(function() {
    // block code here
})();


// PRIVATE VARIABLES

/*
Javascript has no concept of private members; all objects properties are public.
However, there is a concept of *private variables*: any variable defined inside a
function is considered private since it is inaccessible outside the function. This
includes function arguments, local variables and functions defined inside other 
functions.

*/

function Demo4(name) {
    var privateVariable = 10;

    function pricateFunction() {
        return false;
    }

    // privileged methods
    this.publicMethod = function() {
        privateVariable++;
        
        // access to private variable
        console.log(privateVariable);
        
        // access to arguments
        console.log(name);

        return pricateFunction();
    }
}

var demo4_obj = new Demo4("Hello");
console.log(demo4_obj.publicMethod());


var Demo5;

(function() {
    var privateVariable = 10;

    function pricateFunction() {
        return false;
    }

    // constructor -- didn't declare using `var` on purpose -- set as global variable
    // (only works in non-strict mode though)
    Demo5 = function() {};

    // public and privileged methods
    Demo5.prototype.publicMethod = function() {
        privateVariable++;
        
        // access to private variable
        console.log(privateVariable);

        return pricateFunction();
    };

})();

var demo5_obj = new Demo5();
console.log(demo5_obj.publicMethod());  // false


(function() {
    var name = "";

    Person = function(value) {
        name = value;
    }

    Person.prototype.getName = function() {
        return name;
    };

    Person.prototype.setName = function(value) {
        name = value;
    }

})();

var person1 = new Person("Nicholas");
console.log(person1.getName());     // "Nicholas"
person1.setName("Greg");
console.log(person1.getName());     // "Greg"

var person2 = new Person("Michael");
console.log(person1.getName());     // "Michael"
console.log(person2.getName());     // "Michael"


// The Module Pattern

/*
The module pattern, as described by Douglas Crockford, does the same for singletons

var singleton = {
    name: value,
    method: function() {
        // method code here
    }
};

*/

var singleton = function() {
    // private variables and functions
    var privateVariable = 10;

    function privateFunction() {
        return false;
    }

    // privileged / public methods and properties
    return {
        publicProperty: true,

        publicMethod: function() {
            privateVariable++;
            return privateFunction();
        }
    };
}();

console.log(singleton.publicProperty);  // true
console.log(singleton.publicMethod());  // false


// another example

var BaseComponent = function() {};

var application = function() {
    // private variables and functions
    var components = new Array();

    // initialization
    components.push(new BaseComponent());

    // public interface
    return {
        getComponentCount: function() {
            return components.length;
        },

        registerComponent: function(component) {
            if (typeof component == "object") {
                components.push(component);
            }
        }
    };
}();



// The Module-Augmentation Pattern
// This is useful when the singleton object needs to be an instance of a particular type but
// must be augmented with additional properties and / or methods.

var CustomType = function() {};

var singleton2 = function() {
    // private variables and functions
    var privateVariable = 10;

    function privateFunction() {
        return false;
    }

    // create object
    var object = new CustomType();

    // add privileged / public methods and properties
    object.publicProperty = true;

    object.publicMethod = function() {
        privateVariable++;
        return privateFunction();
    };

    return object;
}();


var application2 = function() {
    // private variables and functions
    var components = new Array();

    // initialization
    components.push(new BaseComponent());

    // create a local copy of application
    var app = new BaseComponent();

    // public interface
    app.getComponentCount = function() {
        return components.length;
    };

    app.registerComponent = function(component) {
        if (typeof component == "object") {
            components.push(component);
        }
    };

    return app;
}();
