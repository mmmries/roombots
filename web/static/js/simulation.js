const WIDTH = 750;
const HEIGHT = 750;

let canvas = document.getElementById("simulation")
if(canvas) {
  let context = canvas.getContext("2d")
  let board = generateBoard()
  context.fillStyle = "#000"
  for(var row in board){
    for(var col in board[row]) {
      let cell = board[row][col]
      drawCell(context, row, col, cell)
    }
  }
}

function drawCell(context, row, col, cell){
  if(cell == 1){
    let x = row * (WIDTH / 100)
    let y = col * (WIDTH / 100)
    context.fillRect(x, y, WIDTH / 100, HEIGHT / 100)
  }
}

function generateBoard(){
  let board = [], full_row = [], capped_row = [];
  for(var i = 0; i < 100; i++){ full_row.push(1) }
  capped_row.push(1)
  for(var i = 0; i < 98; i++){ capped_row.push(0) }
  capped_row.push(1)
  board.push(full_row)
  for(var i = 0; i < 98; i++){ board.push(capped_row) }
  board.push(full_row)
  return board
}

export default canvas
