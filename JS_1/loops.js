console.log("Print all number between -10 and 19");

let num1 = -10 ; 
while (num1 < 20) {
	console.log(num1);
	num1 +=1;
}

console.log("Print all even number between 10 and 50");

let num2 = 10; 
while (num2 <= 50){
	console.log(num2);
	num2 += 2;
}

console.log("Print all odd numbers between 300 and 333");

let num3 = 300;
while (num3 <= 333) {
	num3 += 1;
	if (num3 % 2 ===1) {
		console.log(num3);
	}
}

console.log("print all numbers divisible by 5 AND 3 between 5 and 50");

let num4 = 5;

while (num4 <= 50){
	if (num4%5 === 0 && num4%3 ===0){
		console.log(num4);
	}
	num4 +=1;
}