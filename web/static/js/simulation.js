const WIDTH = 750;
const HEIGHT = 750;
const ROOMBA_RADIUS = WIDTH * 150 / 10000

class Simulation {
  constructor(canvas_id) {
    this.canvas = document.getElementById(canvas_id)
    this.context = this.canvas.getContext("2d")
    this.board = this.generateBoard()
    this.drawBoard()
    this.roomba = {x: 5000, y: 5000, heading: 0}
    this.drawRoomba()
  }

  drawBoard() {
    this.context.save()
    this.context.fillStyle = "#000"
    for(var row in this.board){
      for(var col in this.board[row]) {
        let cell = this.board[row][col]
        this.drawCell(this.context, row, col, cell)
      }
    }
    this.context.restore()
  }

  drawCell(context, row, col, cell){
    if(cell == 1){
      let x = row * (WIDTH / 100)
      let y = col * (WIDTH / 100)
      context.fillRect(x, y, WIDTH / 100, HEIGHT / 100)
    }
  }

  drawRoomba(){
    this.context.save()
    let x = this.roomba.x * (WIDTH / 10000)
    let y = this.roomba.y * (HEIGHT / 10000)
    this.context.translate(x, y)
    this.context.rotate(this.roomba.heading)
    this.context.fillStyle = "#000"
    this.context.beginPath()
    this.context.arc(0, 0, ROOMBA_RADIUS, 0, Math.PI * 2, true)
    this.context.stroke()
    this.context.beginPath()
    this.context.arc(0, 0, ROOMBA_RADIUS*0.7, -Math.PI / 3, Math.PI / 3, false)
    this.context.stroke()
    this.context.beginPath()
    this.context.lineWidth = 3
    this.context.arc(0, 0, ROOMBA_RADIUS, -Math.PI / 3, Math.PI / 3, false)
    this.context.stroke()
    this.context.restore()
  }

  generateBoard(){
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
}
export default Simulation
