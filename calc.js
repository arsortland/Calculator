const display = document.querySelector('#display');
const buttons = document.querySelectorAll('button');
const equals = document.querySelector('.equals');
const bckspace = document.querySelector('#bck');
const dot = document.querySelector('#dot');
let currentCalc = display.value;
let doneCalc = undefined;

function add(a,b){
    display.value = (a+b);
}
function subtract(a,b){
    display.value = (a-b);
}
function multiply(a,b){
    display.value = (a*b);
}
function divide(a,b){
    display.value = (a/b);
}

function operate(oper, a, b){ //make a and b array for allowing multiple numbers?
    switch (oper){
        case "+":
            add(a,b);
            break;
        case "-":
            subtract(a,b);
            break;
        case "*":
            multiply(a,b);
            break;
        case "/":
            divide(a,b);
            break;
    }
}

function writeToDisplay(){
    buttons.forEach(btn => btn.addEventListener('click', () =>{
        if (btn == bckspace){
           backspace();
        }else if (btn == dot){
            disableDot();
        }else{
            display.value += btn.textContent;
            currentCalc = display.value;
            console.log(currentCalc);
        }
    }));
}

function clearCalc(){
    const clear = document.getElementById('clr');
    clear.addEventListener('click', () => location.reload());
}

function backspace(){
    display.value = display.value.slice(0, -1);
}

function disableDot(){
    if (display.value.includes('.')){
        dot.disabled = true;
    }else{
        display.value = display.value.concat(".")
    }
}

function calculate(){                               //need a reaload to clear before displaying result.
    equals.addEventListener('click',function(){
        const operato = currentCalc.match(/[+,-,*,/]/g);
        const calcArr = currentCalc.split(/[+,-,*,/]/g);
        console.log(operato.toString());
        console.log(parseFloat(calcArr[0]));
        console.log(parseFloat(calcArr[1]));
        console.log(operato);
        operate(operato.toString(), parseFloat(calcArr[0]), parseFloat(calcArr[1].slice(0, -1)));


    });
}
writeToDisplay();
clearCalc();

calculate();


