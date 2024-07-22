document.addEventListener('DOMContentLoaded', () => {
    let currentIndex = 0;
    let outputArray = [];
    let isManualInput = true;
    let inputBoxElem = document.querySelector("#number-input");
    let outputElem = document.querySelector("#output");

    inputBoxElem.addEventListener("input", () => {
        if (isManualInput) {
            outputArray[currentIndex] = Number(inputBoxElem.value);
            console.log(outputArray);
        }
        outputElem.innerText = outputArray.join(" ");
    });

    window.operatorBtn = function (operator) {
        if (typeof outputArray[outputArray.length - 1] == "number") {
            console.log(outputArray);
            outputArray.push(operator);
            console.log(outputArray);
            outputElem.innerText = outputArray.join(" ");
            inputBoxElem.value = "";
            currentIndex += 2;
        }
    };

    window.equalsBtn = function () {
        if (typeof outputArray[outputArray.length - 1] == "number") {
            let result = equalsBtnlogic();
            outputArray.push("=", result);
            console.log(outputArray);
            inputBoxElem.value = "";
            outputElem.innerText = outputArray.join(" ");
            outputArray = [result];
            console.log(outputArray);
            currentIndex = 0;
        }
    };

    function equalsBtnlogic() {
        let calcArray = outputArray.slice();
        for (let i = 0; i < calcArray.length; i++) {
            if (calcArray[i] == "x") {
                calcArray.splice(i - 1, 3, calcArray[i - 1] * calcArray[i + 1]);
                i--;
            } else if (calcArray[i] == "÷") {
                calcArray.splice(i - 1, 3, calcArray[i - 1] / calcArray[i + 1]);
                i--;
            }
        }
        console.log(`calcArray is: ${calcArray}`);

        let equals = calcArray[0];
        for (let i = 1; i < calcArray.length; i += 2) {
            if (calcArray[i] == "+") {
                equals += calcArray[i + 1];
            } else if (calcArray[i] == "-") {
                equals -= calcArray[i + 1];
            }
        }
        return equals;
    }

    window.numberBtn = function (number) {
        isManualInput = false;
        inputBoxElem.value += number;
        isManualInput = true;
        outputArray[currentIndex] = Number(inputBoxElem.value);
        outputElem.innerText = outputArray.join(" ");
    };

    window.clearAll = function () {
        currentIndex = 0;
        outputArray = [];
        inputBoxElem.value = "";
        outputElem.innerText = outputArray.join(" ");
        console.log(outputArray);
    };

    document.addEventListener("keydown", (event) => {
        if (event.key >= '0' && event.key <= '9') {
            event.preventDefault();
            isManualInput = false;
            inputBoxElem.value += event.key;
            isManualInput = true;
            outputArray[currentIndex] = Number(inputBoxElem.value);
            outputElem.innerText = outputArray.join(" ");
        } else if (['+', '-', '*', '/'].includes(event.key)) {
            event.preventDefault();
            if (event.key === '/') {
                operatorBtn('÷');
            } else if (event.key === '*') {
                operatorBtn('x');
            } else {
                operatorBtn(event.key);
            }
        } else if (event.key === 'Enter') {
            equalsBtn();
        } else if (event.key === 'c' || event.key === 'C') {
            clearAll();
        } else if (event.key === 'Backspace') {
            event.preventDefault();
            if (inputBoxElem.value.length > 0) {
                inputBoxElem.value = inputBoxElem.value.slice(0, -1);
                if (inputBoxElem.value !== "") {
                    outputArray[currentIndex] = Number(inputBoxElem.value);
                } else {
                    delete outputArray[currentIndex];
                }
                outputElem.innerText = outputArray.join(" ");
            }
        }
    });
});
