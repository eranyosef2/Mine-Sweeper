// 'use strict'
// //randomInt
// function getRandomIntInclusive(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min
// }

// function makeId(length = 6) {
//     var txt = ''
//     var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

//     for (var i = 0; i < length; i++) {
//         txt += possible.charAt(Math.floor(Math.random() * possible.length))
//     }

//     return txt
// }

// //emptyCells
// function findEmptyCells() {
//     var emptyCells = []
//     for (var i = 0; i < gBoard.length; i++) {
//         for (var j = 0; j < gBoard[i].length; j++) {
//             if (gBoard[i][j] === EMPTY) {

//                 emptyCells.push({ i: i, j: j })
//             }
//         }
//     }
//     return emptyCells
// }
// //Neighbor loop
// function countNegs(cellI, cellJ, mat) {
//     var negsCount = 0
//     for (var i = cellI - 1; i <= cellI + 1; i++) {
//         if (i < 0 || i >= mat.length) continue
//         for (var j = cellJ - 1; j <= cellJ + 1; j++) {
//             if (i === cellI && j === cellJ) continue
//             if (j < 0 || j >= mat[i].length) continue
//             if (mat[i][j] === LIFE || mat[i][j] === SUPER_LIFE) negsCount++
//         }
//     }
//     return negsCount}


//     //gameOver
//     function gameOver() {
//         clearInterval(gIntervalGhosts)
//         clearInterval(gCherryInter)
//         renderCell(gPacman.location, ':headstone:')
//         gGame.isOn = false
//         var elRestart = document.querySelector('.gameover')
//         elRestart.style.display = 'block'
//     }

//    //restartGame


//     function restart() {
//         var elGameOver = document.querySelector('.gameover')
//         elGameOver.style.display = 'none'
//         var elVictory = document.querySelector('.victory')
//         elVictory.style.display = 'none'
//         gGame.score = 0
//         onInit()
//     }

// //Add Object (Cherry)
// function addCherry() {
//     var emptyCells = findEmptyCells()
//     var cherryPos = emptyCells.splice(getRandomIntInclusive(0, emptyCells.length - 1), 1)[0]
//     if (emptyCells.length > 0) {
//         gBoard[cherryPos.i][cherryPos.j] = CHERRY
//         renderCell(cherryPos, CHERRY)
//     }
// }

// //Build Board


// function buildBoard() {
//     const size = 10
//     const board = []
//     for (var i = 0; i < size; i++) {
//         board.push([])

//         for (var j = 0; j < size; j++) {
//             board[i][j] = FOOD
            
//             if (i === 0 || i === size - 1 ||
//                 j === 0 || j === size - 1 ||
//                 (j === 3 && i > 4 && i < size - 2)) {
//                 board[i][j] = WALL
//             }
//         }

//     }
// }

// //findemptyCells

function findEmptyCells() {
    var emptyCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j] === EMPTY) {

                emptyCells.push({ i: i, j: j })
            }
        }
    }
    return emptyCells
}

// //Add the MINES randomly on the Board
// console.log();
// function addMines() {
//     var emptyCells = findEmptyCells()
//     var minePos = emptyCells.splice(getRandomIntInclusive(0, emptyCells.length - 1), 1)[0]
//     if (emptyCells.length > 0) {
//         gBoard[minePos.i][minePos.j] = MINE
//         renderCell(minePos, MINE)
//     }
// }
