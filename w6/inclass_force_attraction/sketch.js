"use strict"
var C_GRAVITY = 20;
var p1, p2;

function setup() {
  createCanvas(800,600);
  
  p1 = new Particle(100, height/2, 5);
  //p1.vel.y = 15; //give p1 an initial speed of y; cheap way to rotating effect
  p2 = new Particle(width - 100, height/2, 15);
}

function draw() {
  background(0);
  
  p1.applyAttraction(p2);
  p1.update();
  p1.display();
  
  p2.applyAttraction(p1);
  p2.update();
  p2.display();
}