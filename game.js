// Game Data

var board = 
[
    ['','',''],
    ['','',''],
    ['','',''],
]


const X_PIECE = 'X';
const O_PIECE = 'O';
var currentPlayer = X_PIECE;
var moveCounter = 0;



function checkWinner(){
    var isDiagWinA = true;
    var isDiagWinB = true;
    var isHorizWin = true;
    var isVertWin = true;

    for (var i = 0; i < board.length; i++){
        isHorizWin = true;
        isVertWin = true;
        for (var j = 0; j < board[i].length; j++ ){
            if (board[i][j] != currentPlayer){
                isHorizWin = false;
            }
            if (board[j][i] != currentPlayer){
                isVertWin = false;
            }  
            if (board[j][j] != currentPlayer){
                isDiagWinA = false;
            }
            if (board[j][board.length - 1 - j] != currentPlayer)
            {
                isDiagWinB = false;
            }
        }

        if (isVertWin || isHorizWin || isDiagWinA || isDiagWinB){
            return true;
        }
    }
    
    // If no winner until now...
    return false;
}

function overlayOn() {
    document.querySelector("#overlay").style.display = "block";
  }
  
  function overlayOff() {
    document.querySelector("#overlay").style.display = "none";
    resetGame();
  }

  function resetGame(){
      location.reload();
  }

/*function checkVerticalWin(){
    for (var j = 0; j < board[0].length; j++){
        var isWin = true;
        for (var i = 0; i < board.length && isWin; i++ ){
            if (board[i][j] != currentPlayer){
                isWin = false;
            }
        }
        if (isWin){
            return true;
        }
    }
    // If no winner until now...
    return false;
} */

/*
function checkDiagonalWin(){
    var isWin = true;
    for (var i = 0; i < board.length && isWin; i++){
        if (board[i][i] != currentPlayer){
            isWin = false;
        }
    }

    if (isWin){
        return true;
    }

    isWin = true;
    for (i = 0; i < board.length && isWin; i++){
        var j = board.length - 1 - i;
        if (board[i][j] != currentPlayer){
            isWin = false;
        }
    }
    return isWin;
}*/

/*function checkWinner(){
    if (checkStraightLines() ||
        checkDiagonalWin()){
        return true;
    } 
    return false;
}*/

function updateBoardData(i, j, value){
    board[i][j] = value;
}

function cellClicked(cell){
    var innerSpan = cell.querySelector('span.piece');
    if (innerSpan.classList.contains('empty')){
        innerSpan.classList.remove("empty");
        innerSpan.innerText = currentPlayer;  

        var i = cell.getAttribute("attr-i");
        var j = cell.getAttribute("attr-j");    
        updateBoardData(i, j, currentPlayer);
        
        var isWin = checkWinner();
        if (isWin){
            document.querySelector('#winnerName').innerText = currentPlayer;
            overlayOn();
        }

        moveCounter++;
        if (moveCounter == board.length * board[0].length && !isWin){
            document.querySelector('#winnerName').innerText = "No one!";
            overlayOn();
        }
        
        

        toggleCurrentPlayer();
    }
    
}


function cellHovered(cell){
    var innerSpan = cell.querySelector('span.piece');
    if (innerSpan.classList.contains('empty')){
        innerSpan.innerText = currentPlayer;
    }
}

function toggleCurrentPlayer(){
    if (currentPlayer == X_PIECE){
        currentPlayer = O_PIECE;
    } else{
        currentPlayer = X_PIECE;
    }
}

var cells = document.querySelectorAll('td');
for (currCell of cells){
    currCell.setAttribute("onclick",'cellClicked(this)')
    currCell.setAttribute("onmouseover",'cellHovered(this)')
}


