'use strict'
const MINE = '💣';
const EMPTY = '';
const FLAG = '🚩';

var gBoard


var gLevel = { level : 4 ,SIZE: 4, MINES: 2 }
// var gLevel = { level : 8 ,SIZE: 8, MINES: 14 }
// var gLevel = { level : 12 ,SIZE: 12, MINES: 32 }
function onChangeDifficulty(level){
    if(level === 4){
        gLevel = { level : 4 ,SIZE: 4, MINES: 2 }

        
    }
    if(level === 8){
        gLevel = { level : 8 ,SIZE: 8, MINES: 14 }

        
    }

    if(level === 12){
        gLevel = { level : 12 ,SIZE: 12, MINES: 32 }
    }
    console.log(level);
    onInitGame()

} 



var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}


// Initialize the game
function onInitGame() {
    gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    }
    gBoard = buildBoard()
    document.querySelector(".popup").style.display = "none";
    renderBoard(gBoard)
}

// Build the board with the new cell structure
function buildBoard() {
    const board = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            };
        }
    }
    addMines(board)
    setMinesNegsCount(board)
    return board
}

// Add mines to the board
function addMines(board) {
    var minesPlaced = 0
    while (minesPlaced < gLevel.MINES) {
        var i = getRandomIntInclusive(0, gLevel.SIZE - 1)
        var j = getRandomIntInclusive(0, gLevel.SIZE - 1)
        if (!board[i][j].isMine) {
            board[i][j].isMine = true
            minesPlaced++
        }
    }
}

// Set mines around count for each cell
function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (!board[i][j].isMine) {
                board[i][j].minesAroundCount = countMinesAround(i, j, board)
            }
        }
    }
}

// Count mines around a specific cell
function countMinesAround(cellI, cellJ, board) {
    var negsCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= board[i].length) continue
            if (board[i][j].isMine) negsCount++
        }
    }
    return negsCount
}

// Render the board
function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[i].length; j++) {
            var cell = board[i][j];
            var className = cell.isMine  ? 'mine' : 'empty';
            // var className = cell.isMine && cell.isShown ? 'mine' : 'empty';
            var display = cell.isShown ? (cell.isMine ? MINE : cell.minesAroundCount) : '';
            strHTML += `
                <td class="${className}" 
                    onclick="cellClicked(${i}, ${j})"
                    oncontextmenu="cellRightClicked(event, ${i}, ${j})">
                    ${cell.isMarked ? FLAG : display}
                </td>`;
        }
        strHTML += '</tr>';
    }
    document.querySelector('.board').innerHTML = strHTML;

}

// Handle right-click to mark or unmark cells
function cellRightClicked(event, i, j) {
    event.preventDefault();
    var cell = gBoard[i][j]
    if (cell.isShown) return;
    cell.isMarked = !cell.isMarked;
   if(cell.isMarked){
 gGame.markedCount++
}else{
    gGame.markedCount--
}
    // console.log("gGame.markedCount++:",  gGame.markedCount)
    
    renderBoard(gBoard);
}

// Handle cell click
function cellClicked(i, j) {
    var cell = gBoard[i][j];
    if (cell.isMarked || cell.isShown) return;
    if (cell.isMine) {
        console.log('Game Over! You clicked on an explosive mine!');
        revealMines(gBoard);
        gGame.isOn = false;
        return;
    }
    
    cell.isShown = true;
    gGame.shownCount++

//  console.log(gGame.shownCount);
var isVictory = gGame.shownCount === (gLevel.SIZE * gLevel.SIZE) - gLevel.MINES && gGame.markedCount === gLevel.MINES
if(isVictory){
    renderWin()
    //  console.log('showncount' , gGame.shownCount,);
    //  console.log('sizex2' , gLevel.SIZE* gLevel.SIZE  );
    //  console.log('markedcount' ,gGame.markedCount ,);
    //  console.log('mines' ,gLevel.MINES );
    //  console.log('win' , isVictory);
     
}


    renderBoard(gBoard);
}

// Reveal all mines
function revealMines(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j].isMine) {
                board[i][j].isShown = true;
            }
        }
    }
    renderBoard(board);
}

function renderWin() {
    document.querySelector(".popup").style.display = "block";

}


function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
