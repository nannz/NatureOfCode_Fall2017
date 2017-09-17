"use strict";


var circles = [];
var numOfFire = 200;
var mode;

function setup() {
  createCanvas(600, 600);
  background(0);
  mode = 0;

  for (var i = 0; i < numOfFire; i++) {
    circles[i] = new Circle(width / 2, height, -10);
  }

}

function draw() {
  background(0, 10);
  for (var i = 0; i < circles.length; i++) {
    var c = circles[i];
    c.update(mode);
    //c.applyGravity(0.1);
    c.display(mode);
  }
}

function keyPressed() {
  for (var i = 0; i < circles.length; i++) {
    var c = circles[i];
    c.explode();
  }
}

function mouseDragged() {
  mode = 1;
  for (var i = 0; i < circles.length; i++) {
    var c = circles[i];
    c.isExploded = false;
  }
}

function mouseReleased() {
  mode = 0;
   for (var i = 0; i < circles.length; i++) {
    var c = circles[i];
    c.isExploded = true;
    c.explode();
  }
}

class Circle {

  constructor(_x, _y, _velY) {
    this.position = createVector(_x, _y);
    this.acc = createVector(0, 0);
    this.vel = createVector(0, _velY);

    this.isExploded = false;

    this.angle = random(PI * 2);
    this.angleVel = random(0.05, 0.01);
    this.count = 0;

    this.dia = random(5, 10);

  }
  update(mode) {
    this.updateAcc(mode);
    this.vel.add(this.acc);
    this.position.add(this.vel);

    if (this.isExploded) {
      this.vel.mult(0.9);
      this.count++;
    }
  }
  applyGravity(g) {
    this.vel.y += g;
  }
  updateAcc(mode) {
    if (mode == 0) {
      this.acc = createVector(0, 0.1);
    } else if (mode == 1) {
      //mouse
      var mouseVector = createVector(mouseX, mouseY);
      var dir = mouseVector.sub(this.position);
      dir.normalize();
      dir.mult(0.5);
      this.acc = dir;
    }
  }
  explode() {
    this.isExploded = true;
    this.vel.x = random(-10, 10);
    this.vel.y = random(-10, 10);
  }
  display(mode) {
    if (mode == 0) {
      push();
      translate(this.position.x, this.position.y);
      rotate(frameCount * this.angleVel + this.angle);
      noStroke();
      fill(255, 150);
      ellipse(this.count, 0, this.dia, this.dia);
      pop();
    } else if (mode == 1) {
      noStroke();
      fill(255, 150);
      ellipse(this.position.x, this.position.y, this.dia, this.dia);
    }
  }
}