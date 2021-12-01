class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear () {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === "") return
        if (this.previousOperand !== "") {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ""
    }   

    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return 
        
        
        switch (this.operation) {
            case "+": 
                computation = prev + current
            break 

            case "-": 
                computation = prev - current
            break 

            case "*": 
                computation = prev * current
                console.log("test")
            break 

            case "÷": 
            
                computation = prev / current

            break 
            default: return
        }
        this.currentOperand = computation
        this.operation = undefined 
        this.previousOperand = ""
    }

    getDisplayNumber (number) {
        const stringNumber = number.toString()
        const integerDigit = parseFloat(stringNumber.split(".")[0])
        const decimalDigit = stringNumber.split(".")[1]
        let integerDisplay
        if(isNaN(integerDigit)) {
            integerDisplay = ""
        } else {
            integerDisplay = integerDigit.toLocaleString("en", {maximumFractionDigits: 0})
        }

        if (decimalDigit != null) {
            return `${integerDisplay}. ${decimalDigit}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation === "÷" && this.currentOperand === "0"){
            this.currentOperandTextElement.innerText = "Don't devide by zero!"
            this.clear()
        }
        
        else if (this.operation != null) {
            
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ""
        }
        
    }

}


// connecting DOM  nodes

const numberButtons = document.querySelectorAll("[data-number]")
const operationButtons = document.querySelectorAll("[data-operation]")
const equalsButton = document.querySelector("[data-equals]")
const deleteButton = document.querySelector("[data-delete]")
const allClearButton = document.querySelector("[data-all-clear]")
const previousOperandTextElement = document.querySelector("[data-previous-operand]")
const currentOperandTextElement = document.querySelector("[data-current-operand]")

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)


// event listeners for keyboard navigation 

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    } )
})

document.onkeydown = function (e) {
    let temp = e.key
    console.log(temp.charCodeAt(0))
    if (temp.charCodeAt(0) >= 48 && temp.charCodeAt(0) <= 57) {
        calculator.appendNumber(parseInt(e.key))
        calculator.updateDisplay()
    }

    if (temp.charCodeAt(0) === 47 || temp.charCodeAt(0) === 43 || temp.charCodeAt(0) === 42 || temp.charCodeAt(0) === 45) {
        calculator.chooseOperation(e.key)
        calculator.updateDisplay()
        console.log("ope")
    }

    if (temp.charCodeAt(0) === 69) {
        calculator.compute()
        calculator.updateDisplay()
    }

    if (temp.charCodeAt(0) === 66) {
        calculator.delete()
        calculator.updateDisplay()
    }
}

// event listener for CMD + Backspace for a clear 

    let keys = {
        b: false,
        m: false,
      };
  
      addEventListener("keydown", (event) => {
        if (event.key === "Meta") {
          keys.m = true;
        }
        if (event.key === "Backspace") {
          keys.b = true;
        }
  
      if(keys.m && keys.b){

        calculator.clear()
        calculator.updateDisplay()
      }
  
      });
  
      addEventListener("keyup", (event) => {
        if (event.key === "Meta") {
          keys.m = false;
        }
        if (event.key === "Backspace") {
          keys.b = false;
        }
      });

// event listeners for button control

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    } )
})

equalsButton.addEventListener("click", button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener("click", button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener("click", button => {
    calculator.delete()
    calculator.updateDisplay()
})

