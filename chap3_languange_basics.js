

// data types
function data_types() {
    //                                      // undefined
    var example_undefined1;                 // undefined
    var example_undefined2 = undefined;     // undefined                                       
    var example_null = null;                // object *
    var example_string = "abc";             // string
    var example_boolean = true;             // boolean
    var example_integer = 123;              // number
    var example_float = 1.23;               // number
    var example_array = new Array;          // object *
    var example_object = new Object();      // object
    var example_funciton = function() {};   // function

    console.log(typeof example_undefined0);
    console.log(typeof example_undefined1);
    console.log(typeof example_undefined2);
    console.log(typeof example_null);
    console.log(typeof example_string);
    console.log(typeof example_boolean);
    console.log(typeof example_integer);
    console.log(typeof example_float);
    console.log(typeof example_array);
    console.log(typeof example_object);
    console.log(typeof example_funciton);
}


function convert_examples() {
    function convert_to_type(v, conv_func) {
        if (conv_func.name == 'toString') {
            console.log(`${v} => ` + v.toString());
        } else {
            console.log(`${v} => ` + conv_func(v));
        }
    }

    // convert to boolean
    convert_to_type("abc", Boolean); // true
    convert_to_type("", Boolean);    // false

    convert_to_type(123, Boolean);                        // true
    convert_to_type(Number.MAX_VALUE, Boolean);           // true
    convert_to_type(Number.POSITIVE_INFINITY, Boolean);   // true
    convert_to_type(0, Boolean);                          // false
    convert_to_type(NaN, Boolean);                        // false

    convert_to_type(new Object(), Boolean); // true
    convert_to_type(null, Boolean);         // false
    convert_to_type(undefined, Boolean);    // false

    // Note: in `if (...)` the condition is converted to boolean following above rule

    // convert to number
    convert_to_type(true, Number);  // 1
    convert_to_type(false, Number); // 0

    convert_to_type(null, Number);      // 0
    convert_to_type(undefined, Number); // NaN

    convert_to_type("123", Number);     // 123
    convert_to_type("011", Number);     // 11
    convert_to_type("1.23", Number);    // 1.23
    convert_to_type("-123", Number);    // -123
    convert_to_type("0xf", Number);     // 15
    convert_to_type("", Number);        // 0
    convert_to_type("123abc", Number);  // NaN
    convert_to_type("abc", Number);     // NaN

    // TODO Object

    // NOTE: parseInt is a better option for string

    convert_to_type("123", parseInt);     // 123
    convert_to_type("011", parseInt);     // 11
    convert_to_type("1.23", parseInt);    // 1.23
    convert_to_type("-123", parseInt);    // -123
    convert_to_type("0xf", parseInt);     // 15
    convert_to_type("", parseInt);        // NaN *
    convert_to_type("123abc", parseInt);  // 123 *
    convert_to_type("abc", parseInt);     // NaN

    // parseInt with different base

    console.log(parseInt("10", 2));     // 2, parse as binary
    console.log(parseInt("10", 8));     // 8, parse as octal
    console.log(parseInt("10", 10));    // 10, parse as decimal
    console.log(parseInt("10", 16));    // 16, parse as hexadecimal

    // convert number back to binary / octal / hexadcimal etc by specify a radix (base)

    var num = 10;
    console.log(num.toString());    // 10
    console.log(num.toString(2));   // 1010
    console.log(num.toString(8));   // 12
    console.log(num.toString(10));  // 10
    console.log(num.toString(16));  // a
    console.log(num.toString(6));   // 14

    // NOTE: there is no difference when escaping inside single or dobule quotes

    console.log("AAA\n");
    console.log('AAA\n');

    // convert to string (note the difference on toString() and String())

    convert_to_type(10, toString);              // '10'
    convert_to_type(true, toString);            // 'true'
    // convert_to_type(null, toString);         // exception
    // convert_to_type(undefined, toString);    // exception

    convert_to_type(10, String);                // '10'
    convert_to_type(true, String);              // 'true'
    convert_to_type(null, String);              // 'null' *
    convert_to_type(undefined, String);         // 'undefined' *

    // NOTE: third way: by adding (+) an empty string to that value

    console.log(10 + '');           // '10'
    console.log(true + '');         // 'true'
    console.log(null + '');         // 'null'
    console.log(undefined + '');    // 'undefined'
}

// Object

var o = new Object();
var o = new Object;     // legal, but not recommended
var o = {};             // literal

// constructor
// o.hasOwnProperty();
// o.isPrototypeOf();
// o.propertyIsEnumerable();
// o.propertyIsEnumerable();
// o.toLocaleString();
// o.toString();
// o.valueOf();

// with (object) statement;


function compare_examples() {
    function test_compare(e) {
        console.log(`${e}: ` + eval(e));
    }
    
    // equal, will do conversions first (type coercion)
    // NOTE: rules:
    // 1. convert boolean to numeric
    // 2. when compare string with number, convert string to number
    // 3. when compare object with non-object, call object.valueOf()
    
    test_compare("null == undefined");  // true
    test_compare("'NaN' == NaN");       // false
    test_compare("NaN == NaN");         // false !!
    test_compare("NaN != NaN");         // true
    test_compare("false == 0");         // true !!
    test_compare("true == 1");          // true !!
    test_compare("true == 2");          // false
    test_compare("undefined == 0");     // false
    test_compare("null == 0");          // false
    test_compare("'5' == 5");           // true !!
    
    // identical equal
    test_compare("NaN === NaN");        // false
    test_compare("false === 0");        // false
    test_compare("true === 1");         // false
    test_compare("'5' === 5");          // false
}




