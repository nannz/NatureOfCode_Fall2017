"use strict";

class Particle{
  
  constructor(){
    this.pos = createVector(random(width),random(height));
    this.vel = createVector(0,0);//p5.Vector.random2D();//createVector(0,0);
    this.acc = createVector(0,0);
    this.maxVel = 2;
    //it would skip pixels, so have prevPos
    this.prevPos = this.pos.copy();
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
    stroke(0,5);
    strokeWeight(1);
    //point(this.pos.x,this.pos.y);
    //draw a line from current to pre  pos, to solve skipping pixels
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
  }
  
  updatePrev(){
    this.prevPos.y = this.pos.y;
    this.prevPos.x = this.pos.x;
  }
  edges(){
    if(this.pos.x > width) {
      this.pos.x = 0; 
      this.updatePrev();
    }
    if(this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if(this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if(this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }
    this.pos.x = constrain(this.pos.x,0,width);
    this.pos.y = constrain(this.pos.y, 0, height);
  }
}