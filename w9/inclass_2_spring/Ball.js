"use strict";
class Ball{
  
  constructor(_x, _y, _m){
    this.pos = createVector(_x, _y);
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    
    this.mass = _m;
    this.rad = this.mass;
    
    this.damping = 0.97;
  }
  
  update(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    
    //damping
    this.vel.mult(this.damping);
  }
  
  drag(){
    var distance = dist(mouseX, mouseY, this.pos.x, this.pos.y);
    if(distance < this.rad && mouseIsPressed){
      this.pos.x = mouseX;
      this.pos.y = mouseY;
    }
  }
  
  applyForce(force){
    force.div(this.mass);
    this.acc.add(force);
  }
  
  display(){
    push();
    translate(this.pos.x, this.pos.y);
    ellipse(0,0,this.rad*2, this.rad*2);
    pop();
  }
  
}

class Spring{//only used the pos of ballA and ballB
  constructor(ballA, ballB, len){
    this.ballA = ballA;
    this.ballB = ballB;
    this.len = len;
    this.k = 0.5; //hook's law弹力系数
  }
  update(){
    var direction = p5.Vector.sub(this.ballB.pos, this.ballA.pos);
    var distance = direction.mag();
    //var distance = p5.Vector.dist(this.ballA.pos,this.ballB.pos);
    var stretch = distance - this.len;
    //hooke's law
    //mag of the spring force  = -1 * this.k * stretch;
    var force = direction.copy();
    var forceMag = -1 * this.k * stretch; 
    force.normalize();
    force.mult(forceMag);
    this.ballB.applyForce(force);
    
    force.mult(-1);
    this.ballA.applyForce(force);
  }
  display(){
    push();
    stroke(255);
    line(this.ballA.pos.x,this.ballA.pos.y, this.ballB.pos.x,this.ballB.pos.y);
    pop();
  }
}
