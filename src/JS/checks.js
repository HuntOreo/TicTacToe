import { updateHighScore } from '../firebase.js'
import { updateScore } from './misc.js'
import { game_state } from './state.js'

// organizes the list of tiles into a 2D array, 
// with each child being an array of tiles that make up a row.
const checkRows = function (rows, state) {
  const filtered = []
  for (let i = 0; i < rows.length; i += 3) {
    let temp = []
    for (let j = 0; j < 3; j++) {
      temp.push(rows[i + j])
    }

    filtered.push(temp)
  }

  // checks if there is a winning play, returns true or false.
  return check({
    itemOne: filtered,
    turn: state,
  })
}

// organizes the list of tiles into a 2D array, with each child 
// being an array of tiles that make up a column.
const checkColumns = (tiles, state) => {
  const filtered = []
  for (let i = 0; i < 3; i++) {
    let temp = []
    for (let j = i; j < tiles.length; j += 3) {
      temp.push(tiles[j])
    }

    filtered.push(temp)
  }
  // checks if there is a winning play, returns true or false.
  return check({
    itemOne: filtered,
    turn: state,
  })
}

const checkDiagonal = (tiles, state) => {
  const filtLeftDiag = []
  const filtRightDiag = []

  for (let i = 0; i < tiles.length; i += 4) {
    filtLeftDiag.push(tiles[i])
  }

  for (let i = 2; i < tiles.length - 2; i += 2) {
    filtRightDiag.push(tiles[i])
  }

  // checks if there is a winning play, returns true or false.
  return check({
    itemOne: filtLeftDiag,
    itemTwo: filtRightDiag,
    turn: state,
  })
}


// This function will check if a given array of 
// tiles are a winning set. 
const check = (checkList) => {


  // if a second list is given, it will also check 
  // for a victory in that one. 
  //    - should only happen if checking a diagonal.
  if (checkList.itemTwo) {
    let score = 0
    for (let i = 0; i < checkList.itemOne.length; i++) {
      if (checkList.itemOne[i].innerText === checkList.turn) {
        score++
        // if the score is 3, returns true, 
        // which means there is a winner.
        if (score === 3) {
          // highlight each winning tile
          checkList.itemOne.forEach(tile => {
            tile.style.backgroundColor = 'red'
          })
          game_state.players.find(item => item.name === checkList.turn).score++
          return {
            check: true,
            player: game_state.turn
          }
        }
      }
    }

    score = 0

    for (let i = 0; i < checkList.itemTwo.length; i++) {
      if (checkList.itemTwo[i].innerText === checkList.turn) {
        score++
        // if the score is 3, returns true, which means 
        // there is a winner.
        if (score === 3) {
          // highlight each winning tile
          checkList.itemTwo.forEach(tile => {
            tile.style.backgroundColor = 'red'
          })
          game_state.players.find(item => item.name === checkList.turn).score++
          return {
            check: true,
            player: game_state.turn
          }
        }
      }
    }
  } else {
    // loops through each aray inside the 2D 
    // array and checks the innertext of the node. 
    // If its an X, it will add that to the scoreboard.
    //    - used for checking rows and columns
    for (let i = 0; i < checkList.itemOne.length; i++) {
      let score = 0
      for (let j = 0; j < checkList.itemOne.length; j++) {
        if (checkList.itemOne[i][j].innerText === checkList.turn) {
          score++
          // if the score is 3, returns true, 
          // which means there is a winner.
          if (score === 3) {
            // highlight each winning tile
            checkList.itemOne[i].forEach(tile => {
              tile.style.backgroundColor = 'red'
            })
            game_state.players.find(item => item.name === checkList.turn).score++

            return {
              check: true,
              player: game_state.turn,
            }
          }
        }
      }
    }
  }

  return false

}

// will check to see if the players last play was a winning play.
const checkWinner = (turn) => {
  // turn === player ('X' | 'O')

  // grabs the tiles that make up the board to be filtered later
  const tiles = document.querySelectorAll('.tile')

  // breaks the tiles into rows, columns, and diagonals
  // these 'filtered' sets are checked to see if any of them 
  // qualify as a victory.
  const rows = checkRows(tiles, turn)
  const columns = checkColumns(tiles, turn)
  const diagonals = checkDiagonal(tiles, turn)


  // if blank.check returns true, this means there was a victory
  // and the endRound function will be called.
  if (rows.check) {
    endRound(rows)
  } else if (columns.check) {
    endGame(columns)
  } else if (diagonals.check) {
    endRound(diagonals
    )
  }
}

// when the round has concluded (victory has been declared)
// this function will remove interactability with the tiles, 
// then update the score, and finally check if a users 
// highscore is beaten.
const endRound = (winner) => {

  // grabs the board tiles and removes the click event listener.
  const tiles = document.querySelectorAll('.tile')
  tiles.forEach(el => {
    el.onclick = null
  })

  // grab the player that is considered the winner 
  // and update their score for the game.
  const player = game_state.players.find(el => el.name == winner.player)

  // updates the player score then compares it their highscore
  // in the database.
  updateScore(player)
  updateHighScore()
}

// updates the value for a clicked tile. 
// if its X turn, the tile will be given a value of X.
// If its O turn, the value will be set to O. 
// Also checks to see if that move qualified a 
// 'set' (row, column, diagonal) for a victory.
export const updateValue = (element) => {
  if (game_state.turn === 'X') {
    element.innerText = 'X'
    checkWinner(game_state.turn)
    game_state.turn = 'O'
  } else if (game_state.turn === 'O') {
    element.innerText = 'O'
    checkWinner(game_state.turn)
    game_state.turn = 'X'
  }
}