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
    let randomBlock = blocksArray[randomNum]
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
    /* should have used indexOf(), unnecessary use of data attributes
    console.log("using index of: ", blocksArray.indexOf(lastBlock)); */
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
    
  // This function is ran in each movement to check if game finished
  function winCheck(player){
    checkHorizontalWins(player);
    checkVerticalWins(player);
    checkCrossWins(player);
  }

  // Check if winner
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
  // Could have been further abstracted by creating an extra function
  // function checker(first, second, third, player){
  //   if(blocksArray[first].classList.contains(player)
  //     && blocksArray[second].classList.contains(player)
  //     && blocksArray[third].classList.contains(player)){
  //     handleWin(player)
  //   }
  // }

  // checker(0,4,8,"first-player");
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
      // here should reload as well
    }
  }
}())

// Further improvements, besides better AI, is to reset the board instead of loading again the page (basically erase all the classes from the block elements)
