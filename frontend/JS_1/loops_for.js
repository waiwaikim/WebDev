console.log("Print all number between -10 and 19");

for (var i=-10; i<20; i++){
	console.log(i);
}


console.log("Print all even number between 10 and 50");

for(var i=10; i<=50; i+=2){
	console.log(i);
}

console.log("Print all odd numbers between 300 and 333");

for(var i=300; i<=333; i++){
	if(i%2===1){
		console.log(i);
	}
}
console.log("print all numbers divisible by 5 AND 3 between 5 and 50");

for(var i=5; i<=50; i++){
	if(i%5===0 && i%3===0){
		console.log(i);
	}
}