/* 
******* Bonus *********
Can adjust board size.
Online Multiplayer function.
3+ player functionionality.

******* To-Do **********
Rebuild front-end logic (its a fucking mess).
Store cookie that keeps track of a player's score.
Game UI.
Start a new game.
Add best of 3 and 5.

******* Doing **********
Update highscore after a game session

******* Finished ********
Checks Rows.
Checks Columns.
Checks Diagonals.
Can check for X victory.
Can check for O victory.
Swaps teams after each play.
Can reset the board.
Keeps track of score per game.
Updates the scoreboard.
Landing page that allows you to start a game.
Special effect when winning move.
Add Authentication.
Functional database for keeping track of users and their scores.
Button to wipe score.
Render Player score on landing page when site is loaded.
*/

import { updateHighScore } from './firebase.js'
import {
  clickedMe,
  reset,
  wipeSlate
} from './JS/misc.js'
import { game_state } from './JS/state.js'

// applies the onClick event that will call the clickedMe function.
const tile = document.querySelectorAll('.tile')
tile.forEach(el => {
  el.onclick = clickedMe
})

// Grabs the reset button from the page and applies
// the reset function to it.
const resetBtn = document.querySelector('#reset')
resetBtn.onclick = reset

// Elements needed to handle what pages to render.
const landingPage = document.querySelector('.landing-page')
const boardPage = document.querySelector('.board-page')
const startGameBtn = document.querySelector('.startGame')
const endGameBtn = document.querySelector('#endGame')

// Will hide the landing page and show the board game
const loadBoardPage = () => {
  boardPage.classList.remove('hidePage')
  landingPage.classList.add('hidePage')
}

// Will hide the board, wipe the score, 
// and show the landing page.
const loadLandingPage = () => {
  // wipeSlate()
  landingPage.classList.remove('hidePage')
  boardPage.classList.add('hidePage')
}

startGameBtn.onclick = loadBoardPage
endGameBtn.onclick = loadLandingPage
