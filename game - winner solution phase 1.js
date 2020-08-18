// Game Data
var gameBoard = 
[
    ['','',''],
    ['','',''],
    ['','','']
];

const X_PIECE = 'X';
const O_PIECE = 'O';
const TIE_GAME = ":";
var currentPlayer = X_PIECE;
var movesMade = 0;

function checkHorizontalWin(board, player){
    var winGame = false;
    for (var i = 0; i < board.length && !winGame; i++){
        var winRow = true;
        for (var j = 0; j < board[i].length; j++){
            if (board[i][j] != player){
                winRow = false;
            }
        }
        if (winRow){
            winGame = true;
        }   
    }
    return winGame;
}

function checkVerticalWin(board, player){
    var winGame = false;
    for (var j = 0; j < board.length && !winGame; j++){
        var winRow = true;
        for (var i = 0; i < board[j].length; i++){
            if (board[i][j] != player){
                winRow = false;
            }
        }
        if (winRow){
            winGame = true;
        }   
    }
    return winGame;
}

// check both diagonals
function checkDiagonalWin(gameBoard, player){
    var winGame = true;

    for (var i=0; i < gameBoard.length; i++){
        if (gameBoard[i][i] != player){
            winGame = false;
        }
    }
    if (!winGame){ // check the other diagonal
        winGame = true;
        for (i = 0; i < gameBoard.length; i++){
            if (gameBoard[i][gameBoard.length - 1 - i] != player){
                winGame = false;
            }
        }  
    }
    return winGame;
}

function checkWinner(){
    if (checkHorizontalWin(gameBoard, currentPlayer)){
        return true;
    } else if (checkVerticalWin(gameBoard, currentPlayer)){
        return true;       
    }else{
        return checkDiagonalWin(gameBoard, currentPlayer);
    }
}

function updateBoardData(i, j, value){
    gameBoard[i][j] = value;
}

function overlayOn() {
    document.querySelector("#overlay").style.display = "block";
  }
  
  function overlayOff() {
    document.querySelector("#overlay").style.display = "none";
    resetGame();
  }

function announceWinner(player){
    if (player == TIE_GAME){
        document.querySelector("#overlayText").innerText = player + "Tie Game";
    }else{
        document.querySelector("#overlayText").innerText = player + " is the Winner";
    }
   overlayOn();

}

function resetGame(){
    location.reload();
}
function cellClicked(cell){
    var innerSpan = cell.querySelector('span.piece');
    if (innerSpan.classList.contains('empty')){
        innerSpan.classList.remove("empty");
        innerSpan.innerText = currentPlayer;  

        var i = cell.getAttribute("attr-i");
        var j = cell.getAttribute("attr-j");    
        updateBoardData(i, j, currentPlayer);
        movesMade++;

        var isWin = checkWinner(gameBoard, currentPlayer);
        if (isWin){
            announceWinner(currentPlayer);
            //resetGame();
        }else{
            if (movesMade == 9){
                announceWinner(TIE_GAME);
                resetGame();
            }else{
                toggleCurrentPlayer();
            }
        }
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


