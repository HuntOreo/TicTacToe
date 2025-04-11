/* 
******* Finished ********
Checks Rows
Checks Columns
Checks Diagonals
Can check for X victory
Can check for O victory
Swaps teams after each play
Can reset the board
Keeps track of score per game
Updates the scoreboard
Landing page that allows you to start a game

******* Doing **********
Game UI

******* To-Do **********
Store cookie that keeps track of a player's score
Render Player score on landing page when site is loaded
Button to wipe score and start a new game
Add best of 3 and 5
Special effect when winning move

******* Bonus *********
Can adjust board size
Online Multiplayer function
3+ player functionionality
*/

import { state } from './state.js'
import {
  clickedMe,
  reset,
  reapply
} from './misc.js'


// applies the onClick event that will call the clickedMe function.
const tile = document.querySelectorAll('.tile')
tile.forEach(el => {
  el.onclick = clickedMe
})

// Grabs the reset button from the page and applies
// the reset function to it.
const resetBtn = document.querySelector('#reset')
resetBtn.onclick = reset

// Will hide the landing page and show the board game
const landingPage = document.querySelector('.landing-page')
const boardPage = document.querySelector('.board-page')

const startGameBtn = document.querySelector('.startGame')
const loadBoardPage = () =>{
  

  boardPage.classList.remove('hidePage')
  landingPage.classList.add('hidePage')
}

// Will hide the landing page and show the board game
const endGameBtn = document.querySelector('#endGame')
const loadLandingPage = () =>{

  wipeSlate()
  landingPage.classList.remove('hidePage')
  boardPage.classList.add('hidePage')
}


const wipeSlate = () => {

  let count = 0
  const scores = document.querySelectorAll('.score')

  state.turn = 'X'
  state.players.forEach((player)=> {
    player.score = 0
    if (count < state.players.length) {
      scores[count].innerHTML = ""
      scores[count].innerHTML = `
          <div class="scoreWindow">
            <p>${player.name} Score:</p>
            <p class="tally">${player.score}</p>
          </div>
        `
      count++
    }
  })

  reset()

}


// window.addEventListener('resize', () => {
//   document.body.style.display = 'none';
//   document.body.offsetHeight; // force reflow
//   document.body.style.display = '';
// });

startGameBtn.onclick = loadBoardPage
endGameBtn.onclick = loadLandingPage