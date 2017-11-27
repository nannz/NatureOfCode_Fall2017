"use strict"
//use antonomous agent
var v;

function setup() {
  createCanvas(500,600);
  noStroke();
  fill(255);
  
  v = new Vehicle(width/2, height/2);
}

function draw() {
  background(0);
  
  var target = createVector(mouseX, mouseY);
  v.seek(target);
  v.update();
  v.display();
}