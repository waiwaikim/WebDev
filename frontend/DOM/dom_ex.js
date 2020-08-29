var p1Button = document.querySelector("#p1");
var p2Button = document.querySelector("#p2");
var resetButton = document.querySelector("#reset");
var numInput = document.querySelector("input");

var p1Display = document.querySelector("#p1Display");
var p2Display = document.querySelector("#p2Display");
var p1Score = 0;
var p2Score = 0;
var winningScoreDisplay = document.querySelector("p span");


var gameOver = false; 
var winningScore = 5;

p1Button.addEventListener("click", function(){
    if(!gameOver){
        p1Score++;
        p1Display.textContent = p1Score;
        //console.log(p1Score, winningScore);
        if(p1Score == winningScore){
            console.log("gameOver");
            gameOver=true;
            p1Display.classList.add("winner");
        }
    }
 
});
p2Button.addEventListener("click", function(){
    if(!gameOver){
        p2Score++;
        p2Display.textContent = p2Score;
        if(p2Score == winningScore){
            console.log("gameOver");
            gameOver=true;
            p1Display.classList.add("winner");
        }
    }
});

resetButton.addEventListener("click", function(){
    reset();
});

function reset(){
    gameOver = !gameOver;
    p1Score = 0;
    p2Score = 0;
    p1Display.textContent = p1Score;
    p2Display.textContent = p2Score;
    p1Display.classList.remove("winner");
    p2Display.classList.remove("winner");
}

numInput.addEventListener("change", function(){
    winningScoreDisplay.textContent = numInput.value;
    winningScore = Number(numInput.value);
    reset();
})