"use strict";

class Particle{
  constructor(x,y){
    this.pos = createVector(x,y);
    this.vel = createVector(0,0.1);
    this.acc = createVector(0,0);
    this.dia = 25.0;
    this.mass = random(2,5);
    
    //way3 of removing
    this.lifespan = 1.0;
    this.lifeDecrease = random(0.005, 0.01);
    this.isDead = false;
  }
  
  applyForce(force){
    force.div(this.mass);
    this.acc.add(force);
  }
  
  checkBoundries(){
    
    if(this.pos.y < 0){
      this.pos.y = 0;
      this.vel.y = - this.vel.y;
    }else if (this.pos.y > height){
      this.pos.y = height;
      this.vel.y = - this.vel.y;
    }
    if(this.pos.x < 0){
      this.pos.x = 0;
      this.vel.x = - this.vel.x;
    }else if (this.pos.x > width){
      this.pos.x = width;
      this.vel.x = - this.vel.x;
    }
    
    //for way 1 of removing 
    /*
    if(this.pos.x < 0){
      this.pos.x = 0;
      //this.vel.x = - this.vel.x;
      return true;
    }else if (this.pos.x > width){
      this.pos.x = width;
      //this.vel.x = - this.vel.x;
      return true;
    }else{
      return false;
    }*/
  }
  
  update(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  
  debugDisplay(){
    push();
    translate(this.pos.x, this.pos.y);
    noFill();
    stroke(255,0,0);
    ellipse(0,0, this.dia * this.mass, this.dia * this.mass);
    line(0,0,this.vel.x * 2, this.vel.y * 2);
    pop();
  }
  
  display(){
    push();
    translate(this.pos.x, this.pos.y);
    fill(255);
    //ellipseMode(CENTER);
    ellipse(0,0, this.dia * this.mass, this.dia * this.mass);
    pop();
  }
  
  updateLifespan(){
    this.lifespan -= this.lifeDecrease;
    //this.dia = map(this.lifespan, 0.0, 1.0, 0.0,5.0);
    if(this.lifespan < 0){
      this.lifespan = 0;
      this.isDead = true;
    }
    if(this.lifespan < 0.1){
      this.dia *= this.lifespan * 10;
    }
    
    
  }
}