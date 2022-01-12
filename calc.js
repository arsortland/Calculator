const display = document.querySelector('#display');
const topdisplay = document.querySelector('#topdisplay');
const buttons = document.querySelectorAll('button');
const equals = document.querySelector('.equals');
const bckspace = document.querySelector('#bck');
const dot = document.querySelector('#dot');
const btnoperators = document.querySelectorAll('.oper');


function clearCalc(){
    const clear = document.getElementById('clr');
    clear.addEventListener('click', () => location.reload());
}

function backspace(amount = -1){
    display.value = display.value.slice(0, amount);
}

function disableDot(){
    if (display.value.includes('.')){
        dot.disabled = true;
    }else{
        display.value = display.value.concat(".")
        dot.disabled = true;
    }
}

function disableOperators(){
    if (!display.value.length >0){
        btnoperators.forEach(btn => btn.disabled = false);
    }
}

function GotCha(op, n1, n2){
    if (op === "/" && (n1 === 0 || n2 === 0)){
        return topdisplay.value = "3RR0R! - Can't do that silly!"
    }
}

function keyPress(){
    window.addEventListener('keydown', e =>{
        if (e.keyCode === 13){
            calculate();
        }else if (e.keyCode === 27){
            location.reload();
        }
    });
}

function add(a,b){
    topdisplay.value = a+b;
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
     if (!a || !b){
         topdisplay.value = "Error!";
         return;
     }
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
        default:
            display.value = "Incomplete expression"
    }
}

function writeToDisplay(){
    buttons.forEach(btn => btn.addEventListener('click', () =>{
        disableOperators();
        if (btn == bckspace){
           backspace();
        }else if (btn == dot){
            disableDot();
        }else{
            display.value += btn.textContent;
        }
    }));
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
        let val = display.value;
        if (val.includes('+') || val.includes('-') || val.includes('*') || val.includes('/')){
            calculate();
        }else {
            backspace();
        }
    });
}

function calculate(){  
        const operatorsUsed = display.value.match(/[+,\-,*,/]/g);
        const numUsed = display.value.split(/[+,\-,*,/]/g);
            let firstnum = parseFloat(numUsed[0]);
            let secondnum = parseFloat(numUsed[1]);
                if (GotCha(operatorsUsed[0], firstnum, secondnum)){          
                }else{
                    if (topdisplay.value[0] === '-'){
                        firstnum = parseFloat(topdisplay.value);
                        secondnum = parseFloat(numUsed[2].slice(0,-1));
                        const opuse = display.value.slice(1).match(/[+,\-,*,/]/g);
                        operate(String(opuse),firstnum, secondnum);
                        display.value = topdisplay.value;
                    }else{
                        operate(operatorsUsed[0], firstnum, secondnum);
                        display.value = topdisplay.value;
                    }
                };
}

document.querySelector('#display').focus();
topdisplay.disabled = true;
btnoperators.forEach(btn => btn.disabled = true);
writeToDisplay();
clearCalc();
equalCalculate();
expressionCalc();
keyPress();