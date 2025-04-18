export let game_state = {
  turn: 'X',
  players: [
    { name: 'X', score: 0 },
    { name: 'O', score: 0 },
  ]
}

export let current_user = {
  uid: null,
  name: null,
  highscore: null,
  avatar: 'X'
}