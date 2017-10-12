"use strict";

class Particle{
  
  constructor(){
    this.pos = createVector(random(width),random(height));
    this.vel = createVector(0,0);//p5.Vector.random2D();//createVector(0,0);
    this.acc = createVector(0,0);
    this.maxVel = 4;
  }
  
  update(){
    this.vel.add(this.acc);
    this.vel.limit(this.maxVel);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  
  follow(vectors){ //vectors is an array of vectors
    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);
    var index = x + y * cols;
    var force = vectors[index];
    this.applyForce(force);
  }
  
  applyForce(force){
    this.acc.add(force);
  }
  
  show(){
    stroke(0);
    strokeWeight(4);
    point(this.pos.x,this.pos.y);
  }
  
  edges(){
    if(this.pos.x > width) this.pos.x = 0;
    if(this.pos.x < 0) this.pos.x = width;
    if(this.pos.y > height) this.pos.y = 0;
    if(this.pos.y < 0) this.pos.y = height;
    this.pos.x = constrain(this.pos.x,0,width);
    this.pos.y = constrain(this.pos.y, 0, height);
  }
}