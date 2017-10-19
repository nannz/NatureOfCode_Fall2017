"use strict";
var p;
function setup() {
  createCanvas(500,600);
  p = new Shape(random(width),random(height));
}

function draw() {
  background(0);
  var pos = createVector(mouseX,mouseY);
  p.applyAttraction(pos);
  p.update();
  p.display();
}