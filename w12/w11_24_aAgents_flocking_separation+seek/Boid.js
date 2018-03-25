"use strict";

class Boid {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-1,1),random(-1,1));
    this.acc = createVector();

    this.maxSpeed = 3; // max speed;
    this.maxSteerForce = 0.05; // max steering force

    this.separateDistance = 30;
  }
  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed); //***
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.angle = this.vel.heading();
  }
  applyForce(force) {
    this.acc.add(force);
  }
  flock(boids) {
    var mouseVec = createVector(mouseX, mouseY);
    
    var seekForce = this.seek(mouseVec);
    var sepaForce = this.separate(boids);
    seekForce.mult(1.0);
    sepaForce.mult(1.0);
    
    this.applyForce(seekForce);
    this.applyForce(sepaForce);
  }
  seek(target) {
    var desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxSpeed);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxSteerForce);
    return steer;
  }
  separate(boids) {
    var vector = createVector(); // sum for now
    var count = 0;
    for (var i = 0; i < boids.length; i++) {
      var other = boids[i];
      var distance = this.pos.dist(other.pos);
      if (distance > 0 && distance < this.separateDistance) {
        var diff = p5.Vector.sub(this.pos, other.pos);
        diff.normalize();
        diff.div(distance);
        // let's get the sum!
        vector.add(diff);
        count++;
      }
    }
    // let's get the average
    if (count > 0) {
      vector.div(count);
    }
    if (vector.mag() > 0) {//***x
      // desired
      vector.setMag(this.maxSpeed);
      // steer
      vector.sub(this.vel);
      vector.limit(this.maxSteerForce);
    }
    return vector;
  }
  checkEdges() {
    // x
    if (this.pos.x < 0) {
      this.pos.x = width;
    } else if (this.pos.x > width) {
      this.pos.x = 0;
    }
    // y
    if (this.pos.y < 0) {
      this.pos.y = height;
    } else if (this.pos.y > height) {
      this.pos.y = 0;
    }
  }
  display() {
    push();

    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    noStroke();
    fill(255);
    triangle(0, 0, -20, 8, -20, -8);
    pop();
  }
}