const secretNumber = 4;

const guess = Number(prompt("Guess a number: "))

if (secretNumber === guess) {
	alert("you got it right!")
}
else if (guess > secretNumber) {
	alert("Too high. Guess Again: ")
}
else {
	alert("Too low. Guess again")
}