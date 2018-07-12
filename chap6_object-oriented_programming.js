var person = {
    name: "Nicholas",
    age: 29,
    job: "Software Engineer",

    sayName: function() {
        console.log(this.name);
    }
};

person.sayName();
console.log(person.age);

// person.forEach((item, index, array) => {
//     console.log(item);
// });

// for (item in person) {
//     console.log(item);
// }


// Define property via Object.defineProperty()

/*
Data properties has four attributes:
  - [[Configurable]] (default is true): if proerty can be deleted from the object
  - [[Enumerable]] (default is true)
  - [[Writable]] (default is true): read / write or read only
  - [[Value]] (default is `undefined`)
*/

var person = {};
Object.defineProperty(person, "name", {
    writable: false,
    value: "Nicholas"
});

Object.defineProperty(person, "age", {
    configurable: false,
    value: 35
});

console.log(person.name);
person.name = "Greg";
console.log(person.name);   // still "Nicholas"

console.log(person.age);
delete person.age;
console.log(person.age);    // still 35


/*
Accessor properties:
  - [[Configurable]] (default is true)
  - [[Enumerable]] (default is true)
  - [[Get]] (defauit is `undefined`)
  - [[Set]] (default is `undefined`)
*/

var book = {
    _year: 2004,
    edition: 1,
};

Object.defineProperty(book, "year", {
    get: function() {
        return this._year;
    },

    set: function(newValue) {
        if (newValue > 2004) {
            this._year = newValue;
            this.edition += newValue - 2004;
        }
    }
});

book.year = 2005;
console.log(book.year);
console.log(book.edition); // 2

var descriptor = Object.getOwnPropertyDescriptor(book, "_year");
console.log(descriptor.value, descriptor.configurable); // 2005, true
console.log(typeof descriptor.get);                     // undefined

var descriptor = Object.getOwnPropertyDescriptor(book, "year");
console.log(descriptor.value, descriptor.configurable); // undefined, false
console.log(typeof descriptor.get);                     // function



// above example using defineProperties()

var book1 = {};

Object.defineProperties(book1, {
    _year: {
        value: 2004
    },

    edition: {
        value: 1
    },

    year: {
        get: function() {
            return this._year;
        },
    
        set: function(newValue) {
            if (newValue > 2004) {
                this._year = newValue;
                this.edition += newValue - 2004;
            }
        }        
    }
});

book1.year = 2005;
console.log(book1.year); // 2004 ??
console.log(book1.edition); // 1 ??

var descriptor = Object.getOwnPropertyDescriptor(book1, "_year");
console.log(descriptor.value, descriptor.configurable); // 2004, false
console.log(typeof descriptor.get);                     // undefined

var descriptor = Object.getOwnPropertyDescriptor(book1, "year");
console.log(descriptor.value, descriptor.configurable); // undefined, false
console.log(typeof descriptor.get);                     // function




// OBJECT CREATION

//// The Factory Pattern

(function() {
    console.log("//// The Factory Pattern");

    function createPerson(name, age, job) {
        var o = new Object();
        o.name = name;
        o.age = age;
        o.job = job;
    
        o.sayName = function() {
            console.log(this.name);
        };
    
        return o;
    }
    
    var person1 = createPerson("Max", 7, "Software Developer");
    var person2 = createPerson("Alex", 5, "Doctor");
    
    person1.sayName();
    console.log(person1.name);
    
    console.log(person1.sayName == person2.sayName);    // false
    
})();


//// The Constructor Pattern
(function() {
    console.log("//// The Constructor Pattern");

    function Person(name, age, job) {
        this.name = name;
        this.age = age;
        this.job = job;
    
        this.sayName = function() {
            console.log(this.name);
        };
    }
    
    // use as a constructor
    var person1 = new Person("Max", 7, "Software Developer");
    var person2 = new Person("Alex", 5, "Doctor");
    
    person1.sayName();
    console.log(person1.name);
    
    // call as a function
    Person("Alex", 5, "Doctor");
    global.sayName();
    
    // call in the scope of another object
    var o = new Object();
    Person.call(o, "Max", 7, "Software Developer");
    o.sayName();
    
    // sayName() function has been duplicated on every instance
    console.log(person1.sayName == person2.sayName);    // false
})();


(function() {
    console.log("//// The Constructor Pattern - work around");

    // possible work around of above
    function Person(name, age, job) {
        this.name = name;
        this.age = age;
        this.job = job;

        this.sayName = sayName;
    }

    function sayName() {
        console.log(this.name);
    }

var person1 = new Person("Max", 7, "Software Developer");
var person2 = new Person("Alex", 5, "Doctor");

console.log(person1.sayName == person2.sayName);    // true

})();

//// The Prototype Pattern

(function() {
    console.log("//// The Prototype Pattern");

    function Person() {}
    
    Person.prototype.name = "No Name";
    Person.prototype.age = 0;
    Person.prototype.job = "-";
    Person.prototype.sayName = function() {
        console.log(this.name);
    };

    var person1 = new Person();
    person1.name = "Max";

    var person2 = new Person();

    person1.sayName();  // "Max"
    person2.sayName();  // "No Name"
    console.log(person1.hasOwnProperty("name"));        // true
    console.log("name" in person1);                     // true


    delete person1.name;
    person1.sayName();          // "No Name"
    console.log(person1.name);  // "No Name"
    console.log(person1.hasOwnProperty("name"));        // false
    console.log("name" in person1);                     // true

    console.log(person1.sayName == person2.sayName);    // true

    console.log(Person.prototype.isPrototypeOf(person1));               // true
    console.log(Object.getPrototypeOf(person1) == Person.prototype);    // true            
    console.log(Object.getPrototypeOf(person1).name);                   // No Name

    console.log(Object.keys(Person.prototype));                 // [ 'name', 'age', 'job', 'sayName' ]
    console.log(Object.getOwnPropertyNames(Person.prototype));  // [ 'constructor', 'name', 'age', 'job', 'sayName' ]

})();


(function() {
    console.log("//// The Prototype Pattern - alternate syntax");

    function Person() {}

    Person.prototype = {
        // if constructor is important, add:
        // constructor: Person,
        name: "No Name",
        age: 0,
        job: "-",
        sayName: function() {
            console.log(this.name);
        },
    };

    var person1 = new Person();
    person1.name = "Max";

    var person2 = new Person();

    person1.sayName();  // "Max"
    person2.sayName();  // "No Name"
    console.log(person1.hasOwnProperty("name"));        // true
    console.log("name" in person1);                     // true


    delete person1.name;
    person1.sayName();          // "No Name"
    console.log(person1.name);  // "No Name"
    console.log(person1.hasOwnProperty("name"));        // false
    console.log("name" in person1);                     // true

    console.log(person1.sayName == person2.sayName);    // true

    console.log(Person.prototype.isPrototypeOf(person1));               // true
    console.log(Object.getPrototypeOf(person1) == Person.prototype);    // true            
    console.log(Object.getPrototypeOf(person1).name);                   // No Name

    console.log(Object.keys(Person.prototype));                 // [ 'name', 'age', 'job', 'sayName' ]
    console.log(Object.getOwnPropertyNames(Person.prototype));  // [ 'name', 'age', 'job', 'sayName' ] !!

    /*
    The end result is the same, with one exception: the constructor property no longer points to Person.

    Essentially, this syntax overwrites the default prototype object completely, meaning that the 
    constructor property is equal to that of a completely new object (the Object constructor) instead 
    of the function itself.
    */

})();

(function() {
    console.log("//// The Prototype Pattern - Dynamic Nature");

    function Person() {}

    var friend = new Person();

    Person.prototype.sayHi = function() {
        console.log("Hi");
    };

    Person.prototype = {
        // if constructor is important, add:
        // constructor: Person,
        name: "No Name",
        age: 0,
        job: "-",
        friends: [ "Tom", "Jerry" ],
        sayName: function() {
            console.log(this.name);
        },
    };

    friend.sayHi();
    // friend.sayName(); // throw exception


    var person1 = new Person();
    var person2 = new Person();
    
    person1.friends.push("Haha");   // altered prototype!

    console.log(person1.friends);
    console.log(person2.friends);
    console.log(person1.friends == person2.friends);


    console.log(typeof String.prototype.substring); // function

    // it is possible to redefine native object's prototype
    String.prototype.substring = function() {
        return "Hi";
    };

    console.log("Hello".substring());   // "Hi" - facepalm!!

})();

console.log("Hello".substring()); // "Hi" -- facepalm!!!


//// Combination of Constructor / Prototype Pattern

(function() {
    console.log("//// Combination of Constructor / Prototype Pattern -- Perfect!");

    function Person(name, age, job) {
        this.name = name;
        this.age = age;
        this.job = job;
        this.friends = [ "Tom", "Jerry" ];
    }

    Person.prototype = {
        constructor: Person,
        sayName: function() {
            console.log(this.name);
        }
    }

    var person1 = new Person("Max", 7, "Software Developer");
    var person2 = new Person("Alex", 5, "Doctor");

    person1.friends.push("Haha");

    console.log(person1.friends);   // [ 'Tom', 'Jerry', 'Haha' ]
    console.log(person2.friends);   // [ 'Tom', 'Jerry' ]

    console.log(person1.sayName == person2.sayName);    // true

})();

//// Dynamic Prototype Pattern

(function() {
    console.log("//// Dynamic Prototype Pattern");

    function Person(name, age, job) {
        this.name = name;
        this.age = age;
        this.job = job;
        this.friends = [ "Tom", "Jerry" ];

        // methods
        if (typeof this.sayName != "function") {
            Person.prototype.sayName = function() {
                console.log(this.name);
            };
        }
    }

    var person1 = new Person("Max", 7, "Software Developer");
    var person2 = new Person("Alex", 5, "Doctor");

    person1.friends.push("Haha");

    console.log(person1.friends);   // [ 'Tom', 'Jerry', 'Haha' ]
    console.log(person2.friends);   // [ 'Tom', 'Jerry' ]

    console.log(person1.sayName == person2.sayName);    // true

})();

//// Parasitic Constructor Pattern

(function() {
    console.log("//// Parasitic Constructor Pattern");

    function Person(name, age, job) {
        var o = new Object();

        o.name = name;
        o.age = age;
        o.job = job;
        o.friends = [ "Tom", "Jerry" ];
        
        o.sayName = function() {
            console.log(this.name);
        };

        return o;
    }

    // Note the difference to Factory Pattern
    var person1 = new Person("Max", 7, "Software Developer");
    var person2 = new Person("Alex", 5, "Doctor");

    person1.friends.push("Haha");

    console.log(person1.friends);   // [ 'Tom', 'Jerry', 'Haha' ]
    console.log(person2.friends);   // [ 'Tom', 'Jerry' ]

    console.log(person1.sayName == person2.sayName);    // false !!

    /*
    This pattern allows you to create constructors for objects that may not be possible otherwise.
    Since you don't have direct access to Array constructor, this pattern works:
    */

   function SpecialArray() {
        //create the array
        var values = new Array();
        //add the values
        values.push.apply(values, arguments);
        //assign the method
        values.toPipedString = function() {
            return this.join("|"); 
        };
        return values; 
    }

    var colors = new SpecialArray("red", "blue", "green");
    console.log(colors.toPipedString());    // "red|blue|green"

})();


//// Durable Constructor Pattern (by Douglas Crockford)

(function() {
    console.log("//// Durable Constructor Pattern - hide the secret in");

    function Person(name, age, job) {
        var o = new Object();

        // optional: define private variables / functions here
        var _age = age;
        
        o.sayName = function() {
            console.log(name);
        };

        return o;
    }

    var friend = Person("Max", 7, "Software Developer");
    friend.sayName();

    console.log(friend.name);   // undefined
    console.log(friend.age);    // undefined

})();


// INHERITANCE

//// Prototype Chaining

(function() {
    console.log("//// Prototype Chaining");

    function SuperType() {
        this.property = true;
    }

    SuperType.prototype.getSuperValue = function() {
        return this.property;
    };

    SuperType.prototype.sayHello = function() {
        console.log('Hello');
    }

    function SubType() {
        this.subProperty = false;
    }

    // inherit from SuperType
    SubType.prototype = new SuperType();

    // new method
    SubType.prototype.getSubValue = function() {
        return this.subProperty;
    }

    // override existing method
    SubType.prototype.sayHello = function() {
        console.log('Hi');
    }

    var instance = new SubType();

    console.log(instance.getSuperValue());  // true
    console.log(instance.getSubValue());    // false

    // Inheritance: instance -> SubType -> SuperType -> Object
    // See figure 6-5

    console.log(instance instanceof SubType);   // true
    console.log(instance instanceof SuperType); // true
    console.log(instance instanceof Object);    // true

    console.log(SubType.prototype.isPrototypeOf(instance));     // true
    console.log(SuperType.prototype.isPrototypeOf(instance));   // true
    console.log(Object.prototype.isPrototypeOf(instance));      // true

    instance.sayHello();


})();


//// Constructor Stealing

(function() {
    console.log("//// Constructor Stealing - Problems with Prototype Chaining");

    function SuperType() {
        this.colours = [ "red", "blue", "green" ];
    }

    function SubType() {}

    // inherit from SuperType
    SubType.prototype = new SuperType();

    var instance1 = new SubType();
    var instance2 = new SubType();

    instance1.colours.push("black");

    console.log(instance1.colours); // [ 'red', 'blue', 'green', 'black' ]
    console.log(instance2.colours); // [ 'red', 'blue', 'green', 'black' ] !!!

})();

(function() {
    console.log("//// Constructor Stealing");

    function SuperType(name) {
        this.name = name;

        this.colours = [ "red", "blue", "green" ];
    }

    function SubType() {
        // inherit from SuperType, also optionally pass the constructor arguments
        SuperType.call(this, "Alex");
    }

    var instance1 = new SubType();
    var instance2 = new SubType();

    instance1.colours.push("black");

    console.log(instance1.colours); // [ 'red', 'blue', 'green', 'black' ]
    console.log(instance2.colours); // [ 'red', 'blue', 'green' ]

    console.log(instance1.name);    // "Alex"

    /*
    The downside to using constructor stealing exclusively is that it introduces the same 
    problems as the constructor pattern for custom types: methods must be defined inside 
    the constructor, so there’s no function reuse. Furthermore, methods defined on the 
    supertype’s prototype are not accessible on the subtype, so all types can use only the 
    constructor pattern. Because of these issues, constructor stealing is rarely used on 
    its own.
    */

})();

//// Combination Inheritance

(function() {
    console.log("//// Combination Inheritance");

    function SuperType(name) {
        this.name = name;

        this.colours = [ "red", "blue", "green" ];
    }

    SuperType.prototype.sayName = function() {
        console.log(this.name);
    }

    function SubType(name, age) {
        // inherit properties
        SuperType.call(this, name);

        this.age = age;
    }

    // inherit methods
    SubType.prototype = new SuperType();

    // optional
    SubType.prototype.constructor = SubType;

    SubType.prototype.sayAge = function() {
        console.log(this.age);
    }

    var instance1 = new SubType("Max", 7);
    var instance2 = new SubType("Alex", 5);

    instance1.colours.push("black");

    console.log(instance1.colours); // [ 'red', 'blue', 'green', 'black' ]
    instance1.sayName();
    instance1.sayAge();

    console.log(instance2.colours); // [ 'red', 'blue', 'green' ]
    instance2.sayName();
    instance2.sayAge();

})();

//// Prototypal Inheritance

(function() {
    console.log("//// Prototypal Inheritance by Douglas Crockford");

    // implementation
    function object(o) {
        function F() {}
        F.prototype = o;
        return new F();
    }

    // ECMAScript 5 introduces Object.create(object_used_as_prototype[, properties])
    var person = {
        name: "Max",
        friends: [ "Alex", "Johnny", "Jerry" ]
    };

    var anotherPerson = Object.create(person);
    anotherPerson.name = "Greg";
    anotherPerson.friends.push("Rob");

    /* 
    The new object has `person` as its prototype, meaning that it has both a primitive
    value property and a reference value property on tis prototype. This also means
    that `person.friends` is shared not only by `person` but also with its inheritances.
    */

    console.log(person.friends);    // [ 'Alex', 'Johnny', 'Jerry', 'Rob' ] !!

    var yetAnotherPerson = Object.create(person, {
        name: {
            value: "Greg"
        }
    });

    console.log(yetAnotherPerson.name); // "Greg"
    console.log(person.name);           // "Max"


})();

//// Parasitic Inheritance

(function() {
    console.log("//// Parasitic Inheritance by Douglas Crockford");
    
    // implementation
    function object(o) {
        function F() {}
        F.prototype = o;
        return new F();
    }

    function createAnother(original) {
        var clone = object(original);

        clone.sayHi = function() {
            console.log("hi");
        }

        return clone;
    }

})();

//// Parasitic Combination Inheritance

(function() {
    console.log("//// Parasitic Combination Inheritance");
    // YUI firstly included via Y.extend() method

    function object(o) {
        function F() {}
        F.prototype = o;
        return new F();
    }

    function inheritPrototype(subType, superType) {
        var prototype = object(superType.prototype);
        prototype.constructor = subType;
        subType.prototype = prototype;
    }

    function SuperType(name) {
        this.name = name;

        this.colours = [ "red", "blue", "green" ];
    }

    SuperType.prototype.sayName = function() {
        console.log(this.name);
    }
    
    function SubType(name, age) {
        // inherit properties
        SuperType.call(this, name);         // Second call to SuperType()

        this.age = age;
    }

    // inherit methods
    // SubType.prototype = new SuperType();    // first call to SuperType() -- now saved from Parasitic Combination Inheritance
    // SubType.prototype.constructor = SubType;
    inheritPrototype(SubType, SuperType);

    SubType.prototype.sayAge = function() {
        console.log(this.age);
    }

    /*
    This example is more efficient in that the SuperType constructor is being called only one
    time, avoiding having unnecessary and unused properties on SubType.prototype. Furthermore, 
    the prototype chain is kept intact, so both instanceof and isPrototypeOf() behave as they 
    would normally. 
    
    Parasitic combination inheritance is considered the most optimal inheritance paradigm for 
    reference types.
    */

})();
