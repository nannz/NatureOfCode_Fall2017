"use strict";

class Particle {
  constructor() {
    this.pos = createVector(0, 0, 0);
    this.vel = createVector();
    this.acc = createVector();

    this.mass = random(1, 5);
    this.rad = this.mass * 3;

    //color
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
    this.a = 100;
  }

  setPosition(x, y, z) {
    this.pos = createVector(x, y, z);
    return this;
  }
  setVelocity(x, y, z) {
    this.vel = createVector(x, y, z);
    return this;
  }
  setColor(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
    return this;
  }


  checkFloor() {
    if (this.pos.x > -FLOOR_SIZE / 2 && this.pos.x < FLOOR_SIZE / 2 && //可以用abs 少写两个判断
      this.pos.z > -FLOOR_SIZE / 2 && this.pos.z < FLOOR_SIZE / 2) {
      //if in the floor are
      //they bounce, else drop
      if (this.pos.y - this.rad < FLOOR_LEVEL) { //注意加减法
        this.pos.y = FLOOR_LEVEL + this.rad;
        this.vel.y *= -1;
        //restitution
        var co_restitution = map(this.mass, 0, 10, 0.99,0.8); //小球少更少速度，会跳更高
        this.vel.y *= co_restitution;
      }
    }


  }
  applyForce(force) {
    force.div(this.mass);
    this.acc.add(force);
  }
  checkCollision(other){
    //check distance
    var distance = this.pos.dist(other.pos);
    if(distance < this.rad + other.rad){
      //collided!(原来速度的矢量+撞击的矢量)
      //this particle
      var colForce = p5.Vector.sub(other.pos, this.pos);
      colForce.normalize();
      colForce.mult(this.vel.mag());
      other.applyForce(colForce);
      //other particle
      colForce.mult(-1);
      colForce.normalize();
      colForce.mult(other.vel.mag());
      this.applyForce(colForce);
    }
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    fill(this.r, this.g, this.b, this.a);
    sphere(this.rad);
    pop();
  }
}