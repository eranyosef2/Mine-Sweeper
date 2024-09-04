'use strict'

const MINE = '💣';
const EMPTY = '';
const FLAG = '🚩';

var gBoard 

var gLevel = { SIZE: 4, MINES: 2 }

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}


// console.log();
function onInitGame() {
    gBoard = buildBoard()
    renderBoard(gBoard)
}


//Builds the board Set the mines Call setMinesNegsCount() Return the created board
// console.log();
function buildBoard() {
    const board = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = EMPTY;
        }
    }
    board[1][3] = MINE
    board[2][2] = MINE
    // addMines(board)
    return board
}
// function addMines(board){
//     var minesPlaced = 0
//     while (minesPlaced < gLevel.MINES){
//         var i = getRandomIntInclusive(0,gLevel.SIZE-1)
//         var j = getRandomIntInclusive(0,gLevel.SIZE-1)
//         // board[i][j] = MINE;
//         if(board[i][j] === EMPTY){
//             board[i][j] = MINE
//             minesPlaced++
//         }
//     }
// }

//Render the board as a <table> to the page
// console.log();


function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[i].length; j++) {
            var className = board[i][j] === MINE ? 'mine' : 'empty';
            strHTML += `
                <td class="${className}" 
                    onclick="cellClicked(${i}, ${j})"
                    oncontextmenu="cellRightClicked(event, ${i}, ${j})">
                    ${board[i][j]}
                </td>`;
        }
        strHTML += '</tr>';
    }
    document.querySelector('.board').innerHTML = strHTML;
}

function cellRightClicked(event, i, j) {
    event.preventDefault();
    console.log('right clicked!', i, j);
    var cell = gBoard[i][j]
    if(cell === FLAG){
        gBoard[i][j] = EMPTY
    } else if(cell === EMPTY) {
        gBoard[i][j] = FLAG
    }
    renderBoard(gBoard)
  
    
}


//Check which cell is clicked by the index + adding the negs towards the cell and rendering the board so it displays the minesAroundCount
function cellClicked(i, j) {
    var cell = gBoard[i][j]
    if(cell === FLAG){
        return
    }
  var negs = setMinesNegsCount(i, j, gBoard)
  console.log("~ cellClicked ~ negs:", negs)
  gBoard[i][j] = negs + ''
  renderBoard(gBoard)
}

//Count mines around each cell and set the cell's minesAroundCount.
// // console.log();

function setMinesNegsCount(cellI, cellJ, board) {
    var negsCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= board[i].length) continue
            if (board[i][j] === MINE) negsCount++
            
        }
    }
    return negsCount
}

//Add the MINES randomly on the Board

  

// // Called when a cell is right- clicked See how you can hide the context menu on right click
// // console.log();
// onCellMarked(elCell)

// //Game ends when all mines are marked, and all the other cells are shown
// // console.log();
// checkGameOver()

// //When user clicks a cell with no mines around, we need to open not only that cell, but also its neighbors.
// // console.log();
// expandShown(board, elCell, i, j)

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}