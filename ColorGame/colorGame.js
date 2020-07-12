var colors = generateRandomColors(6);

var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.querySelector("#colorDisplay");
var messageDispaly = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");

easyBtn.addEventListener("click", function(){
    easyBtn.classList.add("selected");
    hardBtn.classList.remove("selected");
})

hardBtn.addEventListener("click", function(){
    hardBtn.classList.add("selected");
    easyBtn.classList.remove("selected");
})

resetButton.addEventListener("click", function(){
    colors = generateRandomColors(6);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;

    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
    }
    h1.style.backgroundColor = "#232323";
} )

colorDisplay.textContent = pickedColor;

for (let i = 0; i < squares.length; i++) {
    const e = squares[i];
    e.style.backgroundColor = colors[i];

    e.addEventListener("click", function(){
        var clicked_color = this.style.backgroundColor;

        console.log(pickedColor, clicked_color);
        if(clicked_color === pickedColor){
            messageDispaly.textContent = "Correct";
            changeColor(clicked_color);
            h1.style.backgroundColor = clicked_color;
            resetButton.textContent = "Play Again";
        }
        else{
            this.style.backgroundColor = "#232323";
            messageDispaly.textContent = "Try Again";
        }
    })
}

function changeColor(color){
    for (let i = 0; i < colors.length; i++) {
        squares[i].style.backgroundColor = color;      
    }
}

function pickColor(){
    var randNum =  Math.floor(Math.random()*colors.length +1);
    return colors[randNum];
}

function generateRandomColors(num){
    var arr = [];
    for (let i = 0; i < num; i++) {
       arr.push(randomColor());
    }
    return arr;
}

function randomColor(){
    var r = Math.floor(Math.random()*256);
    var g = Math.floor(Math.random()*256);
    var b = Math.floor(Math.random()*256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}