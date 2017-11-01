"use strict";

class Particle{
  constructor(){
    this.pos = createVector(0, 0, 0);
    this.vel = createVector(0,0,0);
    this.acc = createVector(0,0,0);
    
    this.size = 2;
    this.mass = 1; //1 for now, later should corresponding to the colour
    
    this.colour = 0;
    
    this.isExploded = false;
  }
  
  setPos(x,y,z){
    this.pos = createVector(x, y, z);
    return this;
  }
  setColor(r,g,b){
    this.colour = color(r,g,b);
    return this;
  }
  setSize(size){
    this.size = size;
    return this;
  }
  getDist(vector){
    return p5.Vector.dist(this.pos, vector);
  }
  checkDist(vector){
    if(p5.Vector.dist(this.pos, vector) <= DIST){
      return true;
    }else{
      return false;
    }
  }
  
  applyForce(force){
    force.div(this.mass);
    this.acc.add(force);
  }
  
  explode(){
    this.isExploded = true;
    //can have an initial vel there
    //...
    var explodeForce = createVector(random(0,10),random(0,10),random(0,10));
    this.vel = explodeForce;
  }
  
  update(){
    this.vel.add(this.acc);
    if(this.isExploded){
      this.vel.mult(0.9);
      this.count ++;
    }
    
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  
  display(){
    push();
    translate(this.pos.x,this.pos.y,this.pos.z);
    fill(this.colour);
    sphere(this.size);
    pop();
  }
}