"use strict";
/*
一个圆，边缘是我们的vehicle，圆心是detectVector,//其实是速度的方向*predictdistance
vehicle到圆心的距离是predictdist
directionVecotr是检测到的target到detectvector的sub
*/
class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(1,1);
    this.acc = createVector();
    this.angle = 0;

    this.maxDesiredVel = 1;
    this.maxSteerForce = 0.05;

    //to detect //HERE!!!!! 11/21
    this.detectVector = createVector();
    this.directionVector = createVector();
    this.predictDistance = 40;
    this.detectRadius = 50;
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.angle = this.vel.heading();
  }
  detect(target) {
    this.detectVector = p5.Vector.mult(this.vel.copy().normalize(), this.predictDistance); //速度的方向 + 设定的检测距离
    var centerPos = p5.Vector.add(this.pos, this.detectVector);
    this.directionVector = p5.Vector.sub(target, centerPos);
    if (this.directionVector.mag() < this.detectRadius) {
      this.directionVector.setMag(this.detectRadius);
      this.directionVector.mult(-1);//相斥
      //this.seek(this.directionVector); WRONG!
      //要加上centerPos, 因为是从坐标（0，0）开始的
      var newTarget = p5.Vector.add(this.directionVector, centerPos);
      this.seek(newTarget);
    } else {
      this.directionVector.setMag(this.detectRadius);
    }

  }
  seek(target) {
    var desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxDesiredVel);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxSteerForce);
    this.applyForce(steer);
  }
  applyForce(force) {
    this.acc.add(force);
  }
  checkEdges() {
    if (this.pos.x < 0) {
      this.pos.x = width;
    } else if (this.pos.x > width) {
      this.pos.x = 0;
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
    } else if (this.pos.y > height) {
      this.pos.y = 0;
    }
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);

    push();
    rotate(this.angle);
    noStroke();
    fill(255);
    triangle(0, 0, -20, 8, -20, -8);
    pop();

    //detecting
    noFill();
    stroke(255, 0, 0);
    line(0, 0, this.detectVector.x, this.detectVector.y); //red
    translate(this.detectVector.x, this.detectVector.y);
    ellipse(0, 0, this.detectRadius * 2, this.detectRadius * 2) //red
    stroke(0, 255, 0);
    line(0, 0, this.directionVector.x, this.directionVector.y); //green
    pop();
  }
}