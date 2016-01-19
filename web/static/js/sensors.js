//map coordinate distance
const PHYSICAL_BUMP_SENSOR_RANGE = 2.0
const LIGHT_SENSOR_RANGE = 3.5
const TAO = Math.PI * 2

function getNeighbors(roomba, board){
  let x_coord = Math.round(roomba.x / 100)
  let y_coord = Math.round(roomba.y / 100)
  let neighbors = []
  for( var row = -3; row <= 3; row++ ){
    for( var col = -3; col <= 3; col++ ){
      let x = x_coord + col, y = y_coord + row;
      if( x < 0 || y < 0 || x > 99 || y > 99 ){ continue }
      let cell = board[y][x]
      if( cell == 0 ) { continue }
      let dx = x - x_coord, dy = y - y_coord
      let direction = -Math.atan2(-dy, dx)
      let distance = Math.sqrt(dy*dy + dx*dx)
      let relative_direction = normalizeTheta(direction - roomba.heading)
      neighbors.push({dx: dx, dy: dy, distance: distance, direction: relative_direction})
    }
  }
  return neighbors
}

function normalizeTheta(theta){
  return theta - TAO * Math.floor((theta + Math.PI) / TAO)
}

function updateSensorsWithNeighbors(sensors, neighbors){
  for( var i in neighbors ){
    let {direction, distance} = neighbors[i]
    if(direction < 1.5708 && direction > -0.3927 && distance < PHYSICAL_BUMP_SENSOR_RANGE){
      sensors.bumper_right = 1
    }
    if(direction < 0.3927 && direction > -1.5708 && distance < PHYSICAL_BUMP_SENSOR_RANGE){
      sensors.bumper_left = 1
    }
    if(direction >= 0.6981 && direction <= 1.0472 && distance <= LIGHT_SENSOR_RANGE){ //between 40 to 60 degrees
      sensors.light_bumper_right = 1
    }
    if(direction >= 0.3491 && direction <= 0.6981 && distance <= LIGHT_SENSOR_RANGE){ //between 20 to 40 degrees
      sensors.light_bumper_right_front = 1
    }
    if(direction >= 0.0 && direction <= 0.3491 && distance <= LIGHT_SENSOR_RANGE){ //between 20 to 0 degrees
      sensors.light_bumper_right_center = 1
    }
    if(direction <= 0.0 && direction >= -0.3491 && distance <= LIGHT_SENSOR_RANGE){ //between 0 to 20 degrees
      sensors.light_bumper_left_center = 1
    }
    if(direction <= -0.3491 && direction >= -0.6981 && distance <= LIGHT_SENSOR_RANGE){ //between 20 to 40 degrees
      sensors.light_bumper_left_front = 1
    }
    if(direction <= -0.6981 && direction >= -1.0472 && distance <= LIGHT_SENSOR_RANGE){ //between 40 to 60 degrees
      sensors.light_bumper_left = 1
    }
  }
  return sensors
}

export default {
  sensorsEqual: function(s1, s2) {
    return s1.bumper_left == s2.bumper_left &&
           s1.bumper_right == s2.bumper_right &&
           s1.light_bumper_right == s2.light_bumper_right &&
           s1.light_bumper_right_front == s2.light_bumper_right_front &&
           s1.light_bumper_right_center == s2.light_bumper_right_center &&
           s1.light_bumper_left_center == s2.light_bumper_left_center &&
           s1.light_bumper_left_front == s2.light_bumper_left_front &&
           s1.light_bumper_left == s2.light_bumper_left
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
  },

  getNeighbors: getNeighbors
}
