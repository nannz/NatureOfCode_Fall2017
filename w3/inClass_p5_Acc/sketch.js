"use strict";
var c;

function setup() {
  createCanvas(600, 600);
  background(0);
  c = new Circle(width / 2, height / 2);
}

function draw() {
  background(0);

  c.applyForce();
  c.update();
  c.display();
}



class Circle {
  constructor(_x, _y) {
    this.pos = createVector(_x, _y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = random(5, 50);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    fill(255);
    noStroke();
    ellipse(0, 0, this.r, this.r);
    pop();
  }

  applyForce() {
    // this.acc.add(force);
    var mouseVector = createVector(mouseX, mouseY);
    var dir = mouseVector.sub(this.position);
    dir.normalize();
    dir.mult(0.01);
    this.acc = dir;
  }

}