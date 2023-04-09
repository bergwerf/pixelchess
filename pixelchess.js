let board = document.getElementById('board')

for (let i = 0; i < 8; i++) {
  let row = document.createElement('div')
  for (let j = 0; j < 8; j++) {
    let cell = document.createElement('div')
    row.appendChild(cell)
  }
  board.appendChild(row)
}
