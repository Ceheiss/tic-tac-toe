/*
Requirements:
• 3 x 3 grid
• User and computer play turn by turn
• The board and the moves are displayed after each turn
• Once a game is won, the winner is announced and a new game can be started
*/

// helper functions
function blockIsFree(block){
  return (!block.classList.contains("first-player")
  && !block.classList.contains("computer-player"))
}

let grid = document.getElementById("grid-container");
let blocksArray = [];
let gameEnd = false;
let lastBlock;

// builds each block, adds them to the array and provide an event listener
function buildBlock(number){
  let block = document.createElement('div');
  block.className = "grid-block";
  block.setAttribute('data-block-number', number);
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
    buildBlock(i);
  }
}

createGrid();

// User turn
function handleTurn(block){
  if(!gameEnd){
    if (blockIsFree(block)){
      block.className += " first-player";
      lastBlock = block;
      winCheck("first-player");
      if(!gameEnd){
        checkIfTie();
        computerTurn();
      }
    }
   }
}

function tryChance(chance1, chance2, chance3){
  if (blockIsFree(chance1)) {
    chance1.className += " computer-player" ;
    winCheck("computer-player");
  } else if (blockIsFree(chance2)) {
    chance2.className += " computer-player" ;
    winCheck("computer-player");
  } else if (blockIsFree(chance3)){
    chance3.className += " computer-player" ;
    winCheck("computer-player");
  }
}

function randomTry(){
  let randomNum =  Math.floor(Math.random() * blocksArray.length);
  let randomBlock = blocksArray[randomNum]
  if (blockIsFree(randomBlock)){
    randomBlock.className += " computer-player" ;
    winCheck("computer-player");
  } else {
    // if it doesn't find space, the fuction will recursively call itself
    randomTry();
  }
}

function computerTurn(){
  let playerLastMove = Number(lastBlock.getAttribute('data-block-number'));
  
  if (playerLastMove === 0) {
    let chance1 = blocksArray[1];
    let chance2 = blocksArray[4];
    let chance3 = blocksArray[3];
    tryChance(chance1,chance2,chance3);
  } else if (playerLastMove === 1) {
    let chance1 = blocksArray[4];
    let chance2 = blocksArray[0];
    let chance3 = blocksArray[2];
    tryChance(chance1,chance2,chance3);
  } else if (playerLastMove === 2) {
    let chance1 = blocksArray[1];
    let chance2 = blocksArray[4];
    let chance3 = blocksArray[5];
    tryChance(chance1,chance2,chance3);
  } else if (playerLastMove === 3) {
    let chance1 = blocksArray[0];
    let chance2 = blocksArray[6];
    let chance3 = blocksArray[4];
    tryChance(chance1,chance2,chance3);

  } else if (playerLastMove === 4) {
    let chance1 = blocksArray[0];
    let chance2 = blocksArray[8];
    let chance3 = blocksArray[6];
    tryChance(chance1,chance2,chance3);
  } else if (playerLastMove === 5) {
    let chance1 = blocksArray[2];
    let chance2 = blocksArray[4];
    let chance3 = blocksArray[8];
    tryChance(chance1,chance2,chance3);
  } else if (playerLastMove === 6) {
    let chance1 = blocksArray[3];
    let chance2 = blocksArray[7];
    let chance3 = blocksArray[4];
    tryChance(chance1,chance2,chance3);
  } else if (playerLastMove === 7) {
    let chance1 = blocksArray[6];
    let chance2 = blocksArray[4];
    let chance3 = blocksArray[8];
    tryChance(chance1,chance2,chance3);
  } else if (playerLastMove === 8) {
    let chance1 = blocksArray[7];
    let chance2 = blocksArray[4];
    let chance3 = blocksArray[5];
    tryChance(chance1,chance2,chance3);
  } else {
    randomTry();
  }
}

function checkIfTie(){
  for(let i = 0; i < blocksArray.length; i++){
    if(blockIsFree(blocksArray[i])){
      return false;
    }
  }
  return (
  setTimeout( function(){
    alert("It's a tie, no losers. Click ok to start again");
    document.location.reload()}, 300))
}


function handleWin(player){
  gameEnd = true;
  setTimeout( function(){
      alert("Player " + player + " wins. Click ok to start again");
      document.location.reload()}, 300)
}

// This functions check every possible way of winning the game
function checkHorizontalWins(player){
  if(blocksArray[0].classList.contains(player)
    && blocksArray[1].classList.contains(player)
    && blocksArray[2].classList.contains(player)){
    handleWin(player)
  }
  if(blocksArray[3].classList.contains(player)
    && blocksArray[4].classList.contains(player)
    && blocksArray[5].classList.contains(player)){
    handleWin(player)
  }
  if(blocksArray[6].classList.contains(player)
    && blocksArray[7].classList.contains(player)
    && blocksArray[8].classList.contains(player)){
    handleWin(player)
  }
}

function checkVerticalWins(player){
  if(blocksArray[0].classList.contains(player)
    && blocksArray[3].classList.contains(player)
    && blocksArray[6].classList.contains(player)){
    handleWin(player)
  }
  if(blocksArray[1].classList.contains(player)
    && blocksArray[4].classList.contains(player)
    && blocksArray[7].classList.contains(player)){
    handleWin(player)
  }
  if(blocksArray[2].classList.contains(player)
    && blocksArray[5].classList.contains(player)
    && blocksArray[8].classList.contains(player)){
    handleWin(player)
  }
}

function checkCrossWins(player){
  if(blocksArray[0].classList.contains(player)
    && blocksArray[4].classList.contains(player)
    && blocksArray[8].classList.contains(player)){
    handleWin(player)
  }
  if(blocksArray[2].classList.contains(player)
    && blocksArray[4].classList.contains(player)
    && blocksArray[6].classList.contains(player)){
    handleWin(player)
  }
}

function winCheck(player){
  checkHorizontalWins(player);
  checkVerticalWins(player);
  checkCrossWins(player);
}


// restart all  document.location.reload()