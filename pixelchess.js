
const pieces = ['none', 'pawn', 'bishop', 'knight', 'rook', 'queen', 'king']

const FLAGS = 2
const FLAG_TOUCH = 1 << 0
const FLAG_PLAYER = 1 << 1

const MOVE_NORMAL = 1 << 0
const MOVE_CAPTURE = 1 << 1
const MOVE_CASTLING = 1 << 2

const default_move = {
  type: MOVE_NORMAL | MOVE_CAPTURE,
  move: [0, 0],
  opponent: [0, 0],
  range: false
}

const moves = [
  [],
  // Pawn
  [
    {type: MOVE_NORMAL, move: [0, 1]},
    {type: MOVE_NORMAL, move: [0, 2]},
    {type: MOVE_CAPTURE, move: [-1, 1], opponent: [0, -1]}, // En passant left
    {type: MOVE_CAPTURE, move: [1, 1], opponent: [0, -1]} // En passant right
  ],
  // Bishop
  [
    {move: [1, 1], range: true},
    {move: [-1, 1], range: true},
    {move: [1, -1], range: true},
    {move: [-1, -1], range: true}
  ],
  // Knight
  [
    {move: [1, 2]},
    {move: [-1, 2]},
    {move: [1, -2]},
    {move: [-1, -2]},
    {move: [2, 1]},
    {move: [2, -1]},
    {move: [-2, 1]},
    {move: [-2, -1]},
  ],
  // Rook
  [
    {move: [1, 0], range: true},
    {move: [-1, 0], range: true},
    {move: [0, 1], range: true},
    {move: [0, -1], range: true}
  ],
  // Queen = Bishop + Rook
  [
    {move: [1, 1], range: true},
    {move: [-1, 1], range: true},
    {move: [1, -1], range: true},
    {move: [-1, -1], range: true},
    {move: [1, 0], range: true},
    {move: [-1, 0], range: true},
    {move: [0, 1], range: true},
    {move: [0, -1], range: true}
  ],
  // King
  [
    {move: [1, 0]},
    {move: [-1, 0]},
    {move: [0, 1]},
    {move: [0, -1]},
    {type: MOVE_CASTLING, move: [-2, 0]}, // Castling left
    {type: MOVE_CASTLING, move: [2, 0]} // Castling right
  ]
]

function whole(i) {
  return (i % 1) == 0
}

function unpack_coord(i) {
  return [i % 8, Math.floor(i / 8)]
}

function initial_state() {
  let state = [
    4,3,2,5,6,2,3,4,
    1,1,1,1,1,1,1,1,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    1,1,1,1,1,1,1,1,
    4,3,2,5,6,2,3,4
  ]
  for (let i = 0; i < state.length; i++) {
    state[i] = (state[i] << FLAGS) + (i < 16 ? FLAG_PLAYER : 0)
  }
  return state
}

function create_board(container) {
  let cells = []
  for (let i = 0; i < 8; i++) {
    let row = document.createElement('div')
    for (let j = 0; j < 8; j++) {
      let cell = document.createElement('div')
      cell.appendChild(document.createElement('div'))
      row.appendChild(cell)
      cells.push(cell)
    }
    container.appendChild(row)
  }
  return cells
}

function update_board(cells, state) {
  for (let i = 0; i < state.length; i++) {
    cells[i].className = 'piece'
    cells[i].classList.add(pieces[state[i] >> FLAGS])
    if ((state[i] & FLAG_PLAYER) != 0) {
      cells[i].classList.add('black')
    }
  }
}

function check_move(state, src, dst, move) {
  // Valid movement delta.
  let a = unpack_coord(src), b = unpack_coord(dst)
  let mx = move.delta[0], my = move.delta[1]
  let dx = b[0] - a[0], dy = b[1] - a[1]

  // Find movement multiplication factor.
  let factor = 0
  let rx = dx / mx, ry = dy / my
  if (whole(rx) && rx > 0 && dy == my * rx) {
    factor = rx
  } else if (whole(ry) && ry > 0 && dx == mx * ry) {
    factor = ry
  }

  // Case 1: Move to empty cell.
  // if (state[end] == 0 && (move.type & MOVE_NORMAL) != 0) {

  // Case 2: Capture opponent.
  // ((state[src] & FLAG_PLAYER) != (state[dst] & FLAG_PLAYER)) {

  // Case 3: Castling.
  // else if ((move.type & MOVE_CASTLING) != 0) {
  // Select rook.
  // Check if king and rook are untouched.
  // Check if cells between king and rook are empty.
  // Check if king passes through a check position.

  return false
}

// Find a legal move to move state[src] to dst.
function interpret_move(state, src, dst, moves) {
  let piece = state[src] >> FLAGS
  for (let move in moves[piece]) {
    let full_move = Object.assign({}, default_move, move)
    if (check_move(state, src, dst, full_move)) {
      return full_move
    }
  }
  return undefined
}

function apply_move(state, src, dst, move) {
}

// Start the game!
let board = document.getElementById('board')
let cells = create_board(board)
let state = initial_state()
update_board(cells, state)
