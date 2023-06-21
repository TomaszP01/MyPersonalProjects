let runningTotal = 0;
let previousOperator;
let buffer = "0";
const bufferMaxLength = 14;
const typeMaxLength = 10;

const screen = document.querySelector(".screen");

function buttonClick(value) {
	if (previousOperator === "=") {
		buffer = "0";
		previousOperator = null;
	}
	if (isNaN(value)) {
		handleSymbol(value);
	} else {
		handleNumber(value);
	}
	screen.innerText = buffer;
}
function handleSymbol(symbol) {
	if (buffer == previousOperator) {
		buffer = symbol;
		previousOperator = symbol;
	}
	switch (symbol) {
		case "C":
			buffer = "0";
			runningTotal = 0;
			break;
		case "=":
			if (previousOperator === null) {
				return;
			}
			flushOperation(parseFloat(buffer));
			buffer = runningTotal;
			runningTotal = 0;
			previousOperator = "=";
			break;
		case "←":
			if (buffer.length === 1) {
				buffer = "0";
			} else {
				buffer = buffer.substring(0, buffer.length - 1);
			}
			break;
		case ",":
			if (buffer.includes(".")) {
				break;
			} else {
				buffer += ".";
				break;
			}
		case "+":
		case "−":
		case "×":
		case "÷":
			handleMath(symbol);
			break;
	}
}
function handleMath(symbol) {
	if (isNaN(buffer)) {
		return;
	}
	const floatBuffer = parseFloat(buffer);

	if (runningTotal === 0) {
		runningTotal = floatBuffer;
	} else {
		flushOperation(floatBuffer);
	}
	previousOperator = symbol;
	buffer = previousOperator;
}
function flushOperation(floatBuffer) {
	if (previousOperator === "+") {
		runningTotal += floatBuffer;
	} else if (previousOperator === "−") {
		runningTotal -= floatBuffer;
	} else if (previousOperator === "×") {
		runningTotal *= floatBuffer;
	} else if (previousOperator === "÷") {
		runningTotal /= floatBuffer;
	}
}
function handleNumber(numberString) {
	if (buffer == previousOperator) {
		buffer = "0";
	}
	if (buffer.length >= typeMaxLength) {
		return;
	}
	if (buffer === "0") {
		buffer = numberString;
	} else {
		buffer += numberString;
	}
}
function init() {
	document
		.querySelector(".calc-buttons")
		.addEventListener("click", function (event) {
			buttonClick(event.target.innerText);
		});
}
init();
