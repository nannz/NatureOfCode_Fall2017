"use strict";

class Ball {
  constructor(_positionX, _positionY) {
    this.position = createVector(_positionX, _positionY);
    this.speed = createVector(0, 0);
    this.r = random(5.0, 10.0);
    this.acceleration = createVector(0, 0);
    this.ballFill = color(0, 0, 0);
    this.topSpeed = 10; //set the max value of speed
    this.mass = 1;
  }


  applyForce(force) {
    force.div(this.mass); //gravity/m
    this.acceleration.add(force);
  }

  updatePosition() {
    this.speed.add(this.acceleration);
    this.speed.limit(this.topSpeed);
    this.position.add(this.speed);
    this.acceleration.mult(0); //reset acce
  }

  checkEdges() {
    if (this.position.x < this.r) {
      this.updateFill();
      this.position.x = this.r; //in the window keep x
      this.speed.x = -this.speed.x;
    } else if (this.position.x > width - this.r) {
      this.updateFill();
      this.position.x = width - this.r;
      this.speed.x = -this.speed.x;
    }
    if (this.position.y < this.r) {
      this.updateFill();
      this.position.y = this.r;
      this.speed.y = -this.speed.y;
    } else if (this.position.y > height - this.r) {
      this.updateFill();
      this.position.y = height - this.r;
      this.speed.y = -this.speed.y;
    }
  };

  display() {
    noStroke();
    fill(this.ballFill);
    ellipseMode(RADIUS);
    ellipse(this.position.x, this.position.y, this.r, this.r);
  };

  updateFill() {
    this.ballFill = color(random(0, 255), random(0, 255), random(0, 255));
  }

  getPosition() {
    return this.position.copy();
  }

  getSpeed() {
    return this.speed.copy();
  }

  getFriction(c, normal) { //摩擦阻力
    var frictionMag = c * normal;
    var friction = this.getSpeed();
    friction.mult(-1);
    friction.normalize(); //get the direction
    friction.mult(frictionMag);
    return friction;
  }
  
  getDrag(cDrag){ //流体里的阻力
    var speed = this.speed.mag();
    var dragMag = cDrag * speed * speed;
    var drag = this.getSpeed();
    drag.mult(-1);
    drag.normalize();
    drag.mult(dragMag);
    return drag
  }
}