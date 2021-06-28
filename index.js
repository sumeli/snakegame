//Game Constants and Variable

let inputDir = {x: 0, y: 0};
const foodSound = new Audio("eat.mp3");
const moveSound = new Audio("move.mp3");
const deadSound = new Audio("dead.mp3");
const Thememusic = new Audio("Themesong.mp3");
let speed = 8;
let score = 0;
let LastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
]
food = {x: 6, y: 7};

//Game Functions

function main(currentTime){
    window.requestAnimationFrame(main);
   // console.log(currentTime);
    if((currentTime - LastPaintTime)/ 1000 <1/speed){
        return;
    }
    LastPaintTime = currentTime;
    gameEngine();
}

//When game gets over
function isCollide(snake){
    // If the snake collide with itself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
        return true;
        }
    }

       //If the snake collides with the wall
        if(snake[0].x >= 18 || snake[0].x <= 0  || snake[0].y >= 18 || snake[0].y <= 0){
         return true;
        }
}

function gameEngine(){

    //Part 1 : Updating the snake array and food

    // When the game getes over r when snake dies
    if(isCollide(snakeArr)){  
        deadSound.play();
        Thememusic.pause();
        inputDir = {x: 0, y: 0};
        alert("Game Over. Press OK and then any key to play again");
        snakeArr = [{x: 13, y: 15}]; //when game starts again
        Thememusic.play();
        score=0;

    }

    // If you have eaten the food score will increase and regenarate food

    // When snake eats a food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score = score + 1;
        if(score > hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
            hiscoreBox.innerHTML = "High Score" + hiscoreval;
        }
        scoreBox.innerHTML = "Score : " + score;
        //adding the food or increasing the size of snake
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        //taking a suitable value to make the game easy
        let a = 2;
        let b = 16;
        //regenerating the food
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    //Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]}; //creating a new object to avoid all elemnts pointing to a single object
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;



    //Part 2 : Display the snake or food

    //Display the snake 
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
           snakeElement = document.createElement('div');
           snakeElement.style.gridRowStart = e.y;
           snakeElement.style.gridColumnStart = e.x;
           if(index === 0){
            snakeElement.classList.add('head');
           }
           else{
            snakeElement.classList.add('snakeBody');
           }
           board.appendChild(snakeElement);
    });

    //Display the food
           foodElement = document.createElement('div');
           foodElement.style.gridRowStart = food.y;
           foodElement.style.gridColumnStart = food.x;
           foodElement.classList.add('food');
           board.appendChild(foodElement);
    

}

//Main Logic starts here
let hiScore = localStorage.getItem("hiScore");
if(hiScore === null){
    hiscoreval = 0;
}

else{
    hiscoreval = JSON.parse(hiScore);
    hiscoreBox.innerHTML = "High Score : " + hiScore;
}

 window.requestAnimationFrame(main);
 window.addEventListener('keydown', e =>{ //for the various movements using keyboard keys
    inputDir = {x: 0, y: 1} //start the game
    Thememusic.play();
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1; 
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1; 
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0; 
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0; 
            break;
        
        default:
            break;
    }


 })