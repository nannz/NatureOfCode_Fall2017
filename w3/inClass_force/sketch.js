"use strict";
//be careful about the vector from angle.
//this.vel.heading() function //Calculate the angle of rotation for this vector (only 2D vectors)
//force = p5.Vector.fromAngle(angle - PI / 2);
// acc = force/mass
//careful to calculate gravity. should multi mass

//next class will cover attraction
var circles = [];

var CO_RESTITUTION = 0.9; //摩擦系数
var normal = 1; //垂直抗力

var GRAVITY_MAG = 1;
var FRICTION_MAG = 2;

function setup() {
  createCanvas(600, 600);
  //c = new Circle(width / 2, height / 2);

  circles[0] = new Circle(width / 2 - 150, height / 2);
  circles[1] = new Circle(width / 2, height / 2);
  circles[2] = new Circle(width / 2 + 150, height / 2);
  background(0);
}

function draw() {
  background(0);
  for (var i = 0; i < circles.length; i++) {
    var c = circles[i];
    var gravity = createVector(0, GRAVITY_MAG);
    gravity.mult(c.mass);
    c.applyForce(gravity);
    
    var wind = createVector(1,0);
    c.applyForce(wind);

    var friction = p5.Vector.mult(c.vel,-1);
    friction.normalize();
    friction.mult(FRICTION_MAG);
    friction.limit(c.vel.mag());
    c.applyForce(friction);
    
    c.update();
    c.bounce();
    c.display();

  }

/*
  var angle = c.vel.heading();
  //print(angle);

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

*/


}

class Circle {
  constructor(_x, _y) {
    this.pos = createVector(_x, _y);
    this.vel = createVector(0, 0);
    this.acc = createVector();
    this.mass = random(1, 10);
    this.r = map(this.mass,1,10,10,50);

    //*** set mass from 1
    
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0); //reset the acc
  }

  applyForce(force) { 
    force.div(this.mass);
    this.acc.add(force);
  }

  //checkEdge
  bounce() {
    if (this.pos.x < 0 || this.pos.x > width) {
      this.vel.x = -this.vel.x;
      this.vel.mult(CO_RESTITUTION);//乘以摩擦力。。
    }
    if (this.pos.y < 0 || this.pos.y > height) {
      this.vel.y = -this.vel.y;
      this.vel.mult(CO_RESTITUTION);
    }
    this.pos.x = constrain(this.pos.x, 0, width);
    this.pos.y = constrain(this.pos.y, 0, height);
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);

    noStroke();
    fill(255);
    ellipse(0, 0, this.r, this.r);

    stroke(255, 0, 0);
    line(0, 0, this.vel.x * 10, this.vel.y * 10);
    pop();
  }
}