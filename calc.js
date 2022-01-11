const display = document.querySelector('#display');
const topdisplay = document.querySelector('#topdisplay');
const buttons = document.querySelectorAll('button');
const equals = document.querySelector('.equals');
const bckspace = document.querySelector('#bck');
const dot = document.querySelector('#dot');
const btnoperators = document.querySelectorAll('.oper');

let currentCalc = display.value;
let doneCalc = topdisplay.value;

function add(a,b){
    topdisplay.value = (a+b);
}
function subtract(a,b){
    topdisplay.value = (a-b);
}
function multiply(a,b){
    topdisplay.value = (a*b);
}
function divide(a,b){
    topdisplay.value = (a/b);
}

function operate(oper, a, b){
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
            console.log(display.value);
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
        dot.disabled = true;
    }
}

function GotCha(op, n1, n2){
    if (op === "/" && (n1 === 0 || n2 === 0)){
        return true;
    }
}

function expressionCalc(){
    btnoperators.forEach(btn => btn.addEventListener('mousedown', () =>{
        let val = display.value;
        if (val.includes('+') || val.includes('-') || val.includes('*') || val.includes('/')){
            calculate();
        }
    }));
}

function equalCalculate(){
    equals.addEventListener('click', ()=>{
        calculate();
        backspace();
    });
}

function calculate(){  
        const operato = display.value.match(/[+,\-,*,/]/g);
        const calcArr = display.value.split(/[+,\-,*,/]/g);
        let firstnum = parseFloat(calcArr[0]);
        let secondnum = parseFloat(calcArr[1]);
        try{
            if (GotCha(operato.toString(), firstnum, secondnum)){
                topdisplay.value = "3RR0R! - Can't do that silly!"
            }else {
                operate(operato.toString(), firstnum, secondnum);
            };
        }
        catch{
            ;
        };
}
writeToDisplay();
clearCalc();
equalCalculate();
expressionCalc();


//parameter that stores the last result and uses it for the next calc?