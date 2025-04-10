import { state } from './state.js'
import { checkValue } from './checks.js'

// creates the onClick event that each tile will use
export const clickedMe = (el) => {
  const element = el.target
  checkValue(element)
  element.onclick = null
}

export const reset = () => {
  const tiles = document.querySelectorAll('.tile')
  tiles.forEach(el => {
    el.innerText = ''
    el.onclick = clickedMe
  })

  state.turn = 'X'
}

// Sets score each player has when game is generated.
export const updateScore = (player) => {
    const tallys = document.querySelectorAll('.tally')
    tallys.forEach(el => {
      const text = el.previousElementSibling.innerText
      if (text.substring(0,1) === player.name) {
        el.innerText = player.score
      }
    })
}

export const reapply = () => {
  const tiles = document.querySelectorAll('.tile')
  tiles.forEach(el => el.onclick = clickedMe)
}
