"use strict";
var vector1;
var vector2;

function setup() {
  createCanvas(600, 600);
  vector1 = createVector(50, 50);
  vector2 = createVector(100, 10);
  //vector1.add(vector2);
  var vector3 = vector2.sub(vector1); //get direction and mag
  
  //var distance = vector3.mag();
  //var distance = vector1.dist(vector2);
  
  //use toString()
  print(vector1.toString());

  //mult can only be number!!!!!!

}

function draw() {
  background(0);
  vector1 = createVector(mouseX, mouseY);
  vector1.limit(300);
  stroke(255);
  line(vector1.x, vector1.y, vector2.x, vector2.y);
  var distance = vector1.dist(vector2);
  
  noStroke();
  fill(255);
  text(distance,vector2.x,vector2.y);
}