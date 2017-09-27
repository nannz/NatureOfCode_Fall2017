"use strict";

class Ball{
  
  constructor(_x,_y){
    this.pos = createVector(_x,_y);
    this.vel = createVector();
    this.acc = createVector();
    this.mass = random(1,10);
    this.r = this.mass * 10;
  }
  
  update(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  
  applyForce(_force){
    var force = _force.div(this.mass);
    this.acc.add(force);
  }
  
  display(){
    push();
    translate(this.pos.x,this.pos.y);
    
    fill(255,100);
    ellipse(0,0,this.r, this.r);
    pop();
  }
}