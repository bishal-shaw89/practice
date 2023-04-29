var num1Element = document.getElementById('num1'); // we are defining the element as 'HTMLInputElement' it is known as 'type casting'
var num2Element = document.getElementById('num2');
var btn = document.querySelector('button'); // we are setting the button cannot be null
var numArray = [];
var textArray = [];
function add(num1, num2) {
    if (typeof num1 === 'number' && typeof num2 === 'number') {
        return num1 + num2;
    }
    else if (typeof num1 === 'string' && typeof num2 === 'string') {
        return num1 + ' ' + num2;
    }
    return +num1 + +num2;
}
btn.addEventListener('click', function () {
    var num1 = num1Element.value;
    var num2 = num2Element.value;
    var numResult = add(+num1, +num2); // adding '+' sign in front of variables means we are converting the variables to number
    numArray.push(numResult); // defining the output as number so that it can store the result in number array type.
    //console.log(result);
    var stringResult = add(num1, num2);
    textArray.push(stringResult); // defining the output as string so that it can store the result in string array type.
    console.log(numArray, textArray);
});
