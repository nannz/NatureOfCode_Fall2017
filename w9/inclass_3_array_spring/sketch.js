//spring
//A B
//Hooke's law
//force.mult(-1 * this.k * sktretch);

//try adjusting damping, k, and length values.

"use strict";
var balls = []; //ballA, ballB;
var springs = [];

function setup() {
  createCanvas(500, 600);
  noStroke();

  //create 3 balls
  balls.push(new Ball(width / 2, height / 2, 5));
  balls.push(new Ball(width / 2 + 100, height / 2 + 100, 20));
  balls.push(new Ball(width / 2 + 200, height / 2 + 200, 15));

  springs.push(new Spring(balls[0], balls[1], 100));
  springs.push(new Spring(balls[1], balls[2], 60));
  //spring = new Spring(ballA, ballB, 150);
}

function draw() {
  background(0);

  for (var i = 0; i < springs.length; i++) {
    var s = springs[i];
    s.update();
    s.display();
  }

  for (var i = 0; i < balls.length; i++) {
    var b = balls[i];
    if (i != 0) {
      var gravity = createVector(0, 1);
      gravity.mult(b.mass);
     // b.applyForce(gravity); //try apply and not apply the gravity

      b.drag();
      b.update();
    }
    b.display()
  };

  
}