function isEven(num){
	// if(num%2 ===0){
	// 	return true;
	// }
	// else{
	// 	return false;
	// }

	return num%2===0;
}

function factorial(num){
	init = 1;
	for(i=num; i>1; i--){
		init = init * i;
	}
	return init;
}

function kebabToSnake(str){

	// newStr= "";
	// for(i=0; i< str.length; i++){
	// 	if(str[i]==="-"){
	// 		newStr += "_";
	// 	}
	// 	else{
	// 		newStr += str[i];
	// 	}
	// }
	// return newStr;
	var new_str = str.replace(/-/g, "_");
	return new_str;
}