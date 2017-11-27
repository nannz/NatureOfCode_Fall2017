"use strict"
//use antonomous agent
var v;
var MARGIN = 50;
function setup() {
  createCanvas(500,600);
  noStroke();
  fill(255);
  
  v = new Vehicle(width/2, height/2);
  v.vel = createVector(5, -2);
}

function draw() {
  background(0);
  //area
  noFill();
  stroke(150);
  rect(MARGIN, MARGIN, width - MARGIN*2, height - MARGIN*2);
  var target = createVector(mouseX, mouseY);
  //v.seek(target);
  v.update();
  v.checkArea();
  v.display();
}