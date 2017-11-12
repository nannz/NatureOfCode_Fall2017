//spring
//A B
//Hooke's law
//force.mult(-1 * this.k * sktretch);
"use strict";
var ballA, ballB;
var spring;
function setup() {
  createCanvas(500,600);
  noStroke();
  ballA = new Ball(width/2, height/2, 30);
  ballB = new Ball(width/2 +100, height/2 + 100, 30);
  spring = new Spring(ballA, ballB, 150);
}

function draw() {
  background(0);
  
  spring.update();
  spring.display();
  
 
  
  ballA.drag();
  //ballA.update();
  ballA.display();
  
  var gravity = createVector(0,1);
  gravity.mult(ballB.mass);
  //ballB.applyForce(gravity);
  
  
  ballB.drag();
  ballB.update();
  ballB.display();
}