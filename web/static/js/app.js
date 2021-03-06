// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "deps/phoenix_html/web/static/js/phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

import socket from "./socket"
import Simulation from "./simulation"
window.Simulation = Simulation

// run simulation if there is a canvas
let canvas = document.getElementById("simulation")
if(canvas){
  let simulation_id = canvas.getAttribute('data-simulation-id')
  let channel = socket.channel("simulator:"+simulation_id, {})
  channel.join()
  window.sim = new Simulation(canvas, channel)
  setInterval(function(){
    window.sim.update(33)
  }, 33);
}
