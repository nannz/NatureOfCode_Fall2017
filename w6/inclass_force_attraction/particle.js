"use strict";

class Particle{
  constructor(x,y,m){
    this.pos = createVector(x,y);
    this.vel = createVector();
    this.acc = createVector();
    
    this.mass = m;
    this.rad = this.mass * 5;
    
    this.clr = color(255);
  }
  
  
  update(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  applyAttraction(otherP){
    var distance = this.pos.dist(otherP.pos);
    var magnitude =(C_GRAVITY * this.mass * otherP.mass)/ (distance * distance); //the formula: (G * a.m * b.m) / (distance * distance);
    var force = p5.Vector.sub(otherP.pos, this.pos); //get the attraction force direction and mad. p1-->p2
    force.normalize();
    force.mult(magnitude);
    this.applyForce(force);
  }
  applyForce(force){
    force.div(this.mass);
    this.acc.add(force);
  }
  display(){
    push();
    translate(this.pos.x, this.pos.y);
    ellipse(0,0,this.rad * 2, this.rad * 2);
    pop();
  }
}