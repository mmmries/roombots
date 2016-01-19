import Sensors from "./sensors"

const WIDTH = 750;
const HEIGHT = 750;
const ROOMBA_RADIUS = WIDTH * 150 / 10000

class Simulation {
  constructor(canvas, channel) {
    this.canvas = canvas
    this.channel = channel
    this.context = this.canvas.getContext("2d")
    this.board = this.generateBoard()
    this.roomba = {x: 5000, y: 5000, heading: 0}
    this.drive = {velocity: 0, radius: 0}
    this.sensors = Sensors.currentSensors(this.roomba, this.board)
    this.update(33)

    let that = this
    channel.on("drive", function(payload){
      that.drive = payload
    })
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

  clear(){
    this.context.clearRect(0, 0, WIDTH, HEIGHT);
  }

  getNeighbors(){
    return Sensors.getNeighbors(this.roomba, this.board)
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

  redraw(){
    this.clear()
    this.drawBoard()
    this.drawRoomba()
  }

  update(interval_ms){
    this.updateRoomba(interval_ms)
    this.updateSensors()
    this.redraw()
  }

  updateRoomba(interval_ms){
    let proposal = this.proposedRoombaPosition(interval_ms)
    if( this.valid(proposal) ){
      this.roomba = proposal
    }
  }

  proposedRoombaPosition(interval_ms){
    if(this.drive.radius == 0){
      let distance = this.drive.velocity * interval_ms / 1000
      let distance_x = distance * Math.cos(this.roomba.heading)
      let distance_y = distance * Math.sin(this.roomba.heading)
      return {x: this.roomba.x + distance_x, y: this.roomba.y + distance_y, heading: this.roomba.heading}
    } else {
      let distance = this.drive.velocity * interval_ms / 1000
      let circumference = 2 * Math.PI * this.drive.radius * -1
      let percentage = distance / circumference
      let heading = this.roomba.heading + (2 * Math.PI * percentage)
      let x = this.roomba.x + (distance * Math.cos(this.roomba.heading))
      let y = this.roomba.y + (distance * Math.sin(this.roomba.heading))
      return {x: x, y: y, heading: heading}
    }
  }

  valid(proposal){
    let x_coord = Math.round(proposal.x / 100)
    let y_coord = Math.round(proposal.y / 100)
    let sum = 0
    for(var row = -1; row <= 1; row ++){
      for(var col = -1; col <= 1; col++){
        let x = x_coord + col, y = y_coord + row
        if (x < 0 || y < 0 || x > 99 || y > 99){
          sum + 1
        } else {
          sum += this.board[y_coord + row][x_coord + col]
        }
      }
    }
    return sum == 0
  }

  updateSensors(){
    let current_sensors = Sensors.currentSensors(this.roomba, this.board)
    if( !Sensors.sensorsEqual(this.sensors, current_sensors) ){
      this.sensors = current_sensors
      this.channel.push("sensor_update", this.sensors)
    }
  }
}
export default Simulation
