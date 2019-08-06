// DOM
let grid = document.getElementById("grid-container");
// save every block in an array to access them easily
let blocksArray = [];

// build each block and provide a function
function buildBlock(number){
  let block = document.createElement('div');
  block.className = "grid-block";
  grid.appendChild(block);
  block.setAttribute('data-block-number', number);
  block.addEventListener('click', function(){
    if(block.classList.contains("first-player")
      || block.classList.contains("computer-player")){
      alert("already there");
    } else {
      block.className += " first-player";
      computerTurn();
    }
    console.log("block was clicked", block.getAttribute('data-block-number'))
  })
  blocksArray.push(block)
  return blocksArray;
}

// build the grid
function createGrid(){
  for (var i = 0; i < 9; i++){
    buildBlock(i);
  }
}

createGrid();

// check the 8 winning alternatives
function winCheck(player){
  checkHorizontalWins(player);
  checkVerticalWins(player);
  checkCrossWins(player);
}

function checkHorizontalWins(player){
  if(blocksArray[0].classList.contains(player)
    && blocksArray[1].classList.contains(player)
    && blocksArray[2].classList.contains(player)){
    alert("Player " + player + " wins")
  }
  if(blocksArray[3].classList.contains(player)
    && blocksArray[4].classList.contains(player)
    && blocksArray[5].classList.contains(player)){
    alert("Player " + player + " wins")
  }
  if(blocksArray[6].classList.contains(player)
    && blocksArray[7].classList.contains(player)
    && blocksArray[8].classList.contains(player)){
    alert("Player " + player + " wins")
  }
}

function checkVerticalWins(player){
  if(blocksArray[0].classList.contains(player)
    && blocksArray[3].classList.contains(player)
    && blocksArray[6].classList.contains(player)){
    alert("Player " + player + " wins")
  }
  if(blocksArray[1].classList.contains(player)
    && blocksArray[4].classList.contains(player)
    && blocksArray[7].classList.contains(player)){
    alert("Player " + player + " wins")
  }
  if(blocksArray[2].classList.contains(player)
    && blocksArray[5].classList.contains(player)
    && blocksArray[8].classList.contains(player)){
    alert("Player " + player + " wins")
  }
}

function checkCrossWins(player){
  if(blocksArray[0].classList.contains(player)
    && blocksArray[4].classList.contains(player)
    && blocksArray[8].classList.contains(player)){
    alert("Player " + player + " wins")
  }
  if(blocksArray[2].classList.contains(player)
    && blocksArray[4].classList.contains(player)
    && blocksArray[6].classList.contains(player)){
    alert("Player " + player + " wins")
  }
}

// handle computers turn
function computerTurn(){
  let randomNum =  Math.floor(Math.random() * blocksArray.length);
  let randomBlock = blocksArray[randomNum]
  if (!randomBlock.classList.contains("first-player")
      && !randomBlock.classList.contains("computer-player")){
     randomBlock.className += " computer-player" 
  } else {
    winCheck("first-player");
    winCheck("computer-player");
    computerTurn();
  }
}