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
    this.isAttracted = false;
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
    this.size = size;// var pSize = map(bright, 0, 255, 0.1, 2.0);
    this.mass = map(size, 0, 2, 2.0, 0.0);
    return this;
  }
  getDist(vector){
    var distance = p5.Vector.sub(this.pos, vector);
    return distance;
    //return p5.Vector.dist(this.pos, vector);
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
  
  explode(force){
    this.isExploded = true;
    this.vel = force;
  }
  
  applyAttraction(attraction){
    var dir = attraction.sub(this.pos);
    dir.normalize();
    dir.mult(0.1 * this.mass);
    
    this.applyForce(dir);
  }

  update(){
    if(this.isExploded){
      this.vel.mult(0.7);
      //this.applyForce(createVector(0,0,-1));
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  
  display(){
    push();
    translate(this.pos.x,this.pos.y,this.pos.z);
    fill(this.colour);
    sphere(this.size);
    //box(this.size);
    pop();
  }
}