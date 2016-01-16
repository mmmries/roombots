const WIDTH = 750;
const HEIGHT = 750;
const ROOMBA_RADIUS = WIDTH * 150 / 10000

let canvas = document.getElementById("simulation")
if(canvas) {
  let context = canvas.getContext("2d")
  let board = generateBoard()
  drawBoard(context, board)
  drawRoomba(context, 5000, 5000, 0)
}

function drawBoard(context, board) {
  context.save()
  context.fillStyle = "#000"
  for(var row in board){
    for(var col in board[row]) {
      let cell = board[row][col]
      drawCell(context, row, col, cell)
    }
  }
  context.restore()
}

function drawCell(context, row, col, cell){
  if(cell == 1){
    let x = row * (WIDTH / 100)
    let y = col * (WIDTH / 100)
    context.fillRect(x, y, WIDTH / 100, HEIGHT / 100)
  }
}

function drawRoomba(context, x_mm, y_mm, heading){
  context.save()
  let x = x_mm * (WIDTH / 10000)
  let y = y_mm * (HEIGHT / 10000)
  context.translate(x, y)
  context.rotate(heading)
  context.fillStyle = "#000"
  context.beginPath()
  context.arc(0, 0, ROOMBA_RADIUS, 0, Math.PI * 2, true)
  context.stroke()
  context.beginPath()
  context.arc(0, 0, ROOMBA_RADIUS*0.7, -Math.PI / 3, Math.PI / 3, false)
  context.stroke()
  context.beginPath()
  context.lineWidth = 3
  context.arc(0, 0, ROOMBA_RADIUS, -Math.PI / 3, Math.PI / 3, false)
  context.stroke()
  context.restore()
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
