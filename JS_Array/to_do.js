window.setTimeout(function() {

	var todo = ["go to the gym"]; 

	while(input !== "quit"){
		var input = prompt("what would you like to do?")

		if(input === "list"){
			console.log(todo);
		}
		else if(input === "new"){
			var newTodo = prompt("Enter new todo");
			todo.push(newTodo);
		}
	}

	console.log("You have terminated the app");


}, 500);

