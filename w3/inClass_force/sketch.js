"use strict";
//this.vel.heading() function //Calculate the angle of rotation for this vector (only 2D vectors)
//force = p5.Vector.fromAngle(angle - PI / 2);
var c;

function setup() {
  createCanvas(600, 600);
  c = new Circle(width / 2, height / 2);
  background(0);
}

function draw() {
  //background(0);

  var angle = c.vel.heading();
  print(angle);

  if (keyIsPressed) {
    var force = createVector();
    if (keyCode == LEFT_ARROW) {
      force = p5.Vector.fromAngle(angle - PI / 2);
    } else if (keyCode == RIGHT_ARROW) {
      force = p5.Vector.fromAngle(angle + PI / 2);
    }

    force.mult(0.1);
    c.applyForce(force);
  }



  c.update();
  c.bounce();
  c.display();
}

class Circle {
  constructor(_x, _y) {
    this.pos = createVector(_x, _y);
    this.vel = createVector(1, 0);
    this.acc = createVector();
    this.r = 50;
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0); //reset the acc
  }

  applyForce(force) {
    this.acc = force;
  }

  //checkEdge
  bounce() {
    if (this.pos.x < 0 || this.pos.x > width) {
      this.vel.x = -this.vel.x;
    }
    if (this.pos.y < 0 || this.pos.y > height) {
      this.vel.y = -this.vel.y;
    }
    this.pos.x = constrain(this.pos.x, 0, width);
    this.pos.y = constrain(this.pos.y, 0, height);
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);

    noStroke();
    fill(255);
    //ellipse(0, 0, this.r, this.r);

    stroke(255,0,0);
    line(0,0,this.vel.x * 10, this.vel.y*10);
    pop();
  }
}