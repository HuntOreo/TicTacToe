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

******* Doing **********
Game UI

******* To-Do **********
Button to wipe score and start a new game
Add best of 3 and 5
Special effect when winning move

******* Bonus *********
Can adjust board size
Online Multiplayer function
3+ player functionionality
*/

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

window.addEventListener('resize', () => {
  document.body.style.display = 'none';
  document.body.offsetHeight; // force reflow
  document.body.style.display = '';
});