var numSquares = 6; 
var colors = [];
var pickedColor ;
var squares = document.querySelectorAll(".square");

var colorDisplay = document.querySelector("#colorDisplay");
var messageDispaly = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");

init();

function init(){
    for (let i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
    
            this.textContent === "Easy" ? numSquares=3: numSquares=6;
            reset();
        }); 
    }
    for (let i = 0; i < squares.length; i++) {

        squares[i].addEventListener("click", function(){
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
    
    reset();
}



function reset(){
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    messageDispaly.textContent= "";
    resetButton.textContent = "new color"

    for (let i = 0; i < squares.length; i++) {
        if(colors[i]){
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        }
        else{
            squares[i].style.display = "none";
        }
    }
    h1.style.backgroundColor = "steelblue"

}

// easyBtn.addEventListener("click", function(){
//     easyBtn.classList.add("selected");
//     hardBtn.classList.remove("selected");
//     numSquares = 3; 
//     colors = generateRandomColors(numSquares);
//     pickedColor = pickColor();
//     colorDisplay.textContent = pickedColor;
//     for (let i = 0; i < squares.length; i++) {
//         if(colors[i]){
//             squares[i].style.backgroundColor = colors[i];
//         }
//         else{
//             squares[i].style.display = "none";
//         }
//     }
// })

// hardBtn.addEventListener("click", function(){
//     hardBtn.classList.add("selected");
//     easyBtn.classList.remove("selected");

//     numSquares = 6; 
//     colors = generateRandomColors(numSquares);
//     pickedColor = pickColor();
//     colorDisplay.textContent = pickedColor;
//     for (let i = 0; i < squares.length; i++) {
//         squares[i].style.backgroundColor = colors[i];
//         squares[i].style.display = "block";
//     }
// })

resetButton.addEventListener("click", function(){
    reset();
} )

colorDisplay.textContent = pickedColor;


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