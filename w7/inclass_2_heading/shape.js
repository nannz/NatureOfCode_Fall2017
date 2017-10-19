"use strict";

class Shape {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-3, 3), random(-3, 3));
    this.acc = createVector();
    this.angel = 0;
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.vel.mult(0.9);
    
    //NOTES ON sin and cos 
    //suppose we only know point(x,y)
    //angle = atan(y/x) -->****
    //atan needs four if statement to calculate 第一第二第三第四象限的数值
    //so use vel.heading or atan2(y/x)

    
    this.angle = this.vel.heading();
    this.angle = atan2(this.vel.y,this.vel.x);
  }
  applyForce(force) {
    this.acc.add(force);
  }
  applyAttraction(otherPos) {
    var vector = p5.Vector.sub(otherPos, this.pos);
    vector.mult(0.01);
    this.applyForce(vector);
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    triangle(0, 0, -50, 20, -50, -20);
    pop();
  }
}