"use strict";
var vehicles = [];
var RESOLUTION = 50;
var rows, cols;
var angles = [];
function setup() {
  createCanvas(500, 600);
  background(0);
  
  for(var i = 0; i < 10;i++){
  vehicles.push(new Vehicle(width / 2 + random(-30,30), height / 2+ random(-30,30)));
  }
  //instead of using floor(), use ceil()
  rows = ceil(width / RESOLUTION);
  cols = ceil(height / RESOLUTION);
  
}

function draw() {
  background(0);
  for (var c = 0; c < cols; c++) {
    for (var r = 0; r < rows; r++) {
      var x = r * RESOLUTION;
      var y = c * RESOLUTION;
      
      var fluctuation = 0.8;
      var randomness = 0.003;
      
      var freqX = (x+frameCount *  fluctuation) * randomness;
      var freqY = (y+frameCount * fluctuation) * randomness;
      var noiseVal = noise(freqX, freqY);//get a value from 0 - 1
      var angle = noiseVal * TWO_PI;//0-360, but 正态分布的
      
      var index = r + c * rows;//pixel iteration
      angles[index] = angle;
      
      push();
      translate(x, y);
      
      push();
      translate(RESOLUTION/2,RESOLUTION/2);
      rotate(angle);
      stroke(255);
      line(0,0,RESOLUTION/2, 0);
      pop();
      
      pop();
    }
  }
  noStroke();

  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    
    // var target = createVector(mouseX, mouseY);
    // v.seek(target);
    
    var r = floor(v.pos.x / RESOLUTION);
    var c = floor(v.pos.y / RESOLUTION);
    var index = r + c * rows;
    v.flow(angles[index]);
    
    v.update();
    v.checkEdges();
    v.display();
  }
}