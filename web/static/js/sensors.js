//map coordinate distance
const PHYSICAL_BUMP_SENSOR_RANGE = 2.5
const LIGHT_SENSOR_RANGE = 4.0

function getNeighbors(roomba, board){
  let x_coord = Math.round(roomba.x / 100)
  let y_coord = Math.round(roomba.y / 100)
  let neighbors = []
  for( var row = -3; row <= 3; row++ ){
    for( var col = -3; col <= 3; col++ ){
      let x = x_coord + col, y = y_coord + row;
      if( x < 0 || y < 0 || x > 100 || y > 100 ){ continue }
      let cell = board[y][x]
      if( cell == 0 ) { continue }
      let dx = x - x_coord, dy = y - y_coord
      let direction = -1 * Math.tanh(dy / dx)
      let distance = Math.sqrt(dy*dy + dx*dx)
      neighbors.push({distance: distance, direction: roomba.heading - direction})
    }
  }
  return neighbors
}

function updateSensorsWithNeighbors(sensors, neighbors){
  for( var i in neighbors ){
    let {direction, distance} = neighbors[i]
    if(direction < (Math.PI / 2) && direction > (-Math.PI / 8) && distance < PHYSICAL_BUMP_SENSOR_RANGE){
      sensors.bumper_left = 1
    }
    if(direction < (Math.PI / 8) && direction > (-Math.PI / 2) && distance < PHYSICAL_BUMP_SENSOR_RANGE){
      sensors.bumper_right = 1
    }
    if(direction > 0.3491 && direction < 0.6109 && distance < LIGHT_SENSOR_RANGE){ //between 20-35 degrees
      sensors.light_bumper_left = 1
    }
    if(direction > 0.1745 && direction < 0.4363 && distance < LIGHT_SENSOR_RANGE){ //between 25-10 degrees
      sensors.light_bumper_left_front = 1
    }
    if(direction > 0.0 && direction < 0.2618 && distance < LIGHT_SENSOR_RANGE){ //between 15-0 degrees
      sensors.light_bumper_left_center = 1
    }
    if(direction < 0.0 && direction > -0.2618 && distance < LIGHT_SENSOR_RANGE){ //between -15-0 degrees
      sensors.light_bumper_right_front = 1
    }
    if(direction < -0.1745 && direction > -0.4363 && distance < LIGHT_SENSOR_RANGE){ //between -25-10 degrees
      sensors.light_bumper_right_front = 1
    }
    if(direction < -0.3491 && direction > -0.6109 && distance < LIGHT_SENSOR_RANGE){ //between -20-35 degrees
      sensors.light_bumper_right = 1
    }
  }
  return sensors
}

export default {

  sensorsEqual: function(s1, s2) {
    return s1.bumper_left == s2.bumper_left &&
           s1.bumper_right == s2.bumper_right
  },

  currentSensors: function(roomba, board){
    let sensors = {
      bumper_left: 0,
      bumper_right: 0,
      light_bumper_left: 0,
      light_bumper_left_front: 0,
      light_bumper_left_center: 0,
      light_bumper_right_center: 0,
      light_bumper_right_front: 0,
      light_bumper_right: 0,
    }
    let neighbors = getNeighbors(roomba, board)
    sensors = updateSensorsWithNeighbors(sensors, neighbors)
    return sensors
  }
}
