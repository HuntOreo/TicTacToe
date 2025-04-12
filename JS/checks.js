import { updateScore } from './misc.js'
import { state } from './state.js'

// organizes the list of tiles into a 2D array, 
// with each child being an array of tiles that make up a row.
const checkRows = function (rows, state) {

  const filtered = []
  for(let i=0;i<rows.length;i+=3) {
    let temp = []
    for(let j=0; j<3;j++) {
      temp.push(rows[i+j])
    }
    
    filtered.push(temp)
  } 

  // checks if there is a winning play, returns true or false.
  return check({
    itemOne:filtered,
    turn: state,
  })
}

// organizes the list of tiles into a 2D array, with each child 
// being an array of tiles that make up a column.
const checkColumns = (tiles, state)=> {
  const filtered = []
  for(let i=0;i<3;i++) {
    let temp = []
    for(let j=i; j<tiles.length;j+=3) {
      temp.push(tiles[j])
    }
    
    filtered.push(temp)
  }
  // checks if there is a winning play, returns true or false.
  return check({
    itemOne:filtered,
    turn: state,
  })
}

const checkDiagonal = (tiles, state) => {
  const filtLeftDiag = []
  const filtRightDiag = []
  
  for(let i=0;i<tiles.length;i+=4) {
    filtLeftDiag.push(tiles[i])
  }
  
  for(let i=2;i<tiles.length-2;i+=2) {
    filtRightDiag.push(tiles[i])
  }
  
  // checks if there is a winning play, returns true or false.
  return check({
    itemOne:filtLeftDiag,
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
  if(checkList.itemTwo) {
    let score = 0
    let winnerTiles = []
    for(let i=0;i<checkList.itemOne.length;i++) {

      if(checkList.itemOne[i].innerText === checkList.turn) {
        winnerTiles.push(checkList.itemOne[i])
        score++
          // if the score is 3, returns true, 
          // which means there is a winner.
          if(score===3) {
            winnerTiles.forEach(tile => {
              tile.style
            })

            state.players.find(item => item.name === checkList.turn).score++
            return {
              check: true,
              player: state.turn
            }
          }
        }
      }
      
      score = 0
      winnerTiles = [...[]]

      for(let i=0;i<checkList.itemTwo.length;i++) {
        if(checkList.itemTwo[i].innerText === checkList.turn) {
          console.log(checkList.itemTwo[i])
          
          score++
          // if the score is 3, returns true, which means 
          // there is a winner.
          if(score===3) {
            
            winnerTiles.forEach(tile => {
              console.log(tile)
            })

            state.players.find(item => item.name === checkList.turn).score++
            return {
              check: true,
              player: state.turn
            }
          }
        }
      }
    } else {
      // loops through each aaray inside the 2D 
      // array and checks the innertext of the node. 
      // If its an X, it will add that to the scoreboard.
      for(let i=0;i<checkList.itemOne.length;i++){
        let score = 0
        
        const winnerTiles = []

        for(let j=0;j<checkList.itemOne.length;j++) {
          if(checkList.itemOne[i][j].innerText === checkList.turn) {
            winnerTiles.push(checkList.itemOne[i][j])
            score++
            // if the score is 3, returns true, 
            // which means there is a winner.
            if(score===3) {
              winnerTiles.forEach(tile => {
                tile.style
              })
              state.players.find(item => item.name === checkList.turn).score++
              return {
                check: true,
                player: state.turn
              }
            }
          }
        }
      }
    }
    
    return false
  }
  
  const checkWinner = (state) => {
    
    const tiles = document.querySelectorAll('.tile')
    const rows = checkRows(tiles, state)
    const columns = checkColumns(tiles, state)
    const diagonals = checkDiagonal(tiles, state)
    
    
    if(rows.check) {
      endGame(rows.player)
    } else if(columns.check) {
      endGame(columns.player)
    } else if(diagonals.check) {
      endGame(diagonals.player) 
    }
  }
  
  const endGame = (winner) => {
    const tiles = document.querySelectorAll('.tile')
    tiles.forEach(el => {
      el.onclick = null
    })
    const player = state.players.find(el => el.name == winner)
    updateScore(player)
  }

  export const checkValue = (element) => {
    if(state.turn === 'X') {
      element.innerText = 'X'
      checkWinner(state.turn)
      state.turn = 'O'
    } else if (state.turn === 'O') {
      element.innerText = 'O'
      checkWinner(state.turn)
      state.turn = 'X'
    }
  }