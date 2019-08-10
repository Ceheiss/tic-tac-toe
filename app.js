/*
Tic Tac Toe Game
Requirements:
• 3 x 3 grid
• User and computer play turn by turn
• The board and the moves are displayed after each turn
• Once a game is won, the winner is announced and a new game can be started
The game is developed in pure Javascript.
*/

// Everything inside an IIFE to avoid collisions in the global scope
(function(){

  // Getting the grid from the DOM
  const grid = document.getElementById("grid-container");
  // Convert HTMLCollection to array to later use array methods
  const blocksArray = [...grid.children];
  // Check if game is on
  let gameEnd = false;
  // Variable used in different scopes
  let lastBlock;
  /*--------------------------- Event Listeners  -----------------------------*/
  // event delegation to capture blocks, handleTurn is ran in the target of the event (that is a block). 
  grid.addEventListener('click', function(e){
    handleTurn(e.target);
  })
  /*--------------------------- Game Logic - Player Movements -----------------------------*/
  // First player turn
  function handleTurn(block){
    if(!gameEnd){
      if (blockIsFree(block)){
        block.className += " first-player";
        lastBlock = block;
        winCheck("first-player");
        if(!gameEnd){
          checkIfTie();
          setTimeout(function(){computerTurn();}, 200)
        }
      }
    }
  }

  // Function to try the suggested moves
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
    } else {
      randomTry();
    }
  }

  // If no suggested moves are available, then chooses randomly
  function randomTry(){
    let randomNum =  Math.floor(Math.random() * blocksArray.length);
    let randomBlock = blocksArray[randomNum];
    if (blockIsFree(randomBlock)){
      randomBlock.className += " computer-player" ;
      winCheck("computer-player");
    } else {
      // if it doesn't find space, the fuction will recursively call itself
      randomTry();
    }
  }

  // This function checks the 8 possible movements of first-player
  function computerTurn(){
    let playerLastMove = blocksArray.indexOf(lastBlock);

    if (playerLastMove === 0) {
      tryChance(blocksArray[4],blocksArray[1],blocksArray[3]);
    } else if (playerLastMove === 1) {
      tryChance(blocksArray[4],blocksArray[0],blocksArray[2]);
    } else if (playerLastMove === 2) {
      tryChance(blocksArray[4],blocksArray[1],blocksArray[5]);
    } else if (playerLastMove === 3) {
      tryChance(blocksArray[4],blocksArray[6],blocksArray[0]);
    } else if (playerLastMove === 4) {
      tryChance(blocksArray[0],blocksArray[8],blocksArray[6]);
    } else if (playerLastMove === 5) {
      tryChance(blocksArray[4],blocksArray[2],blocksArray[8]);
    } else if (playerLastMove === 6) {
      tryChance(blocksArray[4],blocksArray[7],blocksArray[3]);
    } else if (playerLastMove === 7) {
      tryChance(blocksArray[4],blocksArray[6],blocksArray[8]);
    } else if (playerLastMove === 8) {
      tryChance(blocksArray[4],blocksArray[7],blocksArray[5]);
    }
  }

  /*--------------------------- Game Logic - Helper Functions -----------------------------*/
  // Check if block has been used
  function blockIsFree(block){
    return (!block.classList.contains("first-player")
    && !block.classList.contains("computer-player"))
  }
  // If no more posssible movements and no winner
  function checkIfTie(){
    for(let i = 0; i < blocksArray.length; i++){
      if(blockIsFree(blocksArray[i])){
        return false;
      }
    }
    return (
    setTimeout( function(){
      gameEnd = true;
      setTimeout(function() {
        modal.style.display = "block";
        modalMessage.innerHTML = "No winners or losers today"; 
      }, 200)
    })
    )
  }
    
  //This function checks if a player completed a line
  function lineChecker(first, second, third, player){
    if(blocksArray[first].classList.contains(player)
      && blocksArray[second].classList.contains(player)
      && blocksArray[third].classList.contains(player)){
      handleWin(player)
    }
  }

  // This functions check every possible way of winning the game.
  function checkHorizontalWins(player){
    lineChecker(0, 1, 2, player);
    lineChecker(3, 4, 5, player);
    lineChecker(6, 7, 8, player);
  }

  function checkVerticalWins(player){
    lineChecker(0, 3, 6, player);
    lineChecker(1, 4, 7, player);
    lineChecker(2, 5, 8, player);
  }

  function checkCrossWins(player){
    lineChecker(0, 4, 8, player);
    lineChecker(2, 4, 6, player);
  }

  // This function is ran in each movement to check if game finished
  function winCheck(player){
    checkHorizontalWins(player);
    checkVerticalWins(player);
    checkCrossWins(player);
  }

  // If there is a winner, this function handles it
  function handleWin(player){
    let winnerName;
    if(player === "computer-player"){
      winnerName = "The (not-so) Almighty Computer";
    } else {
      winnerName = "...you Human!";
    }
    gameEnd = true;
    setTimeout(function() {
      modal.style.display = "block";
      modalMessage.innerHTML = "The winner is: " + winnerName; 
    }, 200)
  }
  /*------------------- Modal Logic ------------------- */

  const modal = document.getElementById("end-modal");
  const modalMessage = document.getElementById("modal-message");
  const restartBtn = document.getElementsByClassName("restart")[0];

  // When the user clicks button, reload page
  restartBtn.onclick = function() {
    modal.style.display = "none";
    document.location.reload();
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      document.location.reload();
    }
  }
}())

// Further improvements, besides better AI, is to reset the board instead of loading again the page (basically erase all the classes from the block elements)
