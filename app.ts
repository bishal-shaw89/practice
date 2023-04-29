const num1Element = document.getElementById('num1') as HTMLInputElement; // we are defining the element as 'HTMLInputElement' it is known as 'type casting'
const num2Element = document.getElementById('num2') as HTMLInputElement;
const btn = document.querySelector('button')!; // we are setting the button cannot be null

const numArray: number[] = [];
const textArray: string[] = [];

type NumOrString = number | string; // type alias

//function add(num1:number | string, num2:number | string) { // assign different type of type casting known as union types
function add(num1:NumOrString, num2:NumOrString) { // assign different type of type casting known as union types
    if (typeof num1 === 'number' && typeof num2 === 'number') {
        return num1 + num2;
    } else if(typeof num1 === 'string' && typeof num2 === 'string'){
        return num1 + ' '+ num2;
    }
    return +num1 + +num2;
}

btn.addEventListener('click', ()=>{
    const num1 = num1Element.value;
    const num2 = num2Element.value;
    const numResult = add(+num1, +num2);// adding '+' sign in front of variables means we are converting the variables to number
    numArray.push(numResult as number);// defining the output as number so that it can store the result in number array type.
    //console.log(result);
    const stringResult = add(num1, num2);
    textArray.push(stringResult as string);// defining the output as string so that it can store the result in string array type.
    console.log(numArray, textArray);
    
});
