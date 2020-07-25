// var joke = require("knock-knock-jokes");
// var catMe = require("cat-me");

// console.log(joke());
// console.log(catMe("thoughtful"));

var faker = require("faker");


console.log("===================== \n WELCOME TO MY SHOP \n =====================");
for (let i = 0; i < 10; i++) {
    var product_name = faker.commerce.productName();
    var product_price = faker.commerce.price(); 
    console.log(product_name +" - $"+ product_price);   
}



