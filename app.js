/*
Requirements:
• 3 x 3 grid
• User and computer play turn by turn
• The board and the moves are displayed after each turn
• Once a game is won, the winner is announced and a new game can be started
*/

let grid = document.getElementById("grid-container");
let blocksArray = [];
let gameEnd = false;
let winner;

// builds each block, adds them to the array and provide an event listener
function buildBlock(){
  let block = document.createElement('div');
  block.className = "grid-block";
  grid.appendChild(block);
  block.addEventListener('click', function(){
    handleTurn(block);
  })
  blocksArray.push(block)
  return blocksArray;
}

// Creates the playing grid and calling the function
function createGrid(){
  for (var i = 0; i < 9; i++){
    buildBlock();
  }
}

createGrid();

// User turn
function handleTurn(block){
   if(!gameEnd){
    if (block.classList.contains("first-player")
    || block.classList.contains("computer-player")){
    alert("Space Unavailable");
    } else {
      block.className += " first-player";
      winCheck("first-player");
      if(!gameEnd){
        computerTurn();
      }
    }
   }
}

// computer turn
function computerTurn(){
  let randomNum =  Math.floor(Math.random() * blocksArray.length);
  let randomBlock = blocksArray[randomNum]
  if (!randomBlock.classList.contains("first-player")
      && !randomBlock.classList.contains("computer-player")){
     randomBlock.className += " computer-player" ;
     winCheck("computer-player");
  } else {
    // if it doesn't find space, the fuction will recursively call itself
    computerTurn();
  }
}


// This functions check every possible way of winning the game
function checkHorizontalWins(player){
  if(blocksArray[0].classList.contains(player)
    && blocksArray[1].classList.contains(player)
    && blocksArray[2].classList.contains(player)){
    gameEnd = true;
    alert("Player " + player + " wins")
  }
  if(blocksArray[3].classList.contains(player)
    && blocksArray[4].classList.contains(player)
    && blocksArray[5].classList.contains(player)){
    gameEnd = true;
    alert("Player " + player + " wins")
  }
  if(blocksArray[6].classList.contains(player)
    && blocksArray[7].classList.contains(player)
    && blocksArray[8].classList.contains(player)){
    gameEnd = true;
    alert("Player " + player + " wins")
  }
}

function checkVerticalWins(player){
  if(blocksArray[0].classList.contains(player)
    && blocksArray[3].classList.contains(player)
    && blocksArray[6].classList.contains(player)){
    gameEnd = true;
    alert("Player " + player + " wins")
  }
  if(blocksArray[1].classList.contains(player)
    && blocksArray[4].classList.contains(player)
    && blocksArray[7].classList.contains(player)){
    gameEnd = true;
    alert("Player " + player + " wins")
  }
  if(blocksArray[2].classList.contains(player)
    && blocksArray[5].classList.contains(player)
    && blocksArray[8].classList.contains(player)){
    gameEnd = true;
    alert("Player " + player + " wins")
  }
}

function checkCrossWins(player){
  if(blocksArray[0].classList.contains(player)
    && blocksArray[4].classList.contains(player)
    && blocksArray[8].classList.contains(player)){
    gameEnd = true;
    alert("Player " + player + " wins")
  }
  if(blocksArray[2].classList.contains(player)
    && blocksArray[4].classList.contains(player)
    && blocksArray[6].classList.contains(player)){
    gameEnd = true;
    alert("Player " + player + " wins")
  }
}

function winCheck(player){
  checkHorizontalWins(player);
  checkVerticalWins(player);
  checkCrossWins(player);
}
