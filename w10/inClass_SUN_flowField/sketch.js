"use strict";
var vehicles = [];
var RESOLUTION = 50;
var rows, cols;

function setup() {
  createCanvas(500, 600);
  background(0);
  vehicles.push(new Vehicle(width / 2, height / 2));
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
      
      var fluctutation = 1.0;
      var randomness = 0.005;
      
      var freqX = (x+frameCount *  fluctutation) * randomness;
      var freqY = (y+frameCount * fluctutation) * randomness;
      var noiseVal = noise(freqX, freqY);//get a value from 0 - 1
      var angle = noiseVal * TWO_PI;//0-360, but 正态分布的
      
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
    var target = createVector(mouseX, mouseY);
    v.seek(target);
    v.update();
    v.display();
  }
}